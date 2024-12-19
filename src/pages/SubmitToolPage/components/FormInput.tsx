import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-300 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <input
          {...props}
          className="relative w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}