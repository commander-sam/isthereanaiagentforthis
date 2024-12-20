import React from 'react';
import { Agent, AgentStatus } from '../../../types';
import AgentsTable from './AgentsTable';

interface AgentsListProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AgentStatus) => void;
  onToggleFeatured: (id: string) => void;
  selectedAgents: string[];
  onSelectionChange: (ids: string[]) => void;
}

export default function AgentsList({ 
  agents, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onToggleFeatured,
  selectedAgents,
  onSelectionChange
}: AgentsListProps) {
  return (
    <AgentsTable 
      agents={agents} 
      onEdit={onEdit} 
      onDelete={onDelete} 
      onStatusChange={onStatusChange}
      onToggleFeatured={onToggleFeatured}
      selectedAgents={selectedAgents}
      onSelectionChange={onSelectionChange}
    />
  );
}