import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { toolsManager } from '../../utils/toolsManager';
import SubmitToolForm from './components/SubmitToolForm';
import SubmitSuccess from './components/SubmitSuccess';
import { ToolFormData } from '../../types/admin';

export default function SubmitToolPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTool, setSubmittedTool] = useState<ToolFormData | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (formData: ToolFormData) => {
    const newTool = toolsManager.addTool(formData);
    setSubmittedTool(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <SubmitSuccess 
            tool={submittedTool!}
            onViewTools={() => navigate('/tools')}
            onSubmitAnother={() => setIsSubmitted(false)}
          />
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Submit a Tool
              </h1>
              <p className="text-lg text-blue-200/80">
                Share an innovative AI tool with our community
              </p>
            </div>
            <SubmitToolForm 
              categories={categories}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}