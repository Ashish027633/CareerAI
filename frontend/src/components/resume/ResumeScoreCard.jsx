import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { getScoreColorClass } from '../../utils/colorUtils';
import { ShieldCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumeScoreCard = ({
  score = 82,
  maxScore = 100,
  verdict = 'Strong Match for Junior/Associate Roles',
  categoryScores = [],
  showActions = true,
  className = '',
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayScore(score);
      return;
    }

    const duration = 700;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * score);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayScore(score);
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [score]);

  return (
    <Card className={`border border-border bg-white shadow-card ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Big Score visualization */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center bg-burgundy text-white border-2 border-burgundy-dark shadow-wine transition-all flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              {displayScore}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold opacity-85 font-mono">
              / {maxScore}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy/10 text-burgundy border border-burgundy/25 inline-flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3 text-coral" /> Benchmark ATS Score
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-text leading-snug">
              {verdict}
            </h3>
            <p className="text-xs text-slate-muted mt-1 leading-relaxed">
              Standardized evaluation calibrated for university engineering placement benchmarks (Demo Profile).
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link to="/student/resume-analysis" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                icon={BarChart3}
                iconPosition="left"
                className="w-full font-bold shadow-wine"
              >
                Detailed Analysis
              </Button>
            </Link>
            <Link to="/student/resume" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full">
                Resume Vault
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mini Category Breakdown preview */}
      {categoryScores && categoryScores.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-border">
          {categoryScores.map((cat) => (
            <div key={cat.category} className="bg-cream-soft rounded-xl p-3 border border-border">
              <div className="flex justify-between items-center text-[11px] text-slate-muted mb-1.5 font-mono">
                <span className="truncate pr-1">{cat.category}</span>
                <span className="font-bold text-slate-text">{cat.score}%</span>
              </div>
              <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-burgundy h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
