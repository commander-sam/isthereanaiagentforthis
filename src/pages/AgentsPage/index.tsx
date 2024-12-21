import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAgents } from '../../hooks/useAgents';
import { useSearch } from '../../hooks/useSearch';
import AllAgents from '../../components/sections/AllAgents';
import SearchBar from '../../components/sections/AllAgents/components/SearchBar';
import PageTitle from '../../components/common/PageTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function AgentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const { agents, isLoading, error } = useAgents();
  const filteredAgents = useSearch(agents, searchQuery);

  // Update search query when URL parameter changes
  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Update URL when search query changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Error Loading Agents"
        message={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="AI Agents Directory"
          subtitle="Discover and explore powerful AI agents for every task"
        />
        <SearchBar value={searchQuery} onChange={handleSearch} />
        <AllAgents agents={filteredAgents} />
      </div>
    </div>
  );
}