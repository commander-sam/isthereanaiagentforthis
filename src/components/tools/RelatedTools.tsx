import React from 'react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';

interface RelatedToolsProps {
  tools: Tool[];
  currentToolId: string;
}

export default function RelatedTools({ tools, currentToolId }: RelatedToolsProps) {
  const filteredTools = tools.filter(tool => tool.id !== currentToolId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTools.slice(0, 3).map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}