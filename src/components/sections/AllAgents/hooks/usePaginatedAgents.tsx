import { useMemo } from 'react';
import { Agent } from '../../../../types';

interface UsePaginatedAgentsResult {
  currentPage: number;
  totalPages: number;
  currentAgents: Agent[];
  goToPage: (page: number) => void;
}

export function usePaginatedAgents(
  agents: Agent[],
  page: number,
  setPage: (page: number) => void,
  itemsPerPage: number = 9
): UsePaginatedAgentsResult {
  const totalPages = Math.ceil(agents.length / itemsPerPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const currentAgents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return agents.slice(start, end);
  }, [agents, currentPage, itemsPerPage]);

  const goToPage = (newPage: number) => {
    setPage(Math.min(Math.max(1, newPage), totalPages));
  };

  return {
    currentPage,
    totalPages,
    currentAgents,
    goToPage
  };
}