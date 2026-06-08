import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#964824] text-white hover:bg-[#7A3518] shadow-[0_10px_24px_rgba(150,72,36,0.28)] hover:shadow-[0_12px_28px_rgba(150,72,36,0.35)]',
    secondary: 'bg-[#3D2B1F] text-white hover:bg-[#2A1D14] shadow-md',
    outline: 'border-2 border-[#E3CFC2] text-[#3D2B1F] hover:bg-[#FAF7F2] hover:border-[#964824] hover:text-[#964824]',
    ghost: 'text-[#964824] hover:bg-[#964824]/8',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm rounded-xl gap-1.5',
    md: 'h-[44px] px-6 text-[15px] rounded-2xl gap-2',
    lg: 'h-[52px] px-8 text-base rounded-2xl gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Đang xử lý...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
