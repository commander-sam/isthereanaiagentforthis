import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-100 transition-all duration-500 blur"></div>
      
      {/* Card content */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20">
        <Link to={`/agent/${agent.id}`}>
          <div className="relative h-48">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
            
            {/* Agent image */}
            <img
              src={agent.imageUrl}
              alt={agent.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            
            {/* Featured badge */}
            {agent.featured && (
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-blue-400" />
                    <span className="text-xs font-medium text-blue-400">Featured</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-6">
          <Link to={`/agent/${agent.id}`}>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
              {agent.name}
            </h3>
          </Link>
          
          <p className="text-gray-400 mb-4 line-clamp-2">
            {agent.shortDescription}
          </p>
          
          <div className="flex justify-between items-center">
            {/* Category badge */}
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {agent.category}
            </span>
            
            {/* Visit link */}
            <a
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Visit <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}