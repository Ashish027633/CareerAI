import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while fetching information. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 border border-danger/30 rounded-xl bg-danger/5 ${className}`}
    >
      <div className="p-3 rounded-full bg-danger/10 text-danger mb-3">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-text mb-1">{title}</h3>
      <p className="text-sm text-slate-muted max-w-sm mb-5">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
