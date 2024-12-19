import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20"></div>
      <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
        <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}