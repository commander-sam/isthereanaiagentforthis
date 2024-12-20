import React from 'react';

interface HeaderProps {
  agentCount: number;
}

export default function Header({ agentCount }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-white">All AI Agents</h2>
      <p className="text-gray-400">
        {agentCount} {agentCount === 1 ? 'agent' : 'agents'} found
      </p>
    </div>
  );
}