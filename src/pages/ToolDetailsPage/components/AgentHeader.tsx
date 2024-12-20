import React from 'react';
import { ExternalLink, Star, Users, Clock, Award } from 'lucide-react';
import { Agent } from '../../../types';
import ShareButton from '../../../components/common/ShareButton';
import ActionButton from '../../../components/common/ActionButton';
import CategoryBadge from '../../../components/common/CategoryBadge';
import Stats from '../../../components/common/Stats';

interface AgentHeaderProps {
  agent: Agent;
}

export default function AgentHeader({ agent }: AgentHeaderProps) {
  const stats = [
    { label: '50k+ Monthly Users', icon: Users },
    { label: 'Updated 2 days ago', icon: Clock },
    { label: 'Featured Agent', icon: Award },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600">
      {/* Geometric patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Agent Image */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-50 blur"></div>
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border border-white/20 backdrop-blur-xl">
              <img
                src={agent.imageUrl}
                alt={agent.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Agent Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-white">{agent.name}</h1>
              <CategoryBadge category={agent.category} className="bg-white/10 text-white border-white/20" />
            </div>
            <p className="text-xl text-blue-100 mb-8">{agent.shortDescription}</p>
            
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <ActionButton
                icon={ExternalLink}
                label="Visit Website"
                href={agent.url}
              />
              <ShareButton url={window.location.href} title={agent.name} />
              <ActionButton
                icon={Star}
                label="Save"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Stats stats={stats} />
        </div>
      </div>
    </div>
  );
}