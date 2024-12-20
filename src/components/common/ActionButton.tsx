import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function ActionButton({ icon: Icon, label, onClick, href, className = '' }: ActionButtonProps) {
  const buttonClasses = `px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center gap-2 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <Icon className="h-5 w-5" />
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}