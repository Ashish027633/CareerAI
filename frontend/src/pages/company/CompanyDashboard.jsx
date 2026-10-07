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
  TrendingUp,
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
        companyService.getDashboardStats(),
        jobService.getJobs(),
        applicationService.getApplicantsByJobId('job_01'),
      ]);

      if (resStats.success) setStats(resStats.data);
      if (resJobs.success) setRecentJobs(resJobs.data.slice(0, 3));
      if (resApps.success) setRecentApplicants(resApps.data.slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage message="Loading recruiter operations console..." />;
  }

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title={`${user?.companyName || 'TechCorp'} Talent Operations`}
        subtitle="Recruitment Intelligence Console • Automated Candidate Ranking, Requisitions, & Interview Pipelines."
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
            LIVE RECRUITMENT PIPELINE • SESSION 2026
          </span>
          <span className="text-[10px] font-mono font-bold text-[#8B0026] bg-[#8B0026]/10 px-2.5 py-0.5 rounded-full border border-[#8B0026]/20">
            Active Drive 2026
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DED4] text-center">
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.activeJobs || 8}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Open Positions</p>
            <span className="text-[10px] text-[#8B0026] font-mono font-medium">+2 new this week</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.totalApplicants || 42}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Total Applicants</p>
            <span className="text-[10px] text-[#8B0026] font-mono font-medium">+14 incoming</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#8B0026]">
              {stats?.shortlisted || 18}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Shortlisted</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono">Ranked ≥ 80% Match</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#1E1B1C]">
              {stats?.interviews || 9}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Interviews Scheduled</p>
            <span className="text-[10px] text-[#5F5A5C] font-mono">This session</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:pl-4">
            <p className="text-3xl font-black font-mono text-[#238B68]">
              {stats?.selected || 4}
            </p>
            <p className="text-xs font-mono text-[#5F5A5C] uppercase tracking-wider mt-1">Offers Extended</p>
            <span className="text-[10px] text-[#238B68] font-mono font-semibold">Final approvals</span>
          </div>
        </div>
      </Card>

      {/* 2. RECENT APPLICANTS RANKED TABLE */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8DED4]">
          <div>
            <h3 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#8B0026]" /> Algorithmic Candidate Rankings
            </h3>
            <p className="text-xs text-[#5F5A5C] mt-0.5">
              Ranked in real-time by ATS competency match against requisition: Java Backend Developer
            </p>
          </div>
          <Link to="/company/jobs/job_01/applicants">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              Complete Dossier
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B1C]">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-[#5F5A5C] bg-[#FAF5EF] border-b border-[#E8DED4]">
              <tr>
                <th className="py-2.5 px-3">Candidate Dossier</th>
                <th className="py-2.5 px-2">ATS Score</th>
                <th className="py-2.5 px-2">Requisition Match</th>
                <th className="py-2.5 px-2">CGPA</th>
                <th className="py-2.5 px-2">Key Competencies</th>
                <th className="py-2.5 px-2">Pipeline Stage</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DED4]">
              {recentApplicants.map((cand) => (
                <tr key={cand.id} className="hover:bg-[#FAF5EF]/60 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.candidateName}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8DED4] shadow-2xs"
                      />
                      <div>
                        <p className="font-bold text-[#1E1B1C]">{cand.candidateName}</p>
                        <p className="text-[11px] text-[#5F5A5C]">{cand.college}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-mono font-semibold text-[#1E1B1C]">{cand.resumeScore}/100</td>
                  <td className="py-3 px-2 font-mono font-bold text-[#238B68]">{cand.matchPercentage}%</td>
                  <td className="py-3 px-2 font-mono text-[#5F5A5C]">{cand.cgpa}</td>
                  <td className="py-3 px-2">
                    <div className="flex flex-wrap gap-1">
                      {cand.skills.slice(0, 3).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[10px] font-mono text-[#5F5A5C] border border-[#E8DED4]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <StatusBadge status={cand.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link to="/company/jobs/job_01/applicants">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              Live recruitment drives accepting candidate submissions
            </p>
          </div>
          <Link to="/company/jobs">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              Manage All Postings
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#8B0026]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#1E1B1C]">{job.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#238B68]/15 text-[#238B68] border border-[#238B68]/30">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#5F5A5C] mt-1 font-mono">
                  {job.location} • <strong className="text-[#1E1B1C]">{job.salary}</strong> • {job.applicantCount || 42} applicants registered
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`/company/jobs/${job.id}/applicants`}>
                  <Button variant="outline" size="sm">
                    View Applicants ({job.applicantCount || 42})
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
