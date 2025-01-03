import React from 'react';
import FAQAccordion from './components/FAQAccordion';
import { faqData } from './data/faqData';

export default function FAQ() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),rgba(59,130,246,0)_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to know about AI agents and our directory
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqData} />
        </div>
      </div>
    </section>
  );
}