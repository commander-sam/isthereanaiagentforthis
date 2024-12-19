import React from 'react';
import { Category } from '../types';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = Icons[category.icon as keyof typeof Icons];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {Icon && <Icon className="h-8 w-8 text-blue-600" />}
        <h3 className="text-xl font-semibold ml-3">{category.name}</h3>
      </div>
      <p className="text-gray-600">{category.description}</p>
    </div>
  );
}