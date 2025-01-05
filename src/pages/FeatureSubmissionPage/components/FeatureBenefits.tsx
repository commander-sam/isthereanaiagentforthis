import React from 'react';
import { Users, Zap, Trophy, ArrowUpRight, BarChart } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Increased Visibility',
    description: 'Get your agent in front of thousands of potential users actively looking for AI solutions.'
  },
  {
    icon: Trophy,
    title: 'Featured Status',
    description: 'Featured agents receive prominent placement across our platform and marketing channels.'
  },
  {
    icon: BarChart,
    title: 'Performance Insights',
    description: 'Access detailed analytics about your agent\'s performance and user engagement.'
  },
  {
    icon: Zap,
    title: 'Direct Traffic',
    description: 'Drive qualified traffic directly to your agent from our highly engaged audience.'
  }
];

export default function FeatureBenefits() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Benefits</h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                    <p className="mt-1 text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-20 blur"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Premium Promotion</h2>
          <p className="text-gray-400 mb-4">
            Want to maximize your agent's exposure? Check out our premium promotion options for enhanced visibility and priority placement.
          </p>
          <a
            href="/premium-features"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            Learn more about premium features
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}