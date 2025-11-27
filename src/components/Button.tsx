import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary';
  className?: string;
};

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-3 font-semibold text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = 'bg-primary-base hover:bg-primary-hover focus:ring-primary-base';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
