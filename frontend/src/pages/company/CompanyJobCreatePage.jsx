import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyJobCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    company: 'TechCorp Solutions',
    location: 'Bengaluru, India',
    salary: '₹10 - ₹14 LPA',
    jobType: 'Full-time',
    experience: '0-2 Years',
    minCgpa: '7.5',
    description: '',
    skillsString: 'Java, Spring Boot, MySQL, REST API, Docker',
    responsibilitiesString: 'Design and deploy robust microservices\nOptimize SQL queries\nParticipate in daily agile standups',
    benefitsString: 'Hybrid flexibility\nHealth Insurance\nAnnual Learning Stipend',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error('Please fill in title and description');
      return;
    }

    setLoading(true);
    try {
      const requiredSkills = form.skillsString
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const responsibilities = form.responsibilitiesString
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const benefits = form.benefitsString
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...form,
        minCgpa: parseFloat(form.minCgpa) || 7.0,
        requiredSkills,
        responsibilities,
        benefits,
      };

      const res = await jobService.createJob(payload);
      if (res.success) {
        toast.success('Job requisition published successfully!');
        navigate('/company/jobs');
      }
    } catch {
      toast.error('Failed to create job posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <div>
        <Link
          to="/company/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F5A5C] hover:text-[#8B0026] mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Job Management
        </Link>
      </div>

      <PageHeader
        title="Post Campus Job Requisition"
        subtitle="Define required engineering competencies, minimum CGPA eligibility cutoffs, and compensation parameters."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-[#E8DED4] shadow-sm">
          <h3 className="text-sm font-bold text-[#1E1B1C] mb-4 pb-2 border-b border-[#E8DED4]">
            Requisition Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Role Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Associate Software Engineer"
              required
            />
            <Input
              label="Hiring Entity"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
            <Input
              label="CTC / Compensation"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. ₹12 - ₹16 LPA"
            />
            <Select
              label="Engagement Type"
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              options={[
                { label: 'Full-time', value: 'Full-time' },
                { label: 'Internship', value: 'Internship' },
                { label: 'Contract', value: 'Contract' },
              ]}
            />
            <Input
              label="Minimum CGPA Eligibility"
              type="number"
              step="0.1"
              name="minCgpa"
              value={form.minCgpa}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-1.5">
              Role Description & Mission
            </label>
            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the engineering group, architecture scope, and goals..."
              className="w-full bg-[#FAF5EF] text-[#1E1B1C] placeholder:text-[#817B7E] text-xs rounded-xl border border-[#E8DED4] p-3.5 focus:outline-none focus:border-[#8B0026] focus:ring-2 focus:ring-[#8B0026]/10"
              required
            />
          </div>

          <div className="mt-4">
            <Input
              label="Required Technical Skills (Comma-Separated)"
              name="skillsString"
              value={form.skillsString}
              onChange={handleChange}
              helperText="The ATS scoring engine matches applicant resumes against these skill entities."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-1.5">
                Key Responsibilities (One per line)
              </label>
              <textarea
                rows={4}
                name="responsibilitiesString"
                value={form.responsibilitiesString}
                onChange={handleChange}
                className="w-full bg-[#FAF5EF] text-[#1E1B1C] text-xs rounded-xl border border-[#E8DED4] p-3 focus:outline-none focus:border-[#8B0026] focus:ring-2 focus:ring-[#8B0026]/10"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-1.5">
                Benefits & Perks (One per line)
              </label>
              <textarea
                rows={4}
                name="benefitsString"
                value={form.benefitsString}
                onChange={handleChange}
                className="w-full bg-[#FAF5EF] text-[#1E1B1C] text-xs rounded-xl border border-[#E8DED4] p-3 focus:outline-none focus:border-[#8B0026] focus:ring-2 focus:ring-[#8B0026]/10"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Link to="/company/jobs">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" icon={Save} loading={loading}>
            Publish Job Requisition
          </Button>
        </div>
      </form>
    </div>
  );
};
