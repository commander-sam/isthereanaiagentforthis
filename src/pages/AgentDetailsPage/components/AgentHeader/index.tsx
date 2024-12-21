import React from 'react';
import { Agent } from '../../../../types';
import AgentImage from './AgentImage';
import AgentInfo from './AgentInfo';

interface AgentHeaderProps {
  agent: Agent;
}

export default function AgentHeader({ agent }: AgentHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600">
      {/* Geometric patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <AgentImage imageUrl={agent.imageUrl} name={agent.name} />
          <AgentInfo agent={agent} />
        </div>
      </div>
    </div>
  );
}