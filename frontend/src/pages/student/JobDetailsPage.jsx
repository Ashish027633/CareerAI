import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { applicationService } from '../../services/api/applicationService';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { SkillBadge } from '../../components/common/SkillBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';
import { getMatchBadgeClass } from '../../utils/colorUtils';
import { formatDate } from '../../utils/formatters';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Target,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Send,
  FileCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [applied, setApplied] = useState(false);

  const loadJobDetails = async () => {
    setLoading(true);
    try {
      const res = await jobService.getJobMatch(id);
      if (res.success) {
        setJob(res.data); // data is JobMatchDto
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      const res = await applicationService.applyForJob(job.job, customNote);
      if (res.success) {
        toast.success(`Application submitted for ${job.title}!`);
        setApplied(true);
        setApplyModalOpen(false);
      } else {
        toast.warning(res.error || 'Failed to submit application');
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching role specifics and ATS match breakdown..." />;
  }

  if (!job) {
    return (
      <ErrorState
        title="Matching Unavailable"
        message="The role you are looking for may have concluded, or you need to analyze your resume first to get a personalized job match."
        onRetry={() => navigate('/student/jobs')}
      />
    );
  }

  const matchClass = getMatchBadgeClass(job.matchPercentage || 0);
  const baseJob = job.job;

  return (
    <div className="w-full space-y-6 animate-fade-up">
      {/* Back button */}
      <div>
        <Link
          to="/student/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F5A5C] hover:text-[#8B0026] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>
      </div>

      {/* TOP HEADER CARD */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E8DED4]">
          <div className="flex items-start gap-4">
            <img
              src={baseJob.companyLogo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(baseJob.companyName || 'C')}
              alt={baseJob.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-[#E8DED4] flex-shrink-0 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#1E1B1C]">
                  {baseJob.title}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF5EF] text-[#5F5A5C] border border-[#E8DED4]">
                  {baseJob.jobType}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#8B0026] mt-1">{baseJob.companyName}</p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#5F5A5C] mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#817B7E]" /> {baseJob.location}
                </span>
                <span className="flex items-center gap-1 text-[#1E1B1C] font-bold">
                  <IndianRupee className="w-3.5 h-3.5 text-[#8B0026]" /> {baseJob.salaryRange}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#817B7E]" /> {baseJob.experienceLevel}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#817B7E]" /> Posted {formatDate(baseJob.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              disabled={applied || !job.eligible}
              onClick={() => setApplyModalOpen(true)}
              className="w-full md:w-auto font-bold shadow-md"
            >
              {!job.eligible ? 'Not Eligible' : applied ? 'Application Submitted' : 'Submit Application'}
            </Button>
          </div>
        </div>

        {/* RESUME MATCH HERO COMPONENT */}
        <div className="pt-6">
          <div className="p-5 rounded-2xl bg-[#FAF5EF] border border-[#E8DED4] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-mono font-bold shadow-sm ${matchClass}`}
              >
                <span className="text-2xl font-black">{job.matchPercentage}%</span>
                <span className="text-[9px] uppercase tracking-wider">Match</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#8B0026]" /> CareerAI Match Score
                </h4>
                <p className="text-xs text-[#5F5A5C] mt-0.5">
                  AI Relevance: {job.aiRelevanceScore} / 90 | Semantic Relevance: {Math.round((job.semanticSimilarityScore/15)*100)}%
                </p>
                <p className="text-xs text-[#5F5A5C] mt-0.5">
                  Eligibility: {job.eligible ? <span className="text-[#238B68] font-bold">Eligible ✓</span> : <span className="text-[#D64F63] font-bold">Not Eligible ✗</span>}
                </p>
              </div>
            </div>

            <div className="flex flex-col text-xs space-y-1 text-right">
               {job.matchingReasons?.map((r, i) => (
                  <span key={i} className="text-[#5F5A5C] italic">{r}</span>
               ))}
               {job.eligibilityReasons?.map((r, i) => (
                  <span key={i} className="text-[#8B0026] italic font-medium">{r}</span>
               ))}
            </div>
          </div>
          
          <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
              CareerAI Match Score estimates resume-to-job relevance based on skills, content similarity, and eligibility. It is not a guarantee of hiring or selection.
            </p>
          </div>

          {/* Matched & Missing Skills Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-white border border-[#238B68]/30 shadow-2xs">
              <p className="text-xs font-bold text-[#238B68] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Matched Required Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.matchedSkills?.map((s) => (
                  <SkillBadge key={s} skill={s} type="matched" size="sm" />
                ))}
              </div>
              
              {job.matchedOptionalSkills && job.matchedOptionalSkills.length > 0 && (
                <>
                  <p className="text-xs font-bold text-[#238B68] uppercase tracking-wider mt-4 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Matched Optional Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.matchedOptionalSkills.map((s) => (
                      <SkillBadge key={s} skill={s} type="matched" size="sm" />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D64F63]/30 shadow-2xs">
              <p className="text-xs font-bold text-[#8B0026] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#D64F63]" /> Missing Required Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.missingSkills?.length === 0 ? (
                  <span className="text-xs text-[#5F5A5C]">Zero skill gaps! Full compatibility.</span>
                ) : (
                  job.missingSkills?.map((s) => (
                    <SkillBadge key={s} skill={s} type="missing" size="sm" />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. DESCRIPTION & RESPONSIBILITIES */}
      <Card className="border-[#E8DED4] shadow-sm">
        <h3 className="text-base font-bold text-[#1E1B1C] mb-3">About the Position</h3>
        <p className="text-xs sm:text-sm text-[#5F5A5C] leading-relaxed mb-6">
          {job.description}
        </p>

        <h4 className="text-sm font-bold text-[#1E1B1C] mb-3">Key Responsibilities</h4>
        <ul className="space-y-2 mb-6">
          {job.responsibilities?.map((resp, i) => (
            <li key={i} className="text-xs sm:text-sm text-[#5F5A5C] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B0026] mt-2 flex-shrink-0" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        <h4 className="text-sm font-bold text-[#1E1B1C] mb-3">Institutional Eligibility Criteria</h4>
        <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] space-y-2 text-xs text-[#5F5A5C] mb-6">
          <p>
            <strong className="text-[#1E1B1C]">Minimum CGPA Cutoff:</strong> {baseJob.minCgpa || 0}
          </p>
          <p>
            <strong className="text-[#1E1B1C]">Experience Level:</strong> {baseJob.experienceLevel}
          </p>
        </div>

        <h4 className="text-sm font-bold text-[#1E1B1C] mb-3">Compensation & Perks</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5F5A5C]">
          {baseJob.benefits?.map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8DED4] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#238B68] flex-shrink-0" />
              <span className="font-medium text-[#1E1B1C]">{b}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* APPLY CONFIRMATION MODAL */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${baseJob.title}`}
        subtitle={`${baseJob.companyName} • CareerAI Match: ${job.matchPercentage}%`}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              loading={applying}
              icon={Send}
              onClick={handleApply}
            >
              Submit Application
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] text-xs flex items-center justify-between">
            <span className="text-[#5F5A5C]">Active Resume Attached:</span>
            <span className="text-[#1E1B1C] font-bold flex items-center gap-1.5 font-mono">
              <FileCheck className="w-4 h-4 text-[#238B68]" /> Ashish_Sharma_Resume_2026.pdf
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F5A5C] mb-1.5">
              Candidate Note to Recruiter (Optional)
            </label>
            <textarea
              rows={3}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Highlight any relevant engineering project, open-source contribution, or academic focus..."
              className="w-full bg-[#FAF5EF] text-[#1E1B1C] placeholder:text-[#817B7E] text-xs rounded-xl border border-[#E8DED4] p-3.5 focus:outline-none focus:border-[#8B0026] focus:ring-2 focus:ring-[#8B0026]/10"
            />
          </div>

          <p className="text-[11px] text-[#5F5A5C] leading-relaxed">
            By submitting, your verified academic credentials and CareerAI match score ({job.matchPercentage}%) will be transmitted directly to {baseJob.companyName}'s recruitment dashboard.
          </p>
        </div>
      </Modal>
    </div>
  );
};
