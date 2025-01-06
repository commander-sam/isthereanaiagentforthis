import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordionItem({ item, isOpen, onToggle }: FAQAccordionItemProps) {
  return (
    <div className="border-b border-gray-700 last:border-0">
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 flex justify-between items-center text-left group transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors pr-8">
          {item.question}
        </h3>
        <span className="flex-shrink-0 ml-6">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          )}
        </span>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-400">
          {item.answer}
        </div>
      </div>
    </div>
  );
}