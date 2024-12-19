import React from 'react';
import { ToolStatus } from '../../../types';

interface StatusSelectProps {
  value: ToolStatus;
  onChange: (status: ToolStatus) => void;
}

const statusOptions: { value: ToolStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div className="space-y-4">
      {statusOptions.map((option) => (
        <label key={option.value} className="flex items-center space-x-3">
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-blue-600 border-gray-600 bg-gray-800 focus:ring-blue-500 focus:ring-offset-gray-900"
          />
          <span className="text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
  );
}