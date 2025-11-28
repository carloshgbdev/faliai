import React from 'react';

type ToggleSwitchProps = {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
};

export const ToggleSwitch = ({ label, enabled, onChange, className = '' }: ToggleSwitchProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-lg text-text-main mr-4">{label}</span>
      <label htmlFor={label} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={label}
            type="checkbox"
            className="sr-only"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className={`block w-12 h-7 rounded ${enabled ? 'bg-primary-base' : 'bg-gray-300'}`}></div>
          <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded transition-transform ${enabled ? 'transform translate-x-5' : ''}`}></div>
        </div>
      </label>
    </div>
  );
};
