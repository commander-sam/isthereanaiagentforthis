import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Agent } from '../types';
import { getGitHubLogoUrl } from '../utils/logoUrl';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-100 transition-all duration-500 blur"></div>
      
      {/* Card content */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20">
        <Link to={`/agent/${agent.id}`}>
          <div className="flex items-start p-4">
            {/* Square logo container */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <img
                src={agent.imageUrl || getGitHubLogoUrl('default')}
                alt={agent.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = getGitHubLogoUrl('default');
                }}
              />
            </div>

            {/* Agent info */}
            <div className="ml-4 flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                {agent.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                {agent.shortDescription}
              </p>
            </div>

            {/* Featured badge - absolute positioned */}
            {agent.featured && (
              <div className="absolute top-2 right-2">
                <div className="px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-blue-400" />
                    <span className="text-xs font-medium text-blue-400">Featured</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>
        
        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/5 bg-white/5 flex items-center justify-between">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {agent.category}
          </span>
          
          <a
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Visit <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}