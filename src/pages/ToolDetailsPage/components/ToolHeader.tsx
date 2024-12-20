import React from 'react';
import { ExternalLink, Share2, Star } from 'lucide-react';
import { Tool } from '../../../types';
import ShareButton from '../../../components/common/ShareButton';

interface ToolHeaderProps {
  tool: Tool;
}

export default function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600">
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
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                {tool.category}
              </span>
            </div>
            <p className="text-xl text-blue-100 mb-8">{tool.shortDescription}</p>
            
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Visit Website
              </a>
              <ShareButton url={window.location.href} title={tool.name} />
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <Star className="h-5 w-5" />
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center text-white">
              <span>50k+ Monthly Users</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center text-white">
              <span>Updated 2 days ago</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="flex items-center text-white">
              <span>Featured Tool</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}