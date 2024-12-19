import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Tool } from '../../../types';

interface ToolSidebarProps {
  tool: Tool;
}

export default function ToolSidebar({ tool }: ToolSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
        <div className="space-y-3">
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Website
          </a>
          {tool.githubUrl && (
            <a 
              href={tool.githubUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub Repository
            </a>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
        <dl className="space-y-3">
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Category</dt>
            <dd className="mt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {tool.category}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Last Updated</dt>
            <dd className="mt-1 text-gray-900 dark:text-gray-100">March 15, 2024</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">License</dt>
            <dd className="mt-1 text-gray-900 dark:text-gray-100">MIT</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}