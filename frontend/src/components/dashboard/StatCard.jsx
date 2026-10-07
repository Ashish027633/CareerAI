import React from 'react';
import { Card } from '../common/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'up', // 'up' | 'down'
  color = 'primary', // 'primary' | 'accent' | 'success' | 'warning'
  className = '',
  onClick,
}) => {
  const iconColorMap = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    accent: 'text-accent bg-accent/10 border-accent/20',
    success: 'text-success bg-success/10 border-success/20',
    warning: 'text-warning bg-warning/10 border-warning/20',
  }[color] || 'text-primary bg-primary/10 border-primary/20';

  return (
    <Card
      className={`relative overflow-hidden ${className}`}
      hoverEffect={!!onClick}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-muted mb-1.5">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
            {value}
          </h4>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${iconColorMap}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-dark/60 text-xs text-slate-muted">
          {trend && (
            <span
              className={`inline-flex items-center font-semibold ${
                trendType === 'up' ? 'text-success' : 'text-danger'
              }`}
            >
              {trendType === 'up' ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
