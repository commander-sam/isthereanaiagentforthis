import React from 'react';
import { Brain, Zap, Shield, RefreshCw } from 'lucide-react';
import GradientCard from '../../../../components/common/GradientCard';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Powered by state-of-the-art language models and neural networks'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Fast and efficient responses with minimal latency'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with data encryption'
  },
  {
    icon: RefreshCw,
    title: 'Continuous Learning',
    description: 'Improves over time through user interactions and feedback'
  }
];

export default function Features() {
  return (
    <GradientCard>
      <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <feature.icon className="h-6 w-6 text-blue-400" />
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