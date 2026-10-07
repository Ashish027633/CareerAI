import React, { useState, useEffect } from 'react';
import { resumeService } from '../../services/api/resumeService';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { SkillBadge } from '../../components/common/SkillBadge';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Target,
  FileCheck,
  TrendingUp,
} from 'lucide-react';

export const ResumeAnalysisPage = () => {
  const toast = useToast();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeStage, setAnalyzeStage] = useState('');
  const [displayScore, setDisplayScore] = useState(0);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getAnalysis();
      if (res.success) {
        setAnalysis(res.data);
        animateScore(res.data.overallScore || 82);
      }
    } finally {
      setLoading(false);
    }
  };

  const animateScore = (targetScore) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayScore(targetScore);
      return;
    }

    const duration = 750;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.floor(eased * targetScore));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayScore(targetScore);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  const handleReanalyze = async () => {
    setAnalyzing(true);
    try {
      setAnalyzeStage('Scanning document structure...');
      await new Promise((r) => setTimeout(r, 600));

      setAnalyzeStage('Benchmarking skills against recruiter criteria...');
      await new Promise((r) => setTimeout(r, 700));

      setAnalyzeStage('Computing ATS compatibility matrix...');
      await new Promise((r) => setTimeout(r, 700));

      setAnalyzeStage('Analysis ready.');
      await new Promise((r) => setTimeout(r, 300));

      const res = await resumeService.reanalyze();
      if (res.success) {
        setAnalysis(res.data);
        animateScore(res.data.overallScore || 82);
        toast.success('Resume benchmark updated with live recruiter criteria!');
      }
    } finally {
      setAnalyzing(false);
      setAnalyzeStage('');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Calibrating ATS resume benchmarks..." />;
  }

  // Data formatted for Recharts Radar chart
  const radarData =
    analysis?.categoryScores?.map((cat) => ({
      subject: cat.category,
      score: cat.score,
      fullMark: 100,
    })) || [];

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title="ATS Resume Benchmark & Category Breakdown"
        subtitle="Automated semantic evaluation measuring keyword density, technical depth, and formatting clarity against campus placement requirements."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={RefreshCw}
            loading={analyzing}
            onClick={handleReanalyze}
          >
            {analyzing ? analyzeStage || 'Analyzing Resume...' : 'Re-Run ATS Analysis'}
          </Button>
        }
      />

      {/* Demo Notification Banner */}
      <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#5F5A5C]">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8B0026] flex-shrink-0" />
          <span>Demo Analysis Simulation: Demonstrating Phase 1 UI pipeline. Real ML embeddings engine will integrate in Phase 3.</span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8B0026] bg-[#8B0026]/10 px-2.5 py-0.5 rounded-md border border-[#8B0026]/20 font-bold">
          UI Mock Mode
        </span>
      </div>

      {/* 1. TOP SCORE HERO WITH RADAR CHART & OVERALL STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overall Score Card */}
        <Card className="lg:col-span-1 border-[#E8DED4] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5F5A5C] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#8B0026]" /> ATS Benchmark
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#238B68]/15 text-[#238B68] border border-[#238B68]/30">
                Grade: A (82%)
              </span>
            </div>

            <div className="my-6 text-center">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-[#8B0026]/20 bg-[#FAF5EF] shadow-sm">
                <span className="text-5xl font-black font-mono text-[#8B0026] tracking-tight">
                  {displayScore}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5F5A5C]">
                  out of 100
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-[#1E1B1C] text-center leading-snug">
              {analysis?.verdict}
            </h3>
            <p className="text-xs text-[#5F5A5C] text-center mt-2">
              Target Profile: <span className="text-[#8B0026] font-semibold">{analysis?.targetRole}</span>
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E8DED4] text-[11px] font-mono text-[#5F5A5C] text-center">
            Evaluated on: {new Date(analysis?.analyzedAt).toLocaleDateString()}
          </div>
        </Card>

        {/* Right: Radar Chart Visualization of 6 Dimensions */}
        <Card className="lg:col-span-2 border-[#E8DED4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B1C]">6-Dimension Competency Radar</h3>
              <p className="text-xs text-[#5F5A5C]">
                Skills, Education, Projects, Experience, Certifications, and Formatting balance.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#8B0026] bg-[#8B0026]/10 px-2 py-0.5 rounded border border-[#8B0026]/20 font-bold">
              Benchmark v1.0
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#E8DED4" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#5F5A5C', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#E8DED4"
                  tick={{ fill: '#817B7E', fontSize: 10 }}
                />
                <Radar
                  name="Candidate Score"
                  dataKey="score"
                  stroke="#8B0026"
                  fill="#8B0026"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-3 border-t border-[#E8DED4] text-center">
            {analysis?.categoryScores?.map((cat) => (
              <div key={cat.category} className="p-2 rounded-lg bg-[#FAF5EF] border border-[#E8DED4]">
                <p className="text-[10px] text-[#5F5A5C] font-mono truncate">{cat.category}</p>
                <p className="text-xs font-bold text-[#1E1B1C] font-mono mt-0.5">{cat.score}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 2. CATEGORY BREAKDOWN LIST */}
      <Card className="border-[#E8DED4] shadow-sm">
        <h3 className="text-sm font-bold text-[#1E1B1C] mb-4">
          Detailed Category Score Breakdown
        </h3>
        <div className="space-y-4">
          {analysis?.categoryScores?.map((cat) => (
            <div key={cat.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B1C]">{cat.category}</span>
                  <span className="text-[10px] text-[#5F5A5C] font-mono">(Weight: {cat.weight})</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[#5F5A5C]">{cat.status}</span>
                  <span className="font-bold text-[#8B0026]">{cat.score} / 100</span>
                </div>
              </div>
              <ProgressBar
                value={cat.score}
                color={cat.score >= 80 ? 'success' : cat.score >= 70 ? 'primary' : 'warning'}
                size="sm"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 3. DETECTED VS MISSING SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detected Skills */}
        <Card className="border-[#E8DED4] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#238B68]" /> Detected Skills ({analysis?.detectedSkills?.length})
            </h3>
            <span className="text-[11px] font-mono text-[#5F5A5C]">From PDF Parser</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {analysis?.detectedSkills?.map((skill) => (
              <SkillBadge key={skill.name} skill={skill.name} type="matched" size="md" />
            ))}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="border-[#D64F63]/30 shadow-sm bg-[#FAF5EF]/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#8B0026] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D64F63]" /> High-Impact Missing Competencies ({analysis?.missingSkills?.length})
            </h3>
            <span className="text-[11px] font-mono text-[#5F5A5C]">Recruiter Demand</span>
          </div>

          <div className="space-y-3">
            {analysis?.missingSkills?.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-white border border-[#E8DED4] flex items-center justify-between shadow-2xs"
              >
                <div>
                  <span className="text-xs font-bold text-[#1E1B1C] font-mono">{skill.name}</span>
                  <p className="text-[11px] text-[#5F5A5C] mt-0.5">{skill.demandRatio}</p>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#D64F63]/15 text-[#8B0026] border border-[#D64F63]/30">
                  {skill.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 4. ACTIONABLE RECOMMENDATIONS */}
      <Card className="border-[#E8DED4] shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#8B0026]/10 text-[#8B0026] flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E1B1C]">Actionable Recommendations to Elevate Your Score</h3>
            <p className="text-xs text-[#5F5A5C]">Implement these edits to increase your placement eligibility.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {analysis?.recommendations?.map((rec, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-md bg-[#8B0026] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-[#1E1B1C] leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
