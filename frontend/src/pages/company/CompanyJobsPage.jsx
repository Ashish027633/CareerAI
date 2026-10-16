import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api/jobService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
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
  AlertTriangle,
  X,
  Briefcase,
} from 'lucide-react';

// ─── Inline Delete Confirm Dialog (premium styled) ───────────────────────────
const DeleteDialog = ({ job, onConfirm, onCancel, loading }) => {
  if (!job) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1E1B1C]/40 backdrop-blur-sm"
        onClick={!loading ? onCancel : undefined}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DED4]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-4 h-4 text-[#8B0026]" />
            </div>
            <h3 className="text-base font-bold text-[#1E1B1C]">Delete Job Posting</h3>
          </div>
          {!loading && (
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg text-[#817B7E] hover:bg-[#FAF5EF] hover:text-[#1E1B1C] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex gap-3 p-4 rounded-xl bg-red-50 border border-red-100 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#8B0026] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#8B0026] mb-1">This action cannot be undone</p>
              <p className="text-xs text-[#5F5A5C] leading-relaxed">
                Deleting <strong className="text-[#1E1B1C]">"{job.title}"</strong> will permanently
                remove the job posting and all{' '}
                <strong className="text-[#1E1B1C]">{job.applicantCount ?? 0} application(s)</strong>{' '}
                associated with it.
              </p>
            </div>
          </div>
          <p className="text-xs text-[#817B7E]">
            Job ID: <span className="font-mono text-[#5F5A5C]">{job.id}</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E8DED4] bg-[#FAF5EF]/50">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-[#5F5A5C] rounded-xl hover:bg-[#E8DED4] transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#8B0026] rounded-xl hover:bg-[#6B0020] transition-colors disabled:opacity-60 shadow-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Posting
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── JobType display label map ───────────────────────────────────────────────
const JOB_TYPE_LABEL = {
  FULL_TIME:   'Full-time',
  INTERNSHIP:  'Internship',
  CONTRACT:    'Contract',
  REMOTE:      'Remote',
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export const CompanyJobsPage = () => {
  const toast    = useToast();
  const navigate = useNavigate();

  const [jobs,      setJobs]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [deleteJob, setDeleteJob] = useState(null);   // full job object
  const [deleting,  setDeleting]  = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      // ✅ Use company-scoped endpoint — not public /api/jobs
      const res = await jobService.getCompanyJobs();
      if (res.success) setJobs(res.data ?? []);
    } catch {
      toast.error('Failed to load job listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  // ── Toggle Active/Paused ──────────────────────────────────────────────────
  const handleToggleStatus = async (job) => {
    setTogglingId(job.id);
    try {
      const res = await jobService.toggleJobStatus(job.id, job.isActive);
      if (res.success) {
        toast.success(job.isActive ? 'Job paused.' : 'Job activated.');
        setJobs((prev) =>
          prev.map((j) => j.id === job.id ? { ...j, isActive: !j.isActive } : j)
        );
      }
    } catch {
      toast.error('Failed to update job status.');
    } finally {
      setTogglingId(null);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDeleteJob = async () => {
    if (!deleteJob) return;
    setDeleting(true);
    try {
      const res = await jobService.deleteJob(deleteJob.id);
      if (res.success) {
        toast.success('Job posting deleted successfully.');
        setJobs((prev) => prev.filter((j) => j.id !== deleteJob.id));
        setDeleteJob(null);
      } else {
        toast.error(res.message || 'Failed to delete job posting.');
      }
    } catch (err) {
      toast.error('Failed to delete job posting. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching company job listings..." />;
  }

  return (
    <>
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
            title="No job listings yet"
            description="Create your first job listing to start receiving matched campus applications."
            actionText="Post New Position"
            onAction={() => navigate('/company/jobs/create')}
          />
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="border-[#E8DED4] hover:border-[#8B0026]/40 transition-all shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* ── Left: job meta ── */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base font-bold text-[#1E1B1C] truncate">{job.title}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${
                          job.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-[#FAF5EF] text-[#817B7E] border-[#E8DED4]'
                        }`}
                      >
                        {job.isActive ? 'Active' : 'Paused'}
                      </span>
                      <span className="text-[11px] text-[#817B7E] font-mono flex-shrink-0">
                        ID: {job.id}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#5F5A5C] mt-2">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#817B7E]" />
                          {job.location}
                        </span>
                      )}
                      {job.salaryRange && (
                        <span className="flex items-center gap-1 text-[#1E1B1C] font-semibold">
                          <IndianRupee className="w-3.5 h-3.5 text-[#8B0026]" />
                          {job.salaryRange}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#817B7E]" />
                        {JOB_TYPE_LABEL[job.jobType] ?? job.jobType}
                      </span>
                      {job.minCgpa > 0 && (
                        <span>
                          Min CGPA:{' '}
                          <strong className="text-[#1E1B1C]">{job.minCgpa}</strong>
                        </span>
                      )}
                      <span className="text-[#817B7E]">
                        Posted {formatDate(job.createdAt)}
                      </span>
                    </div>

                    {job.requiredSkills?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-[#FAF5EF] text-[11px] text-[#5F5A5C] border border-[#E8DED4]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Right: actions ── */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8DED4]">
                    {/* Applicants count — live from backend */}
                    <Link to={`/company/jobs/${job.id}/applicants`}>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B0026] text-white text-xs font-bold hover:bg-[#6B0020] transition-colors shadow-sm">
                        <Users className="w-3.5 h-3.5" />
                        Applicants ({job.applicantCount ?? 0})
                      </button>
                    </Link>

                    {/* Toggle status */}
                    <button
                      onClick={() => handleToggleStatus(job)}
                      disabled={togglingId === job.id}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors disabled:opacity-50 ${
                        job.isActive
                          ? 'border-[#E8DED4] text-[#5F5A5C] hover:border-[#8B0026]/40 hover:text-[#8B0026]'
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      {togglingId === job.id ? '…' : job.isActive ? 'Pause' : 'Activate'}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteJob(job)}
                      className="p-2 rounded-xl border border-red-100 text-[#8B0026] hover:bg-red-50 hover:border-red-200 transition-colors"
                      aria-label="Delete job posting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ── Premium Delete Confirmation Dialog ── */}
      <DeleteDialog
        job={deleteJob}
        onConfirm={handleDeleteJob}
        onCancel={() => !deleting && setDeleteJob(null)}
        loading={deleting}
      />
    </>
  );
};
