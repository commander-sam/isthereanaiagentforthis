import React from 'react';
import { Check, X } from 'lucide-react';
import { ToolStatus } from '../../../types';

interface StatusActionsProps {
  status: ToolStatus;
  onStatusChange: (status: ToolStatus) => void;
}

export default function StatusActions({ status, onStatusChange }: StatusActionsProps) {
  if (status === 'approved' || status === 'rejected') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => onStatusChange('approved')}
        className="p-1 text-green-400 hover:text-green-300 transition-colors"
        title="Approve"
      >
        <Check className="h-5 w-5" />
      </button>
      <button
        onClick={() => onStatusChange('rejected')}
        className="p-1 text-red-400 hover:text-red-300 transition-colors"
        title="Reject"
      >
        <X className="h-5 w-5" />
      </button>
    </>
  );
}