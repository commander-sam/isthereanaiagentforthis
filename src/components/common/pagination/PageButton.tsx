import React from 'react';

interface PageButtonProps {
  page: number;
  isActive?: boolean;
  onClick: (page: number) => void;
}

export default function PageButton({ page, isActive, onClick }: PageButtonProps) {
  return (
    <button
      onClick={() => onClick(page)}
      className={`
        px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }
      `}
    >
      {page}
    </button>
  );
}