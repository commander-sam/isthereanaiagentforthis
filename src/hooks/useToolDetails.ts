import { useState, useEffect } from 'react';
import { Tool } from '../types';
import { toolsManager } from '../utils/toolsManager';

export function useToolDetails(id: string | undefined) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No tool ID provided');
      setIsLoading(false);
      return;
    }

    const fetchTool = () => {
      const foundTool = toolsManager.getToolById(id);
      if (!foundTool) {
        setError('Tool not found');
        setIsLoading(false);
        return;
      }

      setTool(foundTool);
      
      // Get related tools (same category)
      const allTools = toolsManager.getAllTools();
      const related = allTools.filter(t => 
        t.id !== id && t.category === foundTool.category
      );
      setRelatedTools(related);
      
      setIsLoading(false);
    };

    fetchTool();
  }, [id]);

  return { tool, relatedTools, isLoading, error };
}