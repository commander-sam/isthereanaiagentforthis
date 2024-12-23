import React, { useState } from 'react';
import { Agent, AgentStatus } from '../../../types';
import AgentListItem from './AgentListItem';
import Pagination from '../../common/pagination/Pagination';
import { usePagination } from '../../../hooks/usePagination';

interface AgentsTableProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AgentStatus) => void;
  onToggleFeatured: (id: string) => void;
  selectedAgents: string[];
  onSelectionChange: (ids: string[]) => void;
}

const ITEMS_PER_PAGE = 10;

export default function AgentsTable({ 
  agents = [], 
  onEdit, 
  onDelete, 
  onStatusChange,
  onToggleFeatured,
  selectedAgents,
  onSelectionChange
}: AgentsTableProps) {
  const [page, setPage] = useState(1);
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    agents,
    page,
    ITEMS_PER_PAGE,
    setPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(currentItems.map(agent => agent.id));
    } else {
      onSelectionChange([]);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      <div className="relative overflow-x-auto border border-white/10 rounded-lg backdrop-blur-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={currentItems.length > 0 && currentItems.every(agent => selectedAgents.includes(agent.id))}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Agent
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
            {currentItems.map((agent) => (
              <AgentListItem
                key={agent.id}
                agent={agent}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                onToggleFeatured={onToggleFeatured}
                isSelected={selectedAgents.includes(agent.id)}
                onSelectionChange={(id, selected) => {
                  if (selected) {
                    onSelectionChange([...selectedAgents, id]);
                  } else {
                    onSelectionChange(selectedAgents.filter(agentId => agentId !== id));
                  }
                }}
              />
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  );
}