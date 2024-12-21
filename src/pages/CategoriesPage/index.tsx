import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useAgents } from '../../hooks/useAgents';
import CategoryCard from './components/CategoryCard';
import PageTitle from '../../components/common/PageTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function CategoriesPage() {
  const { categories, isLoading: loadingCategories, error: categoriesError } = useCategories();
  const { agents, isLoading: loadingAgents, error: agentsError } = useAgents();

  if (loadingCategories || loadingAgents) {
    return <LoadingSpinner />;
  }

  if (categoriesError || agentsError) {
    return (
      <ErrorMessage 
        title="Error Loading Categories"
        message={categoriesError || agentsError || 'Failed to load data'}
      />
    );
  }

  const getCategoryAgentCount = (categoryId: string) => {
    return agents.filter(agent => agent.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Browse by Category"
          subtitle="Explore our curated collection of AI agents by category"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/agents?category=${category.id}`}
              className="block group"
            >
              <CategoryCard 
                category={category} 
                agentCount={getCategoryAgentCount(category.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}