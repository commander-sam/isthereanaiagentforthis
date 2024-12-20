import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { agentsManager } from '../utils/agentsManager';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>(agentsManager.getAllAgents());

  useEffect(() => {
    const updateAgents = () => {
      setAgents(agentsManager.getAllAgents());
    };

    agentsManager.subscribe(updateAgents);
    return () => {
      agentsManager.unsubscribe(updateAgents);
    };
  }, []);

  return agents;
}