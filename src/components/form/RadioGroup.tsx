import React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RadioGroup({ label, name, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-300 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-blue-500 border-white/10 bg-gray-900/50 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <span className="ml-2 text-white">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}