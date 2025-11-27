import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-bg-surface p-6 rounded-lg shadow-md border border-border ${className}`}>
      {children}
    </div>
  );
};
