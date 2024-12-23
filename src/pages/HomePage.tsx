import React from 'react';
import Hero from '../components/Hero';
import FeaturedAgents from '../components/sections/FeaturedAgents';
import AllAgents from '../components/sections/AllAgents';
import FAQ from '../components/sections/FAQ';
import { useAgents } from '../hooks/useAgents';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function HomePage() {
  const { agents, isLoading, error } = useAgents();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Error Loading Data"
        message={error}
      />
    );
  }

  const featuredAgents = agents.filter(agent => agent.featured);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeaturedAgents agents={featuredAgents} />
      <AllAgents agents={agents} />
      <FAQ />
    </div>
  );
}