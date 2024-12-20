import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { agentsManager } from '../utils/agentsManager';

export function useAgentDetails(id: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No agent ID provided');
      setIsLoading(false);
      return;
    }

    const fetchAgent = () => {
      const foundAgent = agentsManager.getAgentById(id);
      if (!foundAgent) {
        setError('Agent not found');
        setIsLoading(false);
        return;
      }

      setAgent(foundAgent);
      
      // Get related agents (same category)
      const allAgents = agentsManager.getAllAgents();
      const related = allAgents.filter(a => 
        a.id !== id && a.category === foundAgent.category
      );
      setRelatedAgents(related);
      
      setIsLoading(false);
    };

    fetchAgent();
  }, [id]);

  return { agent, relatedAgents, isLoading, error };
}