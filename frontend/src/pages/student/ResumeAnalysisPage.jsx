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
  FileCheck,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
} from 'lucide-react';

const CATEGORY_WEIGHTS = {
  skills: 25,
  projects: 20,
  education: 15,
  experience: 15,
  certifications: 10,
  structure: 10,
  completeness: 5,
};

const CATEGORY_LABELS = {
  skills: 'Technical Skills',
  projects: 'Projects',
  education: 'Education',
  experience: 'Work Experience',
  certifications: 'Certifications',
  structure: 'Resume Structure',
  completeness: 'Completeness',
};

export const ResumeAnalysisPage = () => {
  const toast = useToast();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeStage, setAnalyzeStage] = useState('');
  const [displayScore, setDisplayScore] = useState(0);
  const [hasNoAnalysis, setHasNoAnalysis] = useState(false);

  const loadAnalysis = async () => {
    setLoading(true);
    setHasNoAnalysis(false);
    try {
      const res = await resumeService.getAnalysis();
      if (res.success && res.data) {
        setAnalysis(res.data);
        animateScore(res.data.overallScore || 0);
      } else {
        setHasNoAnalysis(true);
      }
    } catch (err) {
      setHasNoAnalysis(true);
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

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    try {
      setAnalyzeStage('Reading document text...');
      await new Promise((r) => setTimeout(r, 400));

      setAnalyzeStage('Extracting skills & sections...');
      await new Promise((r) => setTimeout(r, 400));

      setAnalyzeStage('Computing Resume Readiness Score...');

      const res = await resumeService.reanalyze();
      if (res.success && res.data) {
        setAnalysis(res.data);
        setHasNoAnalysis(false);
        animateScore(res.data.overallScore || 0);
        toast.success('Resume analysis completed successfully!');
      } else {
        toast.error(res.message || 'Failed to analyze resume.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to connect to resume analysis service.';
      toast.error(msg);
    } finally {
      setAnalyzing(false);
      setAnalyzeStage('');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Fetching latest Resume Intelligence assessment..." />;
  }

  // Format data for Recharts Radar chart
  const radarData = Object.keys(CATEGORY_WEIGHTS).map((catKey) => {
    const score = analysis?.categoryScores?.[catKey] || 0;
    const max = CATEGORY_WEIGHTS[catKey];
    const percentage = Math.round((score / max) * 100);
    return {
      subject: CATEGORY_LABELS[catKey] || catKey,
      score: percentage,
      fullMark: 100,
    };
  });

  return (
    <div className="w-full space-y-7 animate-fade-up">
      <PageHeader
        title="CareerAI Resume Intelligence Breakdown"
        subtitle="Transparent rule-based evaluation measuring skills, projects, education, experience, structure, and certifications."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={RefreshCw}
            loading={analyzing}
            onClick={handleRunAnalysis}
          >
            {analyzing ? analyzeStage || 'Analyzing Resume...' : 'Run Resume Analysis'}
          </Button>
        }
      />

      {/* AI Disclaimer & Transparency Banner */}
      <div className="p-3.5 rounded-xl bg-[#FAF5EF] border border-[#E8DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#5F5A5C]">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8B0026] flex-shrink-0" />
          <span>
            CareerAI Resume Readiness Score is an AI-assisted assessment for improvement guidance. It is not a guarantee of ATS success, hiring, or placement.
          </span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#238B68] bg-[#238B68]/10 px-2.5 py-0.5 rounded-md border border-[#238B68]/20 font-bold">
          AI Intelligence v1.0
        </span>
      </div>

      {hasNoAnalysis || !analysis ? (
        <Card className="p-12 text-center border-[#E8DED4]">
          <FileCheck className="w-12 h-12 text-[#8B0026] mx-auto mb-4" />
          <h3 className="text-base font-bold text-[#1E1B1C]">No Resume Analysis Found</h3>
          <p className="text-xs text-[#5F5A5C] mt-2 max-w-md mx-auto">
            Click below to analyze your uploaded resume using the CareerAI local Resume Intelligence pipeline.
          </p>
          <div className="mt-6">
            <Button variant="primary" loading={analyzing} onClick={handleRunAnalysis}>
              {analyzing ? analyzeStage || 'Analyzing Resume...' : 'Analyze Resume Now'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* 1. TOP SCORE HERO WITH RADAR CHART & OVERALL STATS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Overall Score Card */}
            <Card className="lg:col-span-1 border-[#E8DED4] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5F5A5C] flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#8B0026]" /> Readiness Score
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#8B0026]/10 text-[#8B0026] border border-[#8B0026]/20">
                    {displayScore >= 80 ? 'Grade A' : displayScore >= 60 ? 'Grade B' : 'Needs Work'}
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
                  {displayScore >= 75
                    ? 'Strong Placement-Ready Resume'
                    : displayScore >= 50
                    ? 'Good Resume Baseline'
                    : 'Requires Resume Enhancements'}
                </h3>
                <p className="text-xs text-[#5F5A5C] text-center mt-2 font-mono">
                  Profile Status:{' '}
                  <span className="text-[#8B0026] font-bold">
                    {analysis.experienceLevel || 'FRESHER'}
                  </span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DED4] text-[11px] font-mono text-[#5F5A5C] text-center">
                Analyzed at: {analysis.analyzedAt ? new Date(analysis.analyzedAt).toLocaleString() : 'N/A'}
              </div>
            </Card>

            {/* Right: Radar Chart Visualization of Category Breakdown */}
            <Card className="lg:col-span-2 border-[#E8DED4] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1B1C]">Competency Breakdown Radar</h3>
                  <p className="text-xs text-[#5F5A5C]">
                    Evaluation across Skills, Projects, Education, Experience, Certifications, Structure & Completeness.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#8B0026] bg-[#8B0026]/10 px-2 py-0.5 rounded border border-[#8B0026]/20 font-bold">
                  Rule Engine v1.0
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

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-3 border-t border-[#E8DED4] text-center">
                {Object.keys(CATEGORY_WEIGHTS).map((catKey) => {
                  const score = analysis?.categoryScores?.[catKey] || 0;
                  const max = CATEGORY_WEIGHTS[catKey];
                  return (
                    <div key={catKey} className="p-2 rounded-lg bg-[#FAF5EF] border border-[#E8DED4]">
                      <p className="text-[9px] text-[#5F5A5C] font-mono truncate">
                        {CATEGORY_LABELS[catKey]}
                      </p>
                      <p className="text-xs font-bold text-[#1E1B1C] font-mono mt-0.5">
                        {score}/{max}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* 2. CATEGORY BREAKDOWN LIST WITH EXPLAINABLE REASONS */}
          <Card className="border-[#E8DED4] shadow-sm">
            <h3 className="text-sm font-bold text-[#1E1B1C] mb-4">
              Detailed Category Score Breakdown & Reasons
            </h3>
            <div className="space-y-4">
              {Object.keys(CATEGORY_WEIGHTS).map((catKey) => {
                const score = analysis?.categoryScores?.[catKey] || 0;
                const max = CATEGORY_WEIGHTS[catKey];
                const percentage = Math.round((score / max) * 100);
                const reason = analysis?.scoreReasons?.[catKey] || '';

                return (
                  <div key={catKey} className="space-y-1.5 p-3 rounded-xl bg-[#FAF5EF]/60 border border-[#E8DED4]/60">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1E1B1C]">{CATEGORY_LABELS[catKey]}</span>
                        <span className="text-[10px] text-[#5F5A5C] font-mono">(Max: {max} pts)</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-[#8B0026]">{score} / {max}</span>
                      </div>
                    </div>
                    <ProgressBar
                      value={percentage}
                      color={percentage >= 80 ? 'success' : percentage >= 50 ? 'primary' : 'warning'}
                      size="sm"
                    />
                    {reason && (
                      <p className="text-[11px] text-[#5F5A5C] font-sans mt-1">
                        <span className="font-semibold text-[#1E1B1C]">Evaluation:</span> {reason}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 3. DETECTED SKILLS & CATEGORIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Skills */}
            <Card className="border-[#E8DED4] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#1E1B1C] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#238B68]" /> Detected Technical Skills ({analysis?.skillCount || 0})
                </h3>
                <span className="text-[11px] font-mono text-[#5F5A5C]">Token Extractor</span>
              </div>

              {analysis?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} type="matched" size="md" />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#5F5A5C]">No recognized technical skills detected in the PDF.</p>
              )}
            </Card>

            {/* Missing Sections / Gaps */}
            <Card className="border-[#E8DED4] shadow-sm bg-[#FAF5EF]/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#8B0026] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#8B0026]" /> Section Structure Overview
                </h3>
                <span className="text-[11px] font-mono text-[#5F5A5C]">
                  Completeness: {analysis.completenessPercentage}%
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-[#1E1B1C] mb-1.5">Detected Sections:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis?.sections?.map((sec) => (
                      <span
                        key={sec}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#238B68]/10 text-[#238B68] border border-[#238B68]/20 font-medium"
                      >
                        ✓ {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {analysis?.missingSections?.length > 0 && (
                  <div className="pt-2 border-t border-[#E8DED4]">
                    <p className="text-xs font-bold text-[#8B0026] mb-1.5">Missing Sections:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.missingSections.map((sec) => (
                        <span
                          key={sec}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#8B0026]/10 text-[#8B0026] border border-[#8B0026]/20 font-medium"
                        >
                          ✕ {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* 4. EXTRACTED DETAILS (EDUCATION, PROJECTS, EXPERIENCE, CERTIFICATIONS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education & Projects */}
            <div className="space-y-6">
              <Card className="border-[#E8DED4] shadow-sm">
                <h3 className="text-sm font-bold text-[#1E1B1C] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#8B0026]" /> Extracted Education
                </h3>
                {analysis?.education?.length > 0 ? (
                  analysis.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#FAF5EF] border border-[#E8DED4] text-xs space-y-1">
                      <p className="font-bold text-[#1E1B1C]">{edu.degree || 'Degree'} {edu.field ? `- ${edu.field}` : ''}</p>
                      {edu.institution && <p className="text-[#5F5A5C]">{edu.institution}</p>}
                      <div className="flex gap-3 text-[11px] font-mono text-[#8B0026]">
                        {edu.graduationYear && <span>Year: {edu.graduationYear}</span>}
                        {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                        {edu.percentage && <span>Percentage: {edu.percentage}</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#5F5A5C]">No education entry detected.</p>
                )}
              </Card>

              <Card className="border-[#E8DED4] shadow-sm">
                <h3 className="text-sm font-bold text-[#1E1B1C] mb-3 flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#8B0026]" /> Extracted Projects ({analysis?.projects?.length || 0})
                </h3>
                {analysis?.projects?.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.projects.map((proj, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#FAF5EF] border border-[#E8DED4] text-xs space-y-1">
                        <p className="font-bold text-[#1E1B1C]">{proj.name}</p>
                        {proj.description && <p className="text-[#5F5A5C] text-[11px] line-clamp-2">{proj.description}</p>}
                        {proj.technologies?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {proj.technologies.map((t) => (
                              <span key={t} className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-[#1E1B1C] border border-[#E8DED4]">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#5F5A5C]">No technical projects detected.</p>
                )}
              </Card>
            </div>

            {/* Experience & Certifications */}
            <div className="space-y-6">
              <Card className="border-[#E8DED4] shadow-sm">
                <h3 className="text-sm font-bold text-[#1E1B1C] mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#8B0026]" /> Work Experience & Internships ({analysis?.experience?.length || 0})
                </h3>
                {analysis?.experience?.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.experience.map((exp, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#FAF5EF] border border-[#E8DED4] text-xs space-y-1">
                        <p className="font-bold text-[#1E1B1C]">{exp.role || 'Role'} {exp.company ? `@ ${exp.company}` : ''}</p>
                        {exp.duration && <p className="text-[11px] font-mono text-[#8B0026]">{exp.duration}</p>}
                        {exp.description && <p className="text-[#5F5A5C] text-[11px] line-clamp-2">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#5F5A5C]">No prior work experience detected (Fresher profile).</p>
                )}
              </Card>

              <Card className="border-[#E8DED4] shadow-sm">
                <h3 className="text-sm font-bold text-[#1E1B1C] mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8B0026]" /> Verified Certifications ({analysis?.certifications?.length || 0})
                </h3>
                {analysis?.certifications?.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.certifications.map((cert, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#FAF5EF] border border-[#E8DED4] text-xs font-mono font-medium text-[#1E1B1C] flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-[#238B68]" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#5F5A5C]">No recognized certifications detected.</p>
                )}
              </Card>
            </div>
          </div>

          {/* 5. ACTIONABLE RECOMMENDATIONS */}
          <Card className="border-[#E8DED4] shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8B0026]/10 text-[#8B0026] flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B1C]">Actionable Recommendations to Elevate Your Resume Score</h3>
                <p className="text-xs text-[#5F5A5C]">Specific edits generated based on your resume's detected structural and technical gaps.</p>
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
        </>
      )}
    </div>
  );
};
