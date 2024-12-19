import React from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { Tool } from '../../../types';
import ShareButton from '../../../components/common/ShareButton';

interface ToolHeaderProps {
  tool: Tool;
}

export default function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <img
            src={tool.imageUrl}
            alt={tool.name}
            className="h-24 w-24 rounded-xl shadow-lg object-cover bg-white dark:bg-gray-800 p-2"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-bold">{tool.name}</h1>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 dark:bg-blue-600 bg-opacity-25">
                {tool.category}
              </span>
            </div>
            <p className="mt-2 text-xl text-blue-100">{tool.shortDescription}</p>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-white dark:bg-blue-600 text-blue-600 dark:text-white rounded-lg hover:bg-blue-50 dark:hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Visit Website
          </a>
          <ShareButton url={window.location.href} title={tool.name} />
        </div>
      </div>
    </div>
  );
}