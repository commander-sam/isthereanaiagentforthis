import React from 'react';
import { Tool } from '../../types';

interface ToolHeaderProps {
  tool: Tool;
}

export default function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{tool.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}