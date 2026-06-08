import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A89183]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`h-[52px] w-full rounded-2xl border border-[#E3CFC2] bg-white text-[#3D2B1F] placeholder:text-[#A89183] outline-none transition-all focus:border-[#964824] focus:ring-4 focus:ring-[#964824]/10 hover:border-[#964824]/40 disabled:bg-gray-100 disabled:cursor-not-allowed ${icon ? 'pl-12 pr-4' : 'px-4'} ${rightIcon ? 'pr-12' : ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89183]">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input';
export default Input;
