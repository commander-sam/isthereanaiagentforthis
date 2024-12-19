import React from 'react';
import { Category } from '../../../types';

interface FiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Filters({ categories, selectedCategory, onCategoryChange }: FiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="all"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
                className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600"
              />
              <label htmlFor="all" className="ml-2 text-gray-700 dark:text-gray-300">
                All Categories
              </label>
            </div>
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={category.id}
                  name="category"
                  checked={selectedCategory === category.id}
                  onChange={() => onCategoryChange(category.id)}
                  className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor={category.id} className="ml-2 text-gray-700 dark:text-gray-300">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}