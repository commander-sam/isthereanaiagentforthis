import React from 'react';

interface HeaderProps {
  toolCount: number;
}

export default function Header({ toolCount }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-white">All Tools</h2>
      <p className="text-gray-400">
        {toolCount} {toolCount === 1 ? 'tool' : 'tools'} found
      </p>
    </div>
  );
}