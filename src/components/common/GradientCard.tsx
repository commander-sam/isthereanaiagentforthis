import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientCard({ children, className = '' }: GradientCardProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur"></div>
      <div className={`relative bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}