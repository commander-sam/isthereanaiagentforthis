import React, { useState } from 'react';
import { Agent } from '../../../types';
import FilterBar from './components/FilterBar';
import AgentGrid from './components/AgentGrid';
import Header from './components/Header';
import { useAgentFiltering } from './hooks/useAgentFiltering';

interface AllAgentsProps {
  agents: Agent[];
}

export default function AllAgents({ agents }: AllAgentsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredAgents = useAgentFiltering(agents, activeFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Header agentCount={filteredAgents.length} />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <AgentGrid agents={filteredAgents} />
    </section>
  );
}