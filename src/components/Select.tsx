import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <select
      ref={ref}
      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base bg-white transition-shadow"
      {...props}
    >
      {props.children}
    </select>
  );
});

Select.displayName = 'Select';
