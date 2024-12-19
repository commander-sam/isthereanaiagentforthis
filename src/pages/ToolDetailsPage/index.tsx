import React from 'react';
import { useParams } from 'react-router-dom';
import { useToolDetails } from '../../hooks/useToolDetails';
import ToolHeader from './components/ToolHeader';
import ToolContent from './components/ToolContent';
import ToolSidebar from './components/ToolSidebar';
import RelatedTools from './components/RelatedTools';

export default function ToolDetailsPage() {
  const { id } = useParams();
  const { tool, relatedTools, isLoading, error } = useToolDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tool Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The tool you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ToolHeader tool={tool} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ToolContent tool={tool} />
          </div>
          <div>
            <ToolSidebar tool={tool} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Tools</h2>
          <RelatedTools tools={relatedTools} currentToolId={tool.id} />
        </div>
      </div>
    </div>
  );
}