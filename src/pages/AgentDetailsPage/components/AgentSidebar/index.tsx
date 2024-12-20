import React from 'react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';
import Links from './Links';
import Details from './Details';
import Pricing from './Pricing';

interface AgentSidebarProps {
  agent: Agent;
}

export default function AgentSidebar({ agent }: AgentSidebarProps) {
  return (
    <div className="space-y-6">
      <Links agent={agent} />
      <Details agent={agent} />
      <Pricing agent={agent} />
    </div>
  );
}