import React from 'react';
import { Tool } from '../../../types';

interface ToolContentProps {
  tool: Tool;
}

export default function ToolContent({ tool }: ToolContentProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">About {tool.name}</h2>
        <div 
          className="prose prose-invert prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
      </div>
    </div>
  );
}