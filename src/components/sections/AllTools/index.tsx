import React, { useState } from 'react';
import { Tool } from '../../../types';
import FilterBar from './components/FilterBar';
import ToolGrid from './components/ToolGrid';
import Header from './components/Header';
import { useToolFiltering } from './hooks/useToolFiltering';

interface AllToolsProps {
  tools: Tool[];
}

export default function AllTools({ tools }: AllToolsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredTools = useToolFiltering(tools, activeFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Header toolCount={filteredTools.length} />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ToolGrid tools={filteredTools} />
    </section>
  );
}