import React from 'react';
import { Card } from '../../components/common/Card';
import {
  FileText,
  Cpu,
  Target,
  Briefcase,
  Calendar,
  BarChart3,
} from 'lucide-react';

export const FeaturesPage = () => {
  const features = [
    {
      icon: Cpu,
      title: 'AI Resume Scoring & ATS Parsing',
      desc: 'Parses complex multi-column resumes, scoring candidates across skills, projects, education, and formatting with pinpoint accuracy.',
    },
    {
      icon: Target,
      title: 'Semantic Skill Gap Identification',
      desc: 'Compares candidate profiles against specific company requirements to expose missing tools, frameworks, and certifications.',
    },
    {
      icon: Briefcase,
      title: 'Intelligent Job Matching',
      desc: 'Calculates real-time candidate match percentages (e.g. 92% match) based on verified skills, CGPA cutoffs, and experience.',
    },
    {
      icon: Calendar,
      title: 'Integrated Interview Coordination',
      desc: 'Recruiters can schedule multiple technical and HR rounds, auto-generating meeting links and updating candidate timelines.',
    },
    {
      icon: BarChart3,
      title: 'Institutional Placement Analytics',
      desc: 'Real-time charts and reports for university T&P administrators tracking offer rates, branch-wise statistics, and salary medians.',
    },
    {
      icon: FileText,
      title: 'Resume Version Management',
      desc: 'Maintain multiple resume iterations, audit historical scores, and download optimized PDF variants for specific job tracks.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-up">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
          Core Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-text mt-3 mb-4 tracking-tight">
          Features Built for Placement Success
        </h1>
        <p className="text-sm text-slate-muted leading-relaxed">
          A cohesive ecosystem engineered to optimize every milestone in the placement pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <Card key={idx} className="p-6 bg-white border border-border hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-burgundy border border-border mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-text mb-2">{f.title}</h3>
              <p className="text-xs text-slate-muted leading-relaxed">{f.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
