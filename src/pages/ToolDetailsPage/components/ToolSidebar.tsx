import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Tool } from '../../../types';

interface ToolSidebarProps {
  tool: Tool;
}

export default function ToolSidebar({ tool }: ToolSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Links Section */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur"></div>
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <div className="space-y-3">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Website
            </a>
            {tool.githubUrl && (
              <a 
                href={tool.githubUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub Repository
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur"></div>
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-400">Category</dt>
              <dd className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {tool.category}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Last Updated</dt>
              <dd className="mt-1 text-white">March 15, 2024</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">License</dt>
              <dd className="mt-1 text-white">MIT</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}