import React from 'react';
import { Agent } from '../../../../types';
import Links from './Links';
import Details from './Details';

interface AgentSidebarProps {
  agent: Agent;
}

export default function AgentSidebar({ agent }: AgentSidebarProps) {
  return (
    <div className="space-y-6">
      <Links agent={agent} />
      <Details agent={agent} />
    </div>
  );
}