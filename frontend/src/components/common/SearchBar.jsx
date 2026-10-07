import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by keyword, role, skill...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="w-4 h-4 absolute left-3.5 text-slate-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-slate-text placeholder:text-slate-dim text-sm rounded-xl border border-border pl-10 pr-9 py-2.5 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all shadow-subtle"
      />
      {value && (
        <button
          type="button"
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="absolute right-3 text-slate-muted hover:text-slate-text p-0.5"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
