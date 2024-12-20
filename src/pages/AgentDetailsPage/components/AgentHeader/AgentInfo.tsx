import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Agent } from '../../../../types';
import ActionButton from '../../../../components/common/ActionButton';
import ShareButton from '../../../../components/common/ShareButton';
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
        <ShareButton 
          url={window.location.href} 
          title={agent.name} 
        />
        <ActionButton
          icon={Star}
          label="Save"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}