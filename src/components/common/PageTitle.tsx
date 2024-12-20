import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      {subtitle && (
        <p className="text-lg text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}