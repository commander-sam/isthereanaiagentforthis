import React from 'react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';
import CategoryBadge from '../../../../components/common/CategoryBadge';

interface DetailsProps {
  agent: Agent;
}

export default function Details({ agent }: DetailsProps) {
  const details = [
    {
      label: 'Category',
      value: <CategoryBadge category={agent.category} />
    },
    {
      label: 'Last Updated',
      value: <span className="text-white">March 15, 2024</span>
    },
    {
      label: 'Version',
      value: <span className="text-white">2.0.0</span>
    },
    {
      label: 'License',
      value: <span className="text-white">MIT</span>
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