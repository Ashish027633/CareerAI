import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { JobCard } from '../../components/jobs/JobCard';
import { TextTicker } from '../../components/common/TextTicker';
import { SkillBadge } from '../../components/common/SkillBadge';
import { jobService } from '../../services/api/jobService';
import {
  ArrowRight,
  UploadCloud,
  TrendingUp,
  Building2,
  CheckCircle2,
  Target,
  BarChart3,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  AlertCircle,
} from 'lucide-react';

export const LandingPage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    jobService.getJobs().then((res) => {
      if (res.success) {
        setFeaturedJobs(res.data.slice(0, 3));
      }
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-ivory text-slate-text">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtitle / System Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs font-mono font-medium text-slate-text mb-6 shadow-subtle animate-fade-up">
          <span className="flex h-2 w-2 rounded-full bg-burgundy animate-pulse" />
          <span className="text-slate-muted uppercase tracking-widest text-[10px] font-bold">
            AI-POWERED PLACEMENT & RESUME ANALYZER
          </span>
          <span className="text-slate-dim">•</span>
          <span className="text-burgundy font-bold text-[10px]">PHASE 1 PREVIEW</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-text max-w-4xl mx-auto leading-[1.08] animate-fade-up">
          Build Your Career with{' '}
          <span className="text-burgundy">CareerAI</span>
        </h1>

        <p className="mt-5 text-base sm:text-xl text-slate-muted max-w-2xl mx-auto leading-relaxed animate-fade-up">
          Analyze your resume, identify critical skill gaps, and match with verified campus placement opportunities through calibrated ATS scoring and recruiter ranking intelligence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto animate-fade-up">
          <Link to="/student/resume" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={UploadCloud}
              className="w-full sm:w-auto font-bold shadow-wine"
            >
              Analyze Resume
            </Button>
          </Link>
          <Link to="/jobs" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto font-bold"
            >
              Explore Jobs
            </Button>
          </Link>
        </div>

        {/* Hero Interactive ATS Visual Showcase Card */}
        <div className="mt-12 max-w-4xl mx-auto bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card-hover text-left relative overflow-hidden animate-fade-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-burgundy text-white flex flex-col items-center justify-center shadow-wine flex-shrink-0">
                <span className="text-2xl font-black font-mono">82</span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono opacity-85">/100</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-slate-text">ATS Parser & Benchmark Evaluation</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-success/10 text-success border border-success/30">
                    High ATS Pass
                  </span>
                </div>
                <p className="text-xs text-slate-muted mt-0.5">
                  Illustrative Sample Profile: Ashish Sharma • Target: Backend Engineering & Distributed Systems
                </p>
              </div>
            </div>

            <Link to="/student/resume-analysis">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Inspect Diagnostic
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="bg-cream-soft rounded-2xl p-3.5 border border-border">
              <span className="text-[11px] font-mono text-slate-dim uppercase tracking-wider font-semibold">Keyword Match</span>
              <p className="text-base font-black text-slate-text mt-1">88%</p>
              <div className="w-full bg-cream rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-burgundy h-full rounded-full w-[88%]" />
              </div>
            </div>
            <div className="bg-cream-soft rounded-2xl p-3.5 border border-border">
              <span className="text-[11px] font-mono text-slate-dim uppercase tracking-wider font-semibold">Technical Depth</span>
              <p className="text-base font-black text-slate-text mt-1">84%</p>
              <div className="w-full bg-cream rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-burgundy h-full rounded-full w-[84%]" />
              </div>
            </div>
            <div className="bg-cream-soft rounded-2xl p-3.5 border border-border">
              <span className="text-[11px] font-mono text-slate-dim uppercase tracking-wider font-semibold">Layout & ATS Format</span>
              <p className="text-base font-black text-slate-text mt-1">92%</p>
              <div className="w-full bg-cream rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-success h-full rounded-full w-[92%]" />
              </div>
            </div>
            <div className="bg-cream-soft rounded-2xl p-3.5 border border-border">
              <span className="text-[11px] font-mono text-slate-dim uppercase tracking-wider font-semibold">Job Requisition Match</span>
              <p className="text-base font-black text-slate-text mt-1">76%</p>
              <div className="w-full bg-cream rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-coral h-full rounded-full w-[76%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE CONTINUOUS PULSE TICKER */}
      <TextTicker />

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
            Intelligent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-text mt-3 mb-3 tracking-tight">
            How CareerAI Powers Placements
          </h2>
          <p className="text-sm sm:text-base text-slate-muted leading-relaxed">
            From raw PDF documents to shortlisted campus interviews in three automated, auditable stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-3xl p-7 shadow-card relative hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-burgundy font-black text-lg mb-5 border border-border">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-text mb-2">Upload & Parse Resume</h3>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4">
              Upload your engineering resume in PDF. Our staged parser extracts contact details, education, work experience, projects, and verified tools.
            </p>
            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs text-burgundy font-semibold">
              <CheckCircle2 className="w-4 h-4 text-success" /> Instant ATS benchmark score
            </div>
          </div>

          <div className="bg-white border border-border rounded-3xl p-7 shadow-card relative hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-burgundy font-black text-lg mb-5 border border-border">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-text mb-2">Semantic Skill Gap Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4">
              Compare your extracted skill inventory against active campus requisitions. View missing frameworks, certifications, and recommended keywords.
            </p>
            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs text-burgundy font-semibold">
              <CheckCircle2 className="w-4 h-4 text-success" /> Calibrated radar chart metrics
            </div>
          </div>

          <div className="bg-white border border-border rounded-3xl p-7 shadow-card relative hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-burgundy font-black text-lg mb-5 border border-border">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-text mb-2">Direct Placement Matching</h3>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4">
              Discover matched openings with verified compatibility percentages. Apply with one click and track interview rounds through university recruiters.
            </p>
            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs text-burgundy font-semibold">
              <CheckCircle2 className="w-4 h-4 text-success" /> Seamless candidate shortlist ledger
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESUME INTELLIGENCE & SKILL GAP ANALYSIS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
              Resume Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-text tracking-tight">
              Actionable Diagnostics, Not Arbitrary Keyword Filters
            </h2>
            <p className="text-sm text-slate-muted leading-relaxed">
              Traditional applicant tracking systems blindly reject candidates over trivial formatting flaws. CareerAI evaluates engineering proficiency across projects, measurable contributions, and technical breadth.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-border">
                <Target className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-text">Job-Specific Keyword Targeting</h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    Analyzes job descriptions for required libraries, testing frameworks, and cloud environments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-border">
                <AlertCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-text">Clear Skill Gap Identification</h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    Highlights missing tools like Docker or Kafka so students can upskill before applying.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Link to="/student/resume">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="font-bold shadow-wine">
                  Test Your Resume Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card-hover">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h4 className="text-sm font-bold text-slate-text">Skill Matching Matrix</h4>
                <p className="text-xs text-slate-muted">Role: Java Backend Developer (TechCorp)</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-success/10 text-success border border-success/30">
                87% Match
              </span>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-success flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Detected Candidate Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Java', 'Spring Boot', 'MySQL', 'REST API', 'Git', 'OOP'].map((sk) => (
                    <SkillBadge key={sk} skill={sk} type="matched" size="sm" />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-coral flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-3.5 h-3.5" /> Missing Requirements for 100% Match
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'Redis', 'Microservices', 'Kubernetes'].map((sk) => (
                    <SkillBadge key={sk} skill={sk} type="missing" size="sm" />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cream-soft border border-border text-xs text-slate-muted flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-yellow flex-shrink-0 mt-0.5" />
              <span>
                <strong>Recommendation:</strong> Adding experience with containerization (Docker) increases overall ATS rank by +12 points for this requisition.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOR STUDENTS & FOR RECRUITERS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
            Two Sided Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-text mt-3 mb-3 tracking-tight">
            Engineered for Both Sides of Placement
          </h2>
          <p className="text-sm text-slate-muted leading-relaxed">
            Students prepare with confidence; enterprise recruiters evaluate pre-screened talent pools without sorting through generic inboxes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="bg-white border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-5 border border-burgundy/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-text mb-2">For Graduating Students</h3>
              <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6">
                Take the anxiety out of campus recruitment drives. Build an ATS-compliant profile, identify weak spots in your resume before submitting, and land interviews with top tier tech teams.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-text">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Interactive radar chart breaking down 6 core scoring dimensions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Application timeline tracker with status updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Interview calendar synchronized with university T&P cell drives</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-border">
              <Link to="/register">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full font-bold shadow-wine">
                  Student Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* For Recruiters */}
          <div className="bg-white border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream text-burgundy flex items-center justify-center mb-5 border border-border">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-text mb-2">For Campus Recruiters</h3>
              <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6">
                Stop reviewing identical template resumes manually. Receive pre-evaluated candidate dossiers ranked by semantic skill match, CGPA cutoffs, and verified engineering projects.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-text">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Publish campus requisitions with exact technical skill prerequisites</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>One-click shortlisting and rejection pipeline management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Comprehensive applicant dossiers with ATS match percentages</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-border">
              <Link to="/register">
                <Button variant="secondary" size="md" icon={ArrowRight} iconPosition="right" className="w-full font-bold">
                  Recruiter Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED JOBS PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
                Active Hiring Drives
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-text mt-2 tracking-tight">
                Featured Campus Openings
              </h2>
            </div>
            <Link to="/jobs">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Requisitions
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. PLATFORM STATISTICS (Illustrative Demo Data) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="mb-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-muted bg-cream-soft px-3 py-1 rounded-full border border-border">
            Illustrative Platform Metrics (Phase 1 Mock Simulation)
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-text mt-3 tracking-tight">
            Designed for Campus Scale
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
            <p className="text-3xl sm:text-4xl font-black text-burgundy font-mono">1,400+</p>
            <p className="text-xs text-slate-muted font-medium mt-1">Simulated Student Records</p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
            <p className="text-3xl sm:text-4xl font-black text-burgundy font-mono">82%</p>
            <p className="text-xs text-slate-muted font-medium mt-1">Average ATS Benchmark</p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
            <p className="text-3xl sm:text-4xl font-black text-burgundy font-mono">48+</p>
            <p className="text-xs text-slate-muted font-medium mt-1">Partner Hiring Roles</p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
            <p className="text-3xl sm:text-4xl font-black text-burgundy font-mono">100%</p>
            <p className="text-xs text-slate-muted font-medium mt-1">Phase 1 Frontend Prototype</p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-burgundy text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Accelerate Your Placement Drive?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream/90 max-w-xl mx-auto leading-relaxed">
            Experience the complete Phase 1 frontend interface across Student, Company Recruiter, and University Administrator console workflows.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="ivory" size="lg" className="w-full sm:w-auto font-black shadow-lg">
                Create Account
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:text-white">
                Launch Demo Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
