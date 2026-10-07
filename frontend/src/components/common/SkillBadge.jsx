import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

export const SkillBadge = ({
  skill,
  name,
  matched,
  type, // 'matched' | 'missing' | 'default'
  size = 'md',
  className = '',
}) => {
  // Support both 'skill' prop and legacy 'name'/'matched' prop
  const skillName = typeof skill === 'string' ? skill : skill?.name || name || '';
  const isMatched = type === 'matched' || matched === true;
  const isMissing = type === 'missing';

  let style = 'bg-cream-soft text-slate-text border-border';
  if (isMatched) {
    style = 'bg-success/10 text-success border-success/30';
  } else if (isMissing) {
    style = 'bg-coral/10 text-coral border-coral/30';
  }

  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium ${sizeClass} ${style} ${className}`}
    >
      {isMatched && <Check className="w-3 h-3 text-success flex-shrink-0" />}
      {isMissing && <AlertCircle className="w-3 h-3 text-coral flex-shrink-0" />}
      <span>{skillName}</span>
    </span>
  );
};
