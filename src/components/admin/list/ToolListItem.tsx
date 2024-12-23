import React from 'react';
import { Agent, AgentStatus } from '../../../types';
import EditToolButton from '../actions/EditToolButton';
import DeleteToolButton from '../actions/DeleteToolButton';
import StatusBadge from './StatusBadge';
import StatusActions from './StatusActions';
import { Star } from 'lucide-react';

interface ToolListItemProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AgentStatus) => void;
  onToggleFeatured: (id: string) => void;
  isSelected: boolean;
  onSelectionChange: (id: string, selected: boolean) => void;
}

export default function ToolListItem({ 
  agent, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onToggleFeatured,
  isSelected,
  onSelectionChange
}: ToolListItemProps) {
  return (
    <tr className="group hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectionChange(agent.id, e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            <img 
              className="relative h-full w-full object-cover" 
              src={agent.imageUrl} 
              alt={agent.name} 
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{agent.name}</div>
            <div className="text-sm text-gray-400">{agent.shortDescription}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={agent.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/50 text-blue-300 border border-blue-500/20">
          {agent.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleFeatured(agent.id)}
            className={`p-1 rounded transition-colors ${
              agent.featured 
                ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20' 
                : 'text-gray-400 hover:text-gray-300 bg-gray-500/10 hover:bg-gray-500/20'
            }`}
            title={agent.featured ? 'Remove from featured' : 'Add to featured'}
          >
            <Star className="h-5 w-5" />
          </button>
          <StatusActions 
            status={agent.status}
            onStatusChange={(status) => onStatusChange(agent.id, status)}
          />
          <EditToolButton agent={agent} onEdit={onEdit} />
          <DeleteToolButton agentId={agent.id} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}