import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={textareaId} className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-2xl border border-[#E3CFC2] bg-white p-4 text-[#3D2B1F] placeholder:text-[#A89183] outline-none transition-all focus:border-[#964824] focus:ring-4 focus:ring-[#964824]/10 hover:border-[#964824]/40 resize-y min-h-[120px] disabled:bg-gray-100 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''} ${className}`}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
export default Textarea;
