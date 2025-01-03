import React, { useState } from 'react';
import { Agent } from '../../../types';
import FilterBar from './components/FilterBar';
import AgentGrid from './components/AgentGrid';
import Header from './components/Header';
import { useAgentFiltering } from './hooks/useAgentFiltering';
import { usePaginatedAgents } from './hooks/usePaginatedAgents';
import Pagination from '../../common/pagination/Pagination';

interface AllAgentsProps {
  agents: Agent[];
}

export default function AllAgents({ agents }: AllAgentsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredAgents = useAgentFiltering(agents, activeFilter);
  const { 
    currentAgents, 
    totalPages,
    goToPage 
  } = usePaginatedAgents(filteredAgents, currentPage, setCurrentPage);

  // Reset pagination when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Header agentCount={filteredAgents.length} />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <div className="space-y-8">
        <AgentGrid agents={currentAgents} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </section>
  );
}