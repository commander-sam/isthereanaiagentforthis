import React from 'react';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}

export default function ToolbarButton({ onClick, isActive, children, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
      }`}
      title={title}
    >
      {children}
    </button>
  );
}