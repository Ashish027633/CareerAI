import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({
  message = 'Loading data...',
  fullPage = false,
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-3 animate-in fade-in">
      <Loader2 className={`${sizeMap} animate-spin text-primary`} />
      {message && <p className="text-sm font-medium text-slate-muted">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center w-full">
        {content}
      </div>
    );
  }

  return content;
};
