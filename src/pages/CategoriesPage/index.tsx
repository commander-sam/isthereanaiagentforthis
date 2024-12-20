import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useAgents } from '../../hooks/useAgents';
import CategoryCard from './components/CategoryCard';
import PageTitle from '../../components/common/PageTitle';

export default function CategoriesPage() {
  const agents = useAgents();

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