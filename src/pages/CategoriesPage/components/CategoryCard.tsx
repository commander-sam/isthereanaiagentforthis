import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../../../types';

interface CategoryCardProps {
  category: Category;
  toolCount: number;
}

export default function CategoryCard({ category, toolCount }: CategoryCardProps) {
  const Icon = Icons[category.icon as keyof typeof Icons];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        {Icon && (
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        )}
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {category.name}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
    </div>
  );
}