import React from 'react';
import AgentCard from '../AgentCard';
import { Agent } from '../../types';

interface FeaturedAgentsProps {
  agents: Agent[];
}

export default function FeaturedAgents({ agents }: FeaturedAgentsProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),rgba(59,130,246,0)_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Featured Agents
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent ml-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}