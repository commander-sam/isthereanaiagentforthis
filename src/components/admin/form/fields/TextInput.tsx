import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  helperText?: string;
}

export default function TextInput({ 
  label, 
  name, 
  value = '', 
  onChange, 
  error, 
  placeholder,
  type = 'text',
  multiline = false,
  rows = 3,
  helperText
}: TextInputProps) {
  const inputClasses = `
    relative w-full px-4 py-3 
    bg-gray-900/50 backdrop-blur-sm 
    border border-white/10 rounded-lg 
    text-white placeholder-blue-200/50 
    focus:outline-none focus:ring-2 focus:ring-blue-500 
    transition-all
  `;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-300 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={inputClasses}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            placeholder={placeholder}
          />
        )}
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