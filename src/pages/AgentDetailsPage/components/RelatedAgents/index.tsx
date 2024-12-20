import React from 'react';
import { Agent } from '../../../../types';
import AgentCard from '../../../../components/AgentCard';
import GradientCard from '../../../../components/common/GradientCard';

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
    <GradientCard>
      <h2 className="text-2xl font-bold text-white mb-6">Related AI Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.slice(0, 3).map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </GradientCard>
  );
}