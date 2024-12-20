import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { agentsManager } from '../utils/agentsManager';

export function useAdminAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await agentsManager.getAllAgentsForAdmin();
        setAgents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();

    const unsubscribe = agentsManager.subscribe(() => {
      fetchAgents();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { agents, isLoading, error };
}