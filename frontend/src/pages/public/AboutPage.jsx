import React from 'react';
import { Card } from '../../components/common/Card';
import { Target, Award, Users, CheckCircle } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-up">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-burgundy bg-burgundy/10 px-3 py-1 rounded-full border border-burgundy/20">
          About CareerAI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-text mt-3 mb-4 tracking-tight">
          Empowering Campus Placements with Precision AI
        </h1>
        <p className="text-sm sm:text-base text-slate-muted leading-relaxed">
          CareerAI was conceived to eliminate the guesswork from collegiate recruitment. By translating unstructured resumes into actionable skill vectors, we help students land their ideal jobs while giving recruiters ranked, verified candidates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="p-6 bg-white border border-border">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center text-burgundy mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-text mb-2">Our Mission</h3>
          <p className="text-xs text-slate-muted leading-relaxed">
            To provide every engineering and computer science student with real-time feedback on industry readiness, ATS compliance, and tailored learning paths.
          </p>
        </Card>

        <Card className="p-6 bg-white border border-border">
          <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-burgundy border border-border mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-text mb-2">Fair Evaluation</h3>
          <p className="text-xs text-slate-muted leading-relaxed">
            Eliminating arbitrary keyword screening by evaluating foundational computer science skills, verified projects, and measurable technical impact.
          </p>
        </Card>

        <Card className="p-6 bg-white border border-border">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center text-burgundy mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-text mb-2">T&P Cell Integration</h3>
          <p className="text-xs text-slate-muted leading-relaxed">
            Providing institutional placement offices with centralized administration, drive tracking, and transparent placement analytics.
          </p>
        </Card>
      </div>

      <Card className="p-8 sm:p-12 bg-white border border-border">
        <h2 className="text-xl font-bold text-slate-text mb-4">Platform Architecture Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-muted">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            <span>Light-first, warm human-designed SaaS interface engineered with centralized design tokens.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            <span>Multi-tenant role boundaries for Students, Company Recruiters, and University Admins.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            <span>Modular mock service abstraction cleanly decoupled for Java 21 Spring Boot REST APIs.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            <span>Future-proofed schema designed for relational MySQL and semantic vector embeddings.</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
