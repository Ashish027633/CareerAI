import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';
import {
  PlusCircle,
  Users,
  Trash2,
  Power,
  MapPin,
  IndianRupee,
} from 'lucide-react';

export const CompanyJobsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await jobService.getJobs();
      if (res.success) setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleToggleStatus = async (id) => {
    const res = await jobService.toggleJobStatus(id);
    if (res.success) {
      toast.success(res.message);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, active: !j.active } : j))
      );
    }
  };

  const handleDeleteJob = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await jobService.deleteJob(deleteId);
      if (res.success) {
        toast.success('Job posting removed successfully.');
        setJobs((prev) => prev.filter((j) => j.id !== deleteId));
        setDeleteId(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching company job listings..." />;
  }

  return (
    <div className="w-full space-y-6 animate-fade-up">
      <PageHeader
        title="Manage Job Postings"
        subtitle="Create, edit, pause, and review applicant funnels across your active campus job requisitions."
        actions={
          <Link to="/company/jobs/create">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Post New Position
            </Button>
          </Link>
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          title="No job listings found"
          description="Create your first job listing to start receiving matched campus applications."
          actionText="Create Job"
          onAction={() => navigate('/company/jobs/create')}
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="border-[#E8DED4] hover:border-[#8B0026]/40 transition-all shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left job meta */}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#1E1B1C]">{job.title}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        job.active
                          ? 'bg-[#238B68]/15 text-[#238B68] border-[#238B68]/30'
                          : 'bg-[#FAF5EF] text-[#817B7E] border-[#E8DED4]'
                      }`}
                    >
                      {job.active ? 'Active & Receiving Apps' : 'Paused'}
                    </span>
                    <span className="text-[11px] text-[#817B7E] font-mono">ID: {job.id}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#5F5A5C] mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#817B7E]" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-[#1E1B1C] font-semibold">
                      <IndianRupee className="w-3.5 h-3.5 text-[#8B0026]" /> {job.salary}
                    </span>
                    <span>{job.jobType}</span>
                    <span>Min CGPA: <strong className="text-[#1E1B1C]">{job.minCgpa || 7.0}</strong></span>
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.requiredSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#FAF5EF] text-[11px] text-[#5F5A5C] border border-[#E8DED4]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8DED4]">
                  <Link to={`/company/jobs/${job.id}/applicants`}>
                    <Button variant="primary" size="sm" icon={Users}>
                      Applicants ({job.applicantCount || 42})
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={Power}
                    onClick={() => handleToggleStatus(job.id)}
                  >
                    {job.active ? 'Pause' : 'Activate'}
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => setDeleteId(job.id)}
                    aria-label="Delete job"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteJob}
        title="Delete Job Posting"
        message="Are you sure you want to delete this job listing? All applicant rankings and submission records will be archived."
        confirmText="Delete Posting"
        danger={true}
        loading={deleting}
      />
    </div>
  );
};
