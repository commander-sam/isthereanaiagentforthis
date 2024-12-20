import React from 'react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';

interface DescriptionProps {
  agent: Agent;
}

export default function Description({ agent }: DescriptionProps) {
  return (
    <GradientCard>
      <h2 className="text-2xl font-bold text-white mb-6">About {agent.name}</h2>
      <div 
        className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300"
        dangerouslySetInnerHTML={{ __html: agent.description }}
      />
    </GradientCard>
  );
}