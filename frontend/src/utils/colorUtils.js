/**
 * Color mapping utilities for consistent design token application
 * Configured for Light Mode First Theme (Burgundy, Cream, Ivory, Coral, Yellow)
 */

export const getScoreColorClass = (score) => {
  if (score >= 80) return 'text-success border-success/30 bg-success/10';
  if (score >= 60) return 'text-burgundy border-burgundy/30 bg-burgundy/10';
  if (score >= 40) return 'text-[#9A7200] border-yellow/40 bg-yellow/15';
  return 'text-danger border-danger/30 bg-danger/10';
};

export const getMatchBadgeClass = (percentage) => {
  if (percentage >= 85) return 'bg-success/10 text-success border-success/30';
  if (percentage >= 70) return 'bg-burgundy/10 text-burgundy border-burgundy/25';
  if (percentage >= 50) return 'bg-yellow/15 text-[#9A7200] border-yellow/40';
  return 'bg-danger/10 text-danger border-danger/30';
};

export const getStatusBadgeClass = (status) => {
  const norm = (status || '').toLowerCase();
  switch (norm) {
    case 'selected':
    case 'active':
    case 'verified':
    case 'ready & analyzed':
      return 'bg-success/10 text-success border-success/30';
    case 'shortlisted':
    case 'interview':
    case 'upcoming':
      return 'bg-burgundy/10 text-burgundy border-burgundy/25';
    case 'under review':
    case 'pending review':
    case 'applied':
      return 'bg-yellow/15 text-[#9A7200] border-yellow/40';
    case 'rejected':
    case 'flagged':
    case 'suspended':
      return 'bg-danger/10 text-danger border-danger/30';
    default:
      return 'bg-cream-soft text-slate-muted border-border';
  }
};
