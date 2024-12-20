import React from 'react';
import { ExternalLink, Share2, Star } from 'lucide-react';
import { Tool } from '../../../types';
import ShareButton from '../../../components/common/ShareButton';

interface ToolHeaderProps {
  tool: Tool;
}

export default function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-90 animate-gradient-x"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Tool Image */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-50 blur"></div>
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border border-white/20 backdrop-blur-xl">
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Tool Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-white">{tool.name}</h1>
              {tool.featured && (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Featured</span>
                </span>
              )}
            </div>
            <p className="text-xl text-blue-100 mb-8">{tool.shortDescription}</p>
            
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Visit Website
              </a>
              <ShareButton url={window.location.href} title={tool.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}