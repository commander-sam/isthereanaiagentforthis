import React from 'react';
import { Agent } from '../../../types';
import AgentCard from '../../../components/AgentCard';

interface RelatedAgentsProps {
  agents: Agent[];
  currentAgentId: string;
}

export default function RelatedAgents({ agents, currentAgentId }: RelatedAgentsProps) {
  const filteredAgents = agents.filter(agent => agent.id !== currentAgentId);

  if (filteredAgents.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAgents.slice(0, 3).map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}