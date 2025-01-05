import React from 'react';
import SubmissionSteps from './components/SubmissionSteps';
import FeatureForm from './components/FeatureForm';
import FeatureBenefits from './components/FeatureBenefits';
import PageTitle from '../../components/common/PageTitle';

export default function FeatureSubmissionPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Get Featured on AI Directory"
          subtitle="Showcase your AI agent to thousands of potential users"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <SubmissionSteps />
            <FeatureForm />
          </div>
          <div>
            <FeatureBenefits />
          </div>
        </div>
      </div>
    </div>
  );
}