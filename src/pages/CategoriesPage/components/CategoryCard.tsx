import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../../../types';
import GradientCard from '../../../components/common/GradientCard';

interface CategoryCardProps {
  category: Category;
  agentCount: number;
}

export default function CategoryCard({ category, agentCount }: CategoryCardProps) {
  const Icon = Icons[category.icon as keyof typeof Icons];

  return (
    <GradientCard className="group-hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <Icon className="h-8 w-8 text-blue-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-blue-400">
            {agentCount} {agentCount === 1 ? 'agent' : 'agents'}
          </p>
        </div>
      </div>
      <p className="text-gray-400">{category.description}</p>
    </GradientCard>
  );
}