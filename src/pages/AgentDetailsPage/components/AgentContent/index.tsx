import React from 'react';
import { Agent } from '../../../../types';
import Description from './Description';
import Features from './Features';
import UseCases from './UseCases';

interface AgentContentProps {
  agent: Agent;
}

export default function AgentContent({ agent }: AgentContentProps) {
  return (
    <div className="space-y-8">
      <Description agent={agent} />
      {agent.features && <Features features={agent.features} />}
      {agent.useCases && <UseCases useCases={agent.useCases} />}
    </div>
  );
}