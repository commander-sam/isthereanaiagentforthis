import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentFormData } from '../../types/admin';
import { agentsManager } from '../../utils/agentsManager';
import SubmitAgentForm from './components/SubmitAgentForm.tsx';
import SubmitSuccess from './components/SubmitSuccess';
import PageTitle from '../../components/common/PageTitle';

export default function SubmitAgentPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAgent, setSubmittedAgent] = useState<AgentFormData | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (formData: AgentFormData) => {
    const newAgent = agentsManager.addAgent(formData);
    setSubmittedAgent(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <SubmitSuccess 
            agent={submittedAgent!}
            onViewAgents={() => navigate('/agents')}
            onSubmitAnother={() => setIsSubmitted(false)}
          />
        ) : (
          <>
            <PageTitle 
              title="Submit an AI Agent"
              subtitle="Share an innovative AI agent with our community"
            />
            <SubmitAgentForm onSubmit={handleSubmit} />
          </>
        )}
      </div>
    </div>
  );
}