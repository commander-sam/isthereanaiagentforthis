import React from 'react';
import { ClipboardCheck, Send, Star } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Fill the Form',
    description: 'Provide details about your AI agent and why it should be featured'
  },
  {
    icon: Send,
    title: 'Submit for Review',
    description: 'Our team will review your submission within 2-3 business days'
  },
  {
    icon: Star,
    title: 'Get Featured',
    description: 'Approved agents will be featured prominently across our platform'
  }
];

export default function SubmissionSteps() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur"></div>
      <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-700 -ml-4"></div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}