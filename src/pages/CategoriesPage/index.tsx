import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import CategoryCard from './components/CategoryCard';
import PageTitle from '../../components/common/PageTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function CategoriesPage() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Error Loading Categories"
        message={error}
      />
    );
  }

  if (!categories.length) {
    return (
      <ErrorMessage 
        title="No Categories Found"
        message="No categories are currently available."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Browse by Category"
          subtitle="Explore our curated collection of AI agents by category"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/agents?category=${category.id}`}
              className="block group"
            >
              <CategoryCard 
                category={category} 
                agentCount={0} // We'll handle this count in a separate PR
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}