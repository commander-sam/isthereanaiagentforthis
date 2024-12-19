import React from 'react';
import { Tool } from '../../../types';

interface ToolContentProps {
  tool: Tool;
}

export default function ToolContent({ tool }: ToolContentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About {tool.name}</h2>
      <div 
        className="prose prose-blue dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: tool.description }}
      />
    </div>
  );
}