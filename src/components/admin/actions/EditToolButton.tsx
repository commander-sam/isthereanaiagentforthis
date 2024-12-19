import React from 'react';
import { Edit2 } from 'lucide-react';
import { Tool } from '../../../types';

interface EditToolButtonProps {
  tool: Tool;
  onEdit: (tool: Tool) => void;
}

export default function EditToolButton({ tool, onEdit }: EditToolButtonProps) {
  return (
    <button
      onClick={() => onEdit(tool)}
      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
      title="Edit tool"
    >
      <Edit2 className="h-5 w-5" />
    </button>
  );
}