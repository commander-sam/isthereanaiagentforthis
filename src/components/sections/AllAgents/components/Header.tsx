import React from 'react';

interface HeaderProps {
  agentCount: number;
}

export default function Header({ agentCount }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          AI Agents Directory
        </h2>
        <p className="text-gray-400 mt-2">
          Discover powerful AI agents to enhance your workflow
        </p>
      </div>
      <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
        <p className="text-gray-300">
          <span className="text-blue-400 font-semibold">{agentCount}</span>{' '}
          {agentCount === 1 ? 'agent' : 'agents'} found
        </p>
      </div>
    </div>
  );
}