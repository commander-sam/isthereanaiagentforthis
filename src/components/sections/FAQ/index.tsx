import React from 'react';
import FAQItem from './FAQItem';

const faqs = [
  {
    question: "What is an AI agent?",
    answer: "An AI agent is a software program powered by artificial intelligence that can perform tasks, make decisions, and interact with users autonomously. These agents can range from simple chatbots to complex systems capable of automation, analysis, and problem-solving."
  },
  {
    question: "How do I submit my AI agent?",
    answer: "You can submit your AI agent by clicking the 'Submit an Agent' button in the navigation bar. Fill out the required information about your agent, including its features, use cases, and relevant links. Our team will review your submission and approve it if it meets our quality standards."
  },
  {
    question: "Are all listed agents free to use?",
    answer: "No, not all agents are free. Each listing clearly indicates the pricing model: free, freemium (basic features free with paid upgrades), or paid. You can filter agents by pricing model to find ones that match your budget."
  },
  {
    question: "How are featured agents selected?",
    answer: "Featured agents are selected based on multiple criteria including user ratings, innovative features, reliability, and overall impact in their respective categories. Our team regularly reviews and updates the featured section to showcase the best AI agents."
  },
  {
    question: "Can I integrate these agents into my own projects?",
    answer: "Integration capabilities vary by agent. Many agents provide APIs or SDKs for integration, while others may be standalone applications. Check each agent's documentation and technical specifications for integration details."
  }
];

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
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}