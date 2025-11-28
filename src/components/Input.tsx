import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const baseClasses = "w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base bg-white transition-shadow";
  return (
    <input
      ref={ref}
      className={`${baseClasses} ${className || ''}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
