import React from 'react';
import { Mail, Star, Award, ArrowRight } from 'lucide-react';
import PageTitle from '../../components/common/PageTitle';
import GradientCard from '../../components/common/GradientCard';

export default function FeatureSubmissionPage() {
  const pricingTiers = [
    {
      name: 'Premium Listing',
      price: '$49',
      period: '/month',
      icon: Star,
      features: [
        'Featured placement in directory',
        'Priority search ranking',
        'Detailed analytics dashboard',
        'Monthly performance reports',
        'Social media promotion'
      ]
    },
    {
      name: 'Product Review',
      price: '$99',
      period: 'one-time',
      icon: Award,
      features: [
        'In-depth product review',
        'Permanent featured placement',
        'Social media coverage',
        'Detailed feedback report',
        'SEO-optimized content'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Get Featured on AI Directory"
          subtitle="Showcase your AI agent to thousands of potential users"
        />
        
        <div className="mt-8 sm:mt-12 grid gap-6 md:grid-cols-2">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <GradientCard key={index}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{tier.name}</h3>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400 ml-2">{tier.period}</span>
                  </div>
                  
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <ArrowRight className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href={`mailto:syed@inboundmomentum.com?subject=${encodeURIComponent(`Interested in ${tier.name}`)}`}
                    className="flex items-center justify-center w-full px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Contact Us
                  </a>
                </div>
              </GradientCard>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12">
          <GradientCard>
            <div className="p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Ready to get featured?
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                Contact us at syed@inboundmomentum.com to discuss featuring your AI agent
              </p>
              <a
                href="mailto:syed@inboundmomentum.com"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Send us an email
              </a>
            </div>
          </GradientCard>
        </div>
      </div>
    </div>
  );
}