import React from 'react';
import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';

interface ToolsListProps {
  tools: Tool[];
}

export default function ToolsList({ tools }: ToolsListProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No tools found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}