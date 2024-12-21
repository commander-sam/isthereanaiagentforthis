import React from 'react';
import Hero from '../components/Hero';
import FeaturedAgents from '../components/sections/FeaturedAgents';
import AllAgents from '../components/sections/AllAgents';
import CategoriesSection from '../components/sections/CategoriesSection';
import { useAgents } from '../hooks/useAgents';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function HomePage() {
  const { agents, isLoading: loadingAgents, error: agentsError } = useAgents();
  const { categories, isLoading: loadingCategories, error: categoriesError } = useCategories();

  if (loadingAgents || loadingCategories) {
    return <LoadingSpinner />;
  }

  if (agentsError || categoriesError) {
    return (
      <ErrorMessage 
        title="Error Loading Data"
        message={agentsError || categoriesError || 'Failed to load content'}
      />
    );
  }

  const featuredAgents = agents.filter(agent => agent.featured);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeaturedAgents agents={featuredAgents} />
      <AllAgents agents={agents} />
      <CategoriesSection categories={categories} />
    </div>
  );
}