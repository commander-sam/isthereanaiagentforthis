import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteToolButtonProps {
  toolId: string;
  onDelete: (id: string) => void;
}

export default function DeleteToolButton({ toolId, onDelete }: DeleteToolButtonProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      onDelete(toolId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
      title="Delete tool"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}