import { useState, useEffect } from 'react';
import { Tool } from '../types';
import { toolsManager } from '../utils/toolsManager';

export function useTools() {
  const [tools, setTools] = useState<Tool[]>(toolsManager.getAllTools());

  // Subscribe to tools updates
  useEffect(() => {
    const updateTools = () => {
      setTools(toolsManager.getAllTools());
    };

    // Register the callback
    toolsManager.subscribe(updateTools);

    return () => {
      // Cleanup subscription
      toolsManager.unsubscribe(updateTools);
    };
  }, []);

  return tools;
}