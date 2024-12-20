import React from 'react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';
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
      <Features />
      <UseCases />
    </div>
  );
}