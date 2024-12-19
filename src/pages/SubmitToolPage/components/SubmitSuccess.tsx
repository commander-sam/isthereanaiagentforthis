import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ToolFormData } from '../../../types/admin';

interface SubmitSuccessProps {
  tool: ToolFormData;
  onViewTools: () => void;
  onSubmitAnother: () => void;
}

export default function SubmitSuccess({ tool, onViewTools, onSubmitAnother }: SubmitSuccessProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Tool Submitted Successfully!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Thank you for contributing to our directory. Your submission will be reviewed shortly.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onViewTools}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Tools
        </button>
        <button
          onClick={onSubmitAnother}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Submit Another Tool
        </button>
      </div>
    </div>
  );
}