import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../../../types';
import GradientCard from '../../../components/common/GradientCard';

interface CategoryCardProps {
  category: Category & { agent_count: number };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Get the icon component from lucide-react, fallback to Sparkles if not found
  const Icon = Icons[category.icon as keyof typeof Icons] || Icons.Sparkles;

  return (
    <GradientCard className="h-full group-hover:scale-[1.02] transition-transform duration-300">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-blue-400">
              {category.agent_count} {category.agent_count === 1 ? 'agent' : 'agents'}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400 flex-grow">{category.description}</p>
      </div>
    </GradientCard>
  );
}