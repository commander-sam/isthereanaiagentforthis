import React from 'react';
import { useAgents } from '../../hooks/useAgents';
import AllAgents from '../../components/sections/AllAgents';
import PageTitle from '../../components/common/PageTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function AgentsPage() {
  const { agents, isLoading, error } = useAgents();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Error Loading Agents"
        message={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="AI Agents Directory"
          subtitle="Discover and explore powerful AI agents for every task"
        />
        <AllAgents agents={agents} />
      </div>
    </div>
  );
}