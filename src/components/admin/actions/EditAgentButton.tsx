import React from 'react';
import { Edit2 } from 'lucide-react';
import { Agent } from '../../../types';
import ActionButton from '../../common/ActionButton';

interface EditAgentButtonProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}

export default function EditAgentButton({ agent, onEdit }: EditAgentButtonProps) {
  return (
    <ActionButton
      icon={Edit2}
      label="Edit agent"
      onClick={() => onEdit(agent)}
      className="text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20"
    />
  );
}