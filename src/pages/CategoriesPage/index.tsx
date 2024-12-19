import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import CategoryCard from './components/CategoryCard';
import { tools } from '../../data/tools';

export default function CategoriesPage() {
  const getCategoryToolCount = (categoryId: string) => {
    return tools.filter(tool => tool.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore our curated collection of AI tools by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/tools?category=${category.id}`}
              className="block hover:transform hover:scale-105 transition-transform duration-200"
            >
              <CategoryCard 
                category={category} 
                toolCount={getCategoryToolCount(category.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}