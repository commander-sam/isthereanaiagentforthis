import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { agentsManager } from '../utils/agentsManager';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAgents = async () => {
      try {
        const data = await agentsManager.getAllAgents();
        if (mounted) {
          setAgents(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch agents');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAgents();

    const unsubscribe = agentsManager.subscribe(() => {
      if (mounted) {
        fetchAgents();
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { agents, isLoading, error };
}