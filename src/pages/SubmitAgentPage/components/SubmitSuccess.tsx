import React from 'react';
import { CheckCircle } from 'lucide-react';
import { AgentFormData } from '../../../types/admin';
import ActionButton from '../../../components/common/ActionButton';

interface SubmitSuccessProps {
  agent: AgentFormData;
  onViewAgents: () => void;
  onSubmitAnother: () => void;
}

export default function SubmitSuccess({ agent, onViewAgents, onSubmitAnother }: SubmitSuccessProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-green-500/20 rounded-full">
          <CheckCircle className="h-16 w-16 text-green-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">
        Agent Submitted Successfully!
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Thank you for contributing to our directory. Your submission will be reviewed shortly.
      </p>
      <div className="flex justify-center space-x-4">
        <ActionButton
          icon={CheckCircle}
          label="View All Agents"
          onClick={onViewAgents}
          className="bg-blue-500 hover:bg-blue-600 border-none"
        />
        <ActionButton
          icon={CheckCircle}
          label="Submit Another Agent"
          onClick={onSubmitAnother}
        />
      </div>
    </div>
  );
}