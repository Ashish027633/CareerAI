import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { companyService } from '../../services/api/companyService';
import { jobService } from '../../services/api/jobService';
import { applicationService } from '../../services/api/applicationService';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  Award,
  PlusCircle,
  ArrowRight,
  Target,
} from 'lucide-react';

export const CompanyDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCompanyData = async () => {
    setLoading(true);
    try {
      const [resStats, resJobs, resApps] = await Promise.all([
        companyService.getDashboardStats().catch(() => ({ success: false, data: null })),
        jobService.getCompanyJobs().catch(() => ({ success: false, data: [] })),
        applicationService.getCompanyApplications().catch(() => ({ success: false, data: [] })),
      ]);

      if (resStats?.success && resStats.data) {
        setStats(resStats.data);
      } else {
        setStats({ activeJobs: 0, totalApplicants: 0, shortlisted: 0, interviews: 0, selected: 0 });
      }

      if (resJobs?.success && Array.isArray(resJobs.data)) {
        setRecentJobs(resJobs.data.slice(0, 5));
      } else {
        setRecentJobs([]);
      }

      if (resApps?.success && Array.isArray(resApps.data)) {
        setRecentApplicants(resApps.data.slice(0, 6));
      } else {
        setRecentApplicants([]);
      }
    } catch (err) {
      console.error('Error loading company dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage message="Loading talent operations console..." />;
  }

  const companyDisplayName = user?.companyName || user?.fullName || user?.name || 'Talent Operations';

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title={`${companyDisplayName} Operations`}
        subtitle="Recruitment Intelligence Console • Automated Candidate Evaluation, Requisitions, & Interview Pipelines."
        actions={
          <Link to="/company/jobs/create">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Post Requisition
            </Button>
          </Link>
        }
      />

      {/* 1. OPERATIONAL PIPELINE COMMAND STRIP */}
      <Card className="bg-[#FAF5EF] border border-[#E8DED4] p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5F5A5C]">
            AUTHENTIC RECRUITMENT PIPELINE
          </span>
          <span className="text-[10px] font-mono font-bold text-[#8B0026] bg-[#8B0026]/10 px-2.5 py-0.5 rounded-full border border-[#8B0026]/20">
            Live Hiring Portal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DED4] text-center">
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.activeJobs ?? 0}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Open Positions</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono font-medium">Active drives</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.totalApplicants ?? 0}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Total Applicants</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono font-medium">All submissions</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#8B0026]">
              {stats?.shortlisted ?? 0}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Shortlisted</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono font-medium">Qualified candidates</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.interviews ?? 0}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Interviews Scheduled</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono font-medium">In progress</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#238B68]">
              {stats?.selected ?? 0}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Offers Extended</p>
            <span className="text-[10px] text-[#238B68] font-mono font-semibold">Final selections</span>
          </div>
        </div>
      </Card>

      {/* 2. RECENT APPLICANTS RANKED TABLE */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8DED4]">
          <div>
            <h3 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#8B0026]" /> Candidate Applications
            </h3>
            <p className="text-xs text-[#5F5A5C] mt-0.5">
              Verified submissions across your active job postings
            </p>
          </div>
          <Link to="/company/jobs">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All Job Openings
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentApplicants.length === 0 ? (
            <div className="py-12 text-center text-[#5F5A5C]">
              <Users className="w-10 h-10 mx-auto mb-2 text-[#5F5A5C]/40" />
              <p className="font-semibold text-sm text-[#1E1B1C]">No candidate submissions yet</p>
              <p className="text-xs text-[#5F5A5C] mt-1 max-w-sm mx-auto">
                Candidate applications to your job postings will appear here in real time.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs text-[#1E1B1C]">
              <thead className="text-[10px] font-mono uppercase tracking-wider text-[#5F5A5C] bg-[#FAF5EF] border-b border-[#E8DED4]">
                <tr>
                  <th className="py-2.5 px-3">Candidate</th>
                  <th className="py-2.5 px-2">Job Requisition</th>
                  <th className="py-2.5 px-2">Match Rating</th>
                  <th className="py-2.5 px-2">Application Date</th>
                  <th className="py-2.5 px-2">Pipeline Stage</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DED4]">
                {recentApplicants.map((cand) => (
                  <tr key={cand.id} className="hover:bg-[#FAF5EF]/60 transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-[#1E1B1C]">{cand.studentName || 'Candidate'}</p>
                        <p className="text-[11px] text-[#5F5A5C]">{cand.studentEmail || 'No email provided'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-[#1E1B1C]">
                      {cand.jobTitle || 'General Application'}
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-[#238B68]">
                      {cand.matchPercentage != null ? `${cand.matchPercentage}%` : 'Pending'}
                    </td>
                    <td className="py-3 px-2 font-mono text-[#5F5A5C]">
                      {cand.appliedAt ? new Date(cand.appliedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={cand.status} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      {cand.jobId ? (
                        <Link to={`/company/jobs/${cand.jobId}/applicants`}>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Review
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* 3. ACTIVE JOB OPENINGS */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8DED4]">
          <div>
            <h3 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#8B0026]" /> Active Campus Requisitions
            </h3>
            <p className="text-xs text-[#5F5A5C] mt-0.5">
              Your live postings accepting candidate applications
            </p>
          </div>
          <Link to="/company/jobs">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              Manage All Postings
            </Button>
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="py-10 text-center rounded-xl bg-[#FAF5EF] border border-[#E8DED4]">
            <Briefcase className="w-9 h-9 mx-auto mb-2 text-[#5F5A5C]/40" />
            <p className="font-semibold text-sm text-[#1E1B1C]">No job requisitions created yet</p>
            <p className="text-xs text-[#5F5A5C] mt-1 mb-4 max-w-sm mx-auto">
              Create your first job posting to start receiving verified student applications.
            </p>
            <Link to="/company/jobs/create">
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Post Requisition
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#8B0026]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#1E1B1C]">{job.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      job.isActive
                        ? 'bg-[#238B68]/15 text-[#238B68] border-[#238B68]/30'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                    }`}>
                      {job.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5A5C] mt-1 font-mono">
                    {job.location || 'Remote'} • <strong className="text-[#1E1B1C]">{job.salary || 'Competitive'}</strong> • {job.applicantCount ?? 0} applicants registered
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/company/jobs/${job.id}/applicants`}>
                    <Button variant="outline" size="sm">
                      View Applicants ({job.applicantCount ?? 0})
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
