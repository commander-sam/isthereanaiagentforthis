import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../../data/categories';
import ToolsList from './components/ToolsList';
import Filters from './components/Filters';
import { useTools } from '../../hooks/useTools';

export default function ToolsPage() {
  const tools = useTools();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const searchQuery = searchParams.get('search') || '';

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = searchQuery
        ? tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? tool.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          AI Tools Directory
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="lg:col-span-3">
            <ToolsList tools={filteredTools} />
          </div>
        </div>
      </div>
    </div>
  );
}