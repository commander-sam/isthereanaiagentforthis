import React from 'react';
import { Trash2 } from 'lucide-react';
import ActionButton from '../../common/ActionButton';

interface DeleteAgentButtonProps {
  agentId: string;
  onDelete: (id: string) => void;
}

export default function DeleteAgentButton({ agentId, onDelete }: DeleteAgentButtonProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      onDelete(agentId);
    }
  };

  return (
    <ActionButton
      icon={Trash2}
      label="Delete agent"
      onClick={handleDelete}
      className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
    />
  );
}