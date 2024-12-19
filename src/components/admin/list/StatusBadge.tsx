import React from 'react';
import { ToolStatus } from '../../../types';

const statusConfig = {
  draft: {
    bg: 'bg-gray-900/50',
    text: 'text-gray-300',
    border: 'border-gray-500/20',
    label: 'Draft'
  },
  pending: {
    bg: 'bg-yellow-900/50',
    text: 'text-yellow-300',
    border: 'border-yellow-500/20',
    label: 'Pending Review'
  },
  approved: {
    bg: 'bg-green-900/50',
    text: 'text-green-300',
    border: 'border-green-500/20',
    label: 'Approved'
  },
  rejected: {
    bg: 'bg-red-900/50',
    text: 'text-red-300',
    border: 'border-red-500/20',
    label: 'Rejected'
  }
};

interface StatusBadgeProps {
  status: ToolStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text} border ${config.border}`}>
      {config.label}
    </span>
  );
}