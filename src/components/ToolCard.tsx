import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-white/10 backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20">
        <Link to={`/tool/${tool.id}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={tool.imageUrl}
              alt={tool.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>
        </Link>
        
        <div className="p-6">
          <Link to={`/tool/${tool.id}`}>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
          </Link>
          
          <p className="text-gray-400 mb-4 line-clamp-2">{tool.shortDescription}</p>
          
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {tool.category}
            </span>
            
            <a
              href={tool.url}
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