import React from 'react';
import { Check, X } from 'lucide-react';
import { AgentStatus } from '../../../types';
import ActionButton from '../../common/ActionButton';

interface StatusActionsProps {
  status: AgentStatus;
  onStatusChange: (status: AgentStatus) => void;
}

export default function StatusActions({ status, onStatusChange }: StatusActionsProps) {
  if (status === 'approved' || status === 'rejected') {
    return null;
  }

  return (
    <>
      <ActionButton
        icon={Check}
        label="Approve"
        onClick={() => onStatusChange('approved')}
        className="text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20"
      />
      <ActionButton
        icon={X}
        label="Reject"
        onClick={() => onStatusChange('rejected')}
        className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
      />
    </>
  );
}