import React from 'react';
import { Tool } from '../../types';
import { CheckCircle } from 'lucide-react';

interface ToolFeaturesProps {
  tool: Tool;
}

export default function ToolFeatures({ tool }: ToolFeaturesProps) {
  // This is a placeholder. In a real app, you'd have features data for each tool
  const features = [
    'Easy to use interface',
    'Regular updates and improvements',
    'Comprehensive documentation',
    'Active community support'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}