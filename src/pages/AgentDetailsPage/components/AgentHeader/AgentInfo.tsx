import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { Agent } from '../../../../types';
import ActionButton from '../../../../components/common/ActionButton';
import CategoryBadge from '../../../../components/common/CategoryBadge';

interface AgentInfoProps {
  agent: Agent;
}

export default function AgentInfo({ agent }: AgentInfoProps) {
  return (
    <div className="flex-1 text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <h1 className="text-4xl font-bold text-white">{agent.name}</h1>
        <CategoryBadge 
          category={agent.category} 
          className="bg-white/10 text-white border-white/20" 
        />
      </div>
      
      <p className="text-xl text-blue-100 mb-8">{agent.shortDescription}</p>
      
      <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
        <ActionButton
          icon={ExternalLink}
          label="Visit Website"
          href={agent.url}
        />
        {agent.featured && (
          <div className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white">
            <Award className="h-5 w-5 mr-2" />
            Featured Agent
          </div>
        )}
      </div>
    </div>
  );
}