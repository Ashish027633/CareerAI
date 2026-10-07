import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'wine' | 'ivory' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
  size = 'md',          // 'sm' | 'md'
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
  }[size];

  const variantStyles = {
    default: 'bg-dark-card text-slate-muted border-border-dark',
    primary: 'bg-wine/20 text-coral border-wine/40',
    wine: 'bg-wine/20 text-coral border-wine/40',
    ivory: 'bg-ivory/15 text-ivory border-ivory/30',
    accent: 'bg-coral/15 text-coral border-coral/30',
    success: 'bg-success/15 text-success border-success/30',
    warning: 'bg-warning/15 text-warning border-warning/30',
    danger: 'bg-danger/15 text-danger border-danger/30',
    info: 'bg-cool-blue/15 text-cool-blue border-cool-blue/30',
  }[variant] || 'bg-dark-card text-slate-muted border-border-dark';

  return (
    <span
      className={`inline-flex items-center rounded-md border uppercase font-mono transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
