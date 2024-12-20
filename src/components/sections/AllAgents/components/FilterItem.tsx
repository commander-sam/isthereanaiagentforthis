import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export default function FilterItem({ icon: Icon, label, isActive, onClick, color }: FilterItemProps) {
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