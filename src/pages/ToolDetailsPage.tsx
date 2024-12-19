import React from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, Star, Share2, Users, Clock, Award, Github } from 'lucide-react';
import { useToolDetails } from '../hooks/useToolDetails';
import RelatedTools from '../components/tools/RelatedTools';
import ShareButton from '../components/common/ShareButton';

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
      {/* Hero Section */}
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>50k+ Monthly Users</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Updated 2 days ago</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Featured Tool</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-base font-medium text-blue-700 dark:text-white bg-white dark:bg-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700 transition-colors max-w-xs"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit Website
            </a>
            <ShareButton url={window.location.href} title={tool.name} />
            <button className="flex items-center justify-center px-8 py-3 border border-white rounded-lg text-base font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors">
              <Star className="h-5 w-5 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About {tool.name}</h2>
              <div 
                className="prose prose-blue dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: tool.description }}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Intuitive user interface',
                  'Advanced AI capabilities',
                  'Regular updates',
                  'Active community',
                  'Comprehensive documentation',
                  'Enterprise support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="ml-4 text-gray-600 dark:text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
              <div className="space-y-3">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Website
                </a>
                <a href="#" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub Repository
                </a>
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
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Tools</h2>
          <RelatedTools tools={relatedTools} currentToolId={tool.id} />
        </div>
      </div>
    </div>
  );
}