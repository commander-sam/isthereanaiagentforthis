import { useMemo } from 'react';
import { Agent } from '../../../../types';

export function useAgentFiltering(agents: Agent[], activeFilter: string) {
  return useMemo(() => {
    if (activeFilter === 'all') return agents;
    if (activeFilter === 'featured') return agents.filter(agent => agent.featured);
    return agents.filter(agent => agent.category === activeFilter);
  }, [agents, activeFilter]);
}