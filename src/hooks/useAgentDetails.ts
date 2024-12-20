import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { agentsManager } from '../utils/agentsManager';

export function useAgentDetails(id: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!id) {
        setError('No agent ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const [allAgents, currentAgent] = await Promise.all([
          agentsManager.getAllAgents(),
          agentsManager.getAgentById(id)
        ]);

        if (!mounted) return;

        if (!currentAgent) {
          setError('Agent not found');
          setIsLoading(false);
          return;
        }

        setAgent(currentAgent);
        
        // Get related agents (same category)
        const related = allAgents.filter(a => 
          a.id !== id && a.category === currentAgent.category
        );
        setRelatedAgents(related);
        
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch agent details');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    const unsubscribe = agentsManager.subscribe(() => {
      if (mounted) {
        fetchData();
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [id]);

  return { agent, relatedAgents, isLoading, error };
}