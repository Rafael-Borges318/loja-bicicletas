import React, { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  const reactId = useId();
  const generatedId = id || reactId;
  
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={generatedId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={generatedId}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
