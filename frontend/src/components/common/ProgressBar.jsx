import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = false,
  label = '',
  color = 'primary', // 'primary' | 'accent' | 'success' | 'warning' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorStyles = {
    primary: 'bg-burgundy',
    accent: 'bg-coral',
    success: 'bg-success',
    warning: 'bg-yellow',
    danger: 'bg-danger',
  }[color] || 'bg-burgundy';

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          <span className="text-slate-muted">{label}</span>
          <span className="text-slate-text font-bold">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-cream rounded-full overflow-hidden ${heightStyles}`}>
        <div
          className={`${heightStyles} ${colorStyles} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
