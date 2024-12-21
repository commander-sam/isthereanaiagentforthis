import React from 'react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';
import CategoryBadge from '../../../../components/common/CategoryBadge';

interface DetailsProps {
  agent: Agent;
}

const formatValue = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Details({ agent }: DetailsProps) {
  const details = [
    {
      label: 'Category',
      value: <CategoryBadge category={agent.category} />
    },
    {
      label: 'Pricing',
      value: <span className="text-white">{formatValue(agent.pricing)}</span>
    },
    {
      label: 'Source',
      value: <span className="text-white">{formatValue(agent.source)}</span>
    }
  ];

  return (
    <GradientCard>
      <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
      <dl className="space-y-3">
        {details.map((detail, index) => (
          <div key={index}>
            <dt className="text-sm text-gray-400">{detail.label}</dt>
            <dd className="mt-1">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </GradientCard>
  );
}