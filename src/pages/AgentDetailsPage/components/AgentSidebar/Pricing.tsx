import React from 'react';
import { Check } from 'lucide-react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';

interface PricingProps {
  agent: Agent;
}

export default function Pricing({ agent }: PricingProps) {
  const pricingFeatures = [
    'Access to core features',
    'API integration',
    'Community support',
    'Regular updates'
  ];

  return (
    <GradientCard>
      <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">Free</span>
          <span className="ml-2 text-gray-400">to get started</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Premium features available with paid plans
        </p>
      </div>
      <ul className="space-y-3">
        {pricingFeatures.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}