import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

export default function NavigationButton({ icon: Icon, onClick, disabled, label }: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}