import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo
 * Distinctive, human-designed brand identity for CareerAI.
 * Features an architected geometric monogram in deep wine & warm ivory,
 * and clear typography hierarchy.
 */
export const BrandLogo = ({
  size = 'md', // 'sm' | 'md' | 'lg'
  showTagline = true,
  to = '/',
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }[size];

  const brandTextSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Precision Geometric Monogram */}
      <div
        className={`${iconDimensions} rounded-lg bg-wine flex items-center justify-center font-bold tracking-tight text-white border border-wine-hover shadow-wine transition-transform duration-200 group-hover:scale-105 flex-shrink-0 relative overflow-hidden`}
      >
        {/* Subtle interior ivory architectural corner notch */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-ivory/20 rounded-bl-sm" />
        <span className="font-mono font-black tracking-tighter">C</span>
        <span className="text-[10px] text-coral font-sans font-bold -ml-0.5">ai</span>
      </div>

      <div className="flex flex-col text-left">
        <span
          className={`font-extrabold tracking-tight text-slate-text leading-none ${brandTextSize} flex items-center gap-0.5`}
        >
          Career<span className="text-coral">AI</span>
        </span>
        {showTagline && (
          <span className="text-[9px] uppercase tracking-widest text-slate-muted font-medium mt-0.5 font-mono">
            Placement & Resume Analyzer
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};
