import React from 'react';

export const Card = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'ivory' | 'elevated' | 'wine' | 'cream'
  hoverEffect = false,
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-border text-slate-text shadow-card',
    elevated: 'bg-cream-soft border border-border text-slate-text shadow-card-hover',
    ivory: 'bg-cream-light text-slate-text border border-border shadow-subtle',
    cream: 'bg-cream/30 text-slate-text border border-cream shadow-subtle',
    wine: 'bg-burgundy/5 border border-burgundy/25 text-slate-text',
  }[variant] || 'bg-white border border-border text-slate-text shadow-card';

  const hoverStyles = hoverEffect
    ? 'hover:border-coral/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200 cursor-pointer'
    : 'transition-colors duration-150';

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 ${variantStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
