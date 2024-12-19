import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export default function FormInput({ 
  label, 
  error, 
  helperText,
  icon,
  className = '',
  ...props 
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-300 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative flex items-center">
          <input
            {...props}
            className={`w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${icon ? 'pl-11' : ''} ${className}`}
          />
          {icon && (
            <div className="absolute left-3 text-blue-400">
              {icon}
            </div>
          )}
        </div>
      </div>
      {helperText && (
        <p className="mt-1 text-sm text-blue-300/70">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}