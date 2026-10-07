import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items to display at this moment.',
  actionText,
  actionLabel,
  onAction,
  className = '',
}) => {
  const label = actionText || actionLabel;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border rounded-2xl bg-cream-soft/40 ${className}`}
    >
      <div className="p-3.5 rounded-full bg-white border border-border text-slate-muted mb-4 shadow-subtle">
        <Icon className="w-8 h-8 text-coral/80" />
      </div>
      <h3 className="text-base font-bold text-slate-text mb-1">{title}</h3>
      <p className="text-sm text-slate-muted max-w-md mb-6 leading-relaxed">{description}</p>
      {label && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {label}
        </Button>
      )}
    </div>
  );
};
