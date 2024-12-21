import { useMemo } from 'react';
import { Agent } from '../types';

export function useSearch(agents: Agent[], searchQuery: string) {
  return useMemo(() => {
    if (!searchQuery) return agents;

    const query = searchQuery.toLowerCase();
    return agents.filter(agent => {
      return (
        agent.name.toLowerCase().includes(query) ||
        agent.shortDescription.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query) ||
        agent.category.toLowerCase().includes(query)
      );
    });
  }, [agents, searchQuery]);
}