import React from 'react';
import { Tool, ToolStatus } from '../../../types';
import EditToolButton from '../actions/EditToolButton';
import DeleteToolButton from '../actions/DeleteToolButton';
import StatusBadge from './StatusBadge';
import StatusActions from './StatusActions';

interface ToolListItemProps {
  tool: Tool;
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ToolStatus) => void;
}

export default function ToolListItem({ tool, onEdit, onDelete, onStatusChange }: ToolListItemProps) {
  return (
    <tr className="group hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            <img 
              className="relative h-full w-full object-cover" 
              src={tool.imageUrl} 
              alt={tool.name} 
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{tool.name}</div>
            <div className="text-sm text-gray-400">{tool.shortDescription}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={tool.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/50 text-blue-300 border border-blue-500/20">
          {tool.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <StatusActions 
            status={tool.status}
            onStatusChange={(status) => onStatusChange(tool.id, status)}
          />
          <EditToolButton tool={tool} onEdit={onEdit} />
          <DeleteToolButton toolId={tool.id} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}