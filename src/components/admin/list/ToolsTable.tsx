import React from 'react';
import { Tool, ToolStatus } from '../../../types';
import ToolListItem from './ToolListItem';

interface ToolsTableProps {
  tools: Tool[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ToolStatus) => void;
}

export default function ToolsTable({ tools, onEdit, onDelete, onStatusChange }: ToolsTableProps) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      <div className="relative overflow-x-auto border border-white/10 rounded-lg backdrop-blur-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tool
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50 backdrop-blur-xl divide-y divide-gray-800">
            {tools.map((tool) => (
              <ToolListItem
                key={tool.id}
                tool={tool}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}