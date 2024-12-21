import React from 'react';
import FormInput from '../../../form/FormInput';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextInput({ 
  label, 
  name, 
  value = '', // Provide default empty string
  onChange, 
  error, 
  placeholder,
  type = 'text',
  multiline = false,
  rows = 3
}: TextInputProps) {
  // Ensure value is always a string
  const inputValue = value ?? '';

  if (multiline) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-300 mb-2">
          {label}
        </label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <textarea
            name={name}
            value={inputValue}
            onChange={(e) => onChange(name, e.target.value)}
            rows={rows}
            className="relative w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder={placeholder}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <FormInput
      label={label}
      name={name}
      type={type}
      value={inputValue}
      onChange={(e) => onChange(name, e.target.value)}
      error={error}
      placeholder={placeholder}
    />
  );
}