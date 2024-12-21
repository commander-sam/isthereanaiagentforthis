import React from 'react';
import { Sparkles } from 'lucide-react';
import { Feature } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';

interface FeaturesProps {
  features: Feature[];
}

export default function Features({ features }: FeaturesProps) {
  if (!features?.length) return null;

  return (
    <GradientCard>
      <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  );
}