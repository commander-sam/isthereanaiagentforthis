import React from 'react';
import { useParams } from 'react-router-dom';
import { useAgentDetails } from '../../hooks/useAgentDetails';
import AgentHeader from './components/AgentHeader';
import AgentContent from './components/AgentContent';
import AgentSidebar from './components/AgentSidebar';
import RelatedAgents from './components/RelatedAgents';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function AgentDetailsPage() {
  const { id } = useParams();
  const { agent, relatedAgents, isLoading, error } = useAgentDetails(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !agent) {
    return (
      <ErrorMessage 
        title="Agent Not Found"
        message="The AI agent you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-purple-900/50 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative">
        <AgentHeader agent={agent} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AgentContent agent={agent} />
            </div>
            <div>
              <AgentSidebar agent={agent} />
            </div>
          </div>

          {relatedAgents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Related AI Agents</h2>
              <RelatedAgents agents={relatedAgents} currentAgentId={agent.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}