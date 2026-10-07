import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { ResumeScoreCard } from '../../components/resume/ResumeScoreCard';
import { JobCard } from '../../components/jobs/JobCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SkillBadge } from '../../components/common/SkillBadge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { resumeService } from '../../services/api/resumeService';
import { jobService } from '../../services/api/jobService';
import { applicationService } from '../../services/api/applicationService';
import { interviewService } from '../../services/api/interviewService';
import {
  UserCheck,
  Briefcase,
  Send,
  Calendar,
  AlertCircle,
  ArrowRight,
  Clock,
  Compass,
  ChevronRight,
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [resAna, resJobs, resApps, resInts] = await Promise.all([
          resumeService.getAnalysis(),
          jobService.getJobs({ sortBy: 'match' }),
          applicationService.getMyApplications(),
          interviewService.getMyInterviews(),
        ]);

        if (resAna.success) setAnalysis(resAna.data);
        if (resJobs.success) setRecommendedJobs(resJobs.data.slice(0, 2));
        if (resApps.success) setRecentApplications(resApps.data.slice(0, 3));
        if (resInts.success) setInterviews(resInts.data);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage message="Loading student workspace..." />;
  }

  const upcomingInterview = interviews.find((i) => i.status === 'Upcoming');

  return (
    <div className="space-y-7 animate-fade-up w-full">
      {/* 1. EDITORIAL HEADER */}
      <PageHeader
        title={`Welcome back, ${user?.fullName || 'Ashish'}!`}
        subtitle="Engineering Placement Console • ATS Diagnostic Score, Skill Demands & Recruitment Pipeline."
        actions={
          <Link to="/student/jobs?filter=recommended">
            <Button variant="primary" size="sm" icon={Briefcase} className="font-bold shadow-wine">
              Curated Recommendations
            </Button>
          </Link>
        }
      />

      {/* 2. CENTERPIECE COMPOSITION (7 cols Resume Centerpiece + 5 cols Readiness & Pipeline Pulse) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Resume Score as Unmistakable Visual Centerpiece */}
        <div className="lg:col-span-7 flex flex-col">
          <ResumeScoreCard
            score={analysis?.overallScore || 82}
            verdict={analysis?.verdict}
            categoryScores={analysis?.categoryScores}
            className="h-full flex flex-col justify-between"
          />
        </div>

        {/* Right: Operational Placement Pulse & Profile Readiness */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Profile Completion & Readiness */}
          <Card className="flex flex-col justify-between bg-white border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-dim">
                  PROFILE HEALTH
                </span>
                <h4 className="text-base font-bold text-slate-text flex items-center gap-2 mt-0.5">
                  <UserCheck className="w-4 h-4 text-burgundy" />
                  <span>{user?.profileCompletion || 78}% Prepared</span>
                </h4>
              </div>
              <Link to="/student/profile">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-burgundy">
                  Edit Profile
                </Button>
              </Link>
            </div>

            <div className="w-full bg-cream rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-burgundy h-full rounded-full transition-all duration-500"
                style={{ width: `${user?.profileCompletion || 78}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-muted pt-2 border-t border-border font-mono text-[11px]">
              <span>Pending: 2 Certifications</span>
              <span className="text-success font-semibold">Profile Active</span>
            </div>
          </Card>

          {/* Compact Application Status Strip */}
          <Card className="bg-cream-soft border border-border">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-dim mb-3">
              PIPELINE ACTIVITY
            </p>
            <div className="grid grid-cols-3 gap-2 text-center divide-x divide-border">
              <div>
                <p className="text-2xl font-black font-mono text-slate-text">
                  {recentApplications.length || 5}
                </p>
                <p className="text-[10px] font-mono text-slate-muted uppercase mt-0.5">Applied</p>
              </div>
              <div>
                <p className="text-2xl font-black font-mono text-burgundy">2</p>
                <p className="text-[10px] font-mono text-slate-muted uppercase mt-0.5">Shortlisted</p>
              </div>
              <div>
                <p className="text-2xl font-black font-mono text-success">
                  {interviews.length || 3}
                </p>
                <p className="text-[10px] font-mono text-slate-muted uppercase mt-0.5">Interviews</p>
              </div>
            </div>
          </Card>

          {/* Upcoming Interview Snapshot (if scheduled) */}
          {upcomingInterview ? (
            <Card className="border border-yellow/40 bg-yellow/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9A7200] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Next Scheduled Round
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#9A7200] border border-yellow/40 font-bold">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={upcomingInterview.companyLogo}
                  alt={upcomingInterview.company}
                  className="w-10 h-10 rounded-xl object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-slate-text truncate">
                    {upcomingInterview.jobTitle} • {upcomingInterview.company}
                  </h5>
                  <p className="text-[11px] text-slate-muted flex items-center gap-1 mt-0.5 font-mono">
                    <Clock className="w-3 h-3 text-burgundy" />
                    <span>{upcomingInterview.date} at {upcomingInterview.time}</span>
                  </p>
                </div>
                <Link to="/student/interviews">
                  <Button variant="primary" size="sm" className="text-xs font-bold">
                    Prep
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="text-center py-4 text-xs text-slate-muted bg-white border border-border">
              No pending interviews today.
            </Card>
          )}
        </div>
      </div>

      {/* 3. SKILL GAP MATRIX & CURATED JOBS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detected vs Missing Skills (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between bg-white border border-border">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-text flex items-center gap-2">
                    <Compass className="w-4 h-4 text-burgundy" /> Skill Gap Matrix
                  </h3>
                  <p className="text-xs text-slate-muted mt-0.5">
                    Extracted resume competencies contrasted with live campus job specifications.
                  </p>
                </div>
                <Link to="/student/resume-analysis">
                  <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right" className="font-semibold text-burgundy">
                    Full Matrix
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {/* Detected Skills */}
                <div>
                  <p className="text-[11px] font-mono font-bold text-slate-muted uppercase tracking-wider mb-2">
                    Verified Strengths ({analysis?.detectedSkills?.length || 10})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis?.detectedSkills?.slice(0, 8).map((s) => (
                      <SkillBadge key={s.name} skill={s.name} type="matched" size="sm" />
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="pt-3 border-t border-border">
                  <p className="text-[11px] font-mono font-bold text-coral uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> High-Impact Missing Competencies ({analysis?.missingSkills?.length || 4})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {analysis?.missingSkills?.slice(0, 4).map((m) => (
                      <div
                        key={m.name}
                        className="p-3 rounded-xl bg-coral/5 border border-coral/25 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-coral font-mono">{m.name}</span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-slate-muted">
                            {m.priority} Priority
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-muted mt-1 leading-snug">
                          {m.demandRatio}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Curated Top Openings (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-text">Top Matched Requisitions</h3>
              <p className="text-xs text-slate-muted">Opportunities aligned with your profile</p>
            </div>
            <Link to="/student/jobs" className="text-xs text-burgundy hover:underline font-mono font-bold">
              View All
            </Link>
          </div>
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* 4. RECENT APPLICATIONS LEDGER */}
      <Card className="bg-white border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-text flex items-center gap-2">
              <Send className="w-4 h-4 text-burgundy" /> Recent Applications Ledger
            </h3>
            <p className="text-xs text-slate-muted">Real-time status updates from hiring partners</p>
          </div>
          <Link to="/student/applications">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right" className="font-semibold text-burgundy">
              Complete Ledger
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-text">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-slate-dim border-b border-border bg-cream-soft/50">
              <tr>
                <th className="py-2.5 px-3">Company & Role</th>
                <th className="py-2.5 px-3">Applied Date</th>
                <th className="py-2.5 px-3">ATS Match</th>
                <th className="py-2.5 px-3 text-right">Recruiter State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-cream-soft/40 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-text">{app.jobTitle}</p>
                    <p className="text-slate-muted text-[11px]">{app.company}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-muted font-mono">{app.appliedDate}</td>
                  <td className="py-3 px-3 font-mono font-bold text-success">{app.matchPercentage}%</td>
                  <td className="py-3 px-3 text-right">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
