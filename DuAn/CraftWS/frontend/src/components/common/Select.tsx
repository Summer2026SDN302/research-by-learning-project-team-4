import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, icon, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={selectId} className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A89183]">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            className={`h-[52px] w-full rounded-2xl border border-[#E3CFC2] bg-white text-[#3D2B1F] outline-none transition-all focus:border-[#964824] focus:ring-4 focus:ring-[#964824]/10 hover:border-[#964824]/40 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none ${icon ? 'pl-12 pr-10' : 'px-4 pr-10'} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''} ${className}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A89183]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
        {error && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
