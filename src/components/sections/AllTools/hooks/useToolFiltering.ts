import { useMemo } from 'react';
import { Tool } from '../../../../types';

export function useToolFiltering(tools: Tool[], activeFilter: string) {
  return useMemo(() => {
    if (activeFilter === 'all') return tools;
    if (activeFilter === 'featured') return tools.filter(tool => tool.featured);
    return tools.filter(tool => tool.category === activeFilter);
  }, [tools, activeFilter]);
}