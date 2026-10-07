import React from 'react';

const DEFAULT_ITEMS = [
  'Resume Analysis',
  'AI Skill Matching',
  'Placement Tracking',
  'Smart Job Recommendations',
  'Recruiter Intelligence',
  'Application Tracking',
  'Campus Placement Analytics',
  'Career Readiness',
];

/**
 * TextTicker
 * Live horizontal scrolling ticker displaying product and placement pulses.
 * Smooth infinite loop, pause on hover, zero horizontal overflow.
 */
export const TextTicker = ({
  items = DEFAULT_ITEMS,
  className = '',
}) => {
  // Duplicate array once for seamless loop
  const displayItems = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-y border-border bg-cream-soft py-2.5 select-none relative ${className}`}
      aria-label="Product highlights ticker"
    >
      {/* Edge gradient masks for seamless visual transition */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex items-center gap-8">
        {displayItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 flex-shrink-0 text-xs font-mono tracking-wider uppercase text-slate-muted"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0" />
            <span className="hover:text-burgundy transition-colors font-medium cursor-default">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
