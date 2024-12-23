import React, { useState } from 'react';
import { Agent, AgentStatus } from '../../../types';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import EditAgentButton from '../actions/EditAgentButton';
import DeleteAgentButton from '../actions/DeleteAgentButton';
import StatusBadge from '../list/StatusBadge';
import StatusActions from '../list/StatusActions';

interface AgentListItemProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AgentStatus) => void;
  onToggleFeatured: (id: string) => void;
  isSelected: boolean;
  onSelectionChange: (id: string, selected: boolean) => void;
}

export default function AgentListItem({ 
  agent, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onToggleFeatured,
  isSelected,
  onSelectionChange
}: AgentListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <tr className="hover:bg-gray-800/50 transition-colors">
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
          <div className="ml-4 max-w-[24rem]">
            <div className="text-sm font-medium text-white">{agent.name}</div>
            <div className="text-sm text-gray-400 truncate">
              {agent.shortDescription}
            </div>
            {isExpanded && (
              <div className="mt-2 text-sm text-gray-400 max-h-24 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: agent.description }} />
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs text-blue-400 hover:text-blue-300 flex items-center"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show more
                </>
              )}
            </button>
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
        <div className="flex space-x-2">
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
          <EditAgentButton agent={agent} onEdit={onEdit} />
          <DeleteAgentButton agentId={agent.id} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}