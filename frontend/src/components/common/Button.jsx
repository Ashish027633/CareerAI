import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'ivory' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed select-none disabled:transform-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-burgundy text-white font-semibold hover:bg-burgundy-dark border border-burgundy shadow-wine hover:-translate-y-0.5 active:translate-y-0 focus:ring-burgundy',
    ivory:
      'bg-white text-slate-text font-bold hover:bg-cream-soft shadow-subtle hover:-translate-y-0.5 active:translate-y-0 focus:ring-burgundy/40 border border-border',
    secondary:
      'bg-cream-soft text-slate-text hover:bg-cream border border-border hover:-translate-y-0.5 active:translate-y-0 focus:ring-burgundy/30 font-medium',
    accent:
      'bg-coral text-white font-semibold hover:bg-coral-hover border border-coral shadow-sm hover:-translate-y-0.5 active:translate-y-0 focus:ring-coral',
    outline:
      'border border-border text-slate-text hover:bg-burgundy/5 hover:border-burgundy/40 hover:text-burgundy hover:-translate-y-0.5 active:translate-y-0 focus:ring-burgundy',
    danger:
      'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20 hover:-translate-y-0.5 active:translate-y-0 focus:ring-danger',
    ghost:
      'text-slate-muted hover:text-slate-text hover:bg-cream-soft focus:ring-burgundy/30',
  }[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
};
