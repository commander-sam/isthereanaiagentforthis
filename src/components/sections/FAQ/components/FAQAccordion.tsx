import React, { useState } from 'react';
import { FAQItem } from '../types';
import FAQAccordionItem from './FAQAccordionItem';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-700 rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}