import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  name,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-text mb-1.5">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none bg-white text-slate-text text-sm rounded-lg border py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-border focus:border-burgundy focus:ring-burgundy/15'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val} className="bg-white text-slate-text">
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger font-medium">{error}</p>}
    </div>
  );
};
