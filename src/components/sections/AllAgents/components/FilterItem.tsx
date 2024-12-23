import React from 'react';
import * as Icons from 'lucide-react';

interface FilterItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export default function FilterItem({ icon, label, isActive, onClick, color }: FilterItemProps) {
  // Get the icon component from lucide-react
  const Icon = Icons[icon as keyof typeof Icons] || Icons.Sparkles;

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full transition-all ${
        isActive
          ? `${color} text-white shadow-lg`
          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}