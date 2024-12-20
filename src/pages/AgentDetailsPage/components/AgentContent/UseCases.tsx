import React from 'react';
import { CheckCircle } from 'lucide-react';
import GradientCard from '../../../../components/common/GradientCard';

const useCases = [
  'Content Creation & Editing',
  'Research & Analysis',
  'Task Automation',
  'Problem Solving',
  'Learning & Education',
  'Workflow Optimization'
];

export default function UseCases() {
  return (
    <GradientCard>
      <h2 className="text-2xl font-bold text-white mb-6">Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCases.map((useCase, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-gray-300">{useCase}</span>
          </div>
        ))}
      </div>
    </GradientCard>
  );
}