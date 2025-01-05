import React, { useState } from 'react';
import { Send } from 'lucide-react';
import FormInput from '../../../components/form/FormInput';
import { supabase } from '../../../lib/supabase';

export default function FeatureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agentUrl: '',
    description: '',
    uniqueValue: '',
    metrics: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('feature_requests')
        .insert([formData]);

      if (submitError) throw submitError;
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-20 blur"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Request Submitted!</h3>
          <p className="text-gray-400">
            Thank you for your submission. Our team will review your request and get back to you within 2-3 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur"></div>
      <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Submit Your Agent</h2>
        
        <div className="space-y-6">
          <FormInput
            label="Agent Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your agent's name"
            required
          />

          <FormInput
            label="Contact Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            required
          />

          <FormInput
            label="Agent URL"
            type="url"
            value={formData.agentUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, agentUrl: e.target.value }))}
            placeholder="https://"
            required
          />

          <FormInput
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your agent and its main features"
            multiline
            rows={4}
            required
          />

          <FormInput
            label="Unique Value Proposition"
            value={formData.uniqueValue}
            onChange={(e) => setFormData(prev => ({ ...prev, uniqueValue: e.target.value }))}
            placeholder="What makes your agent stand out?"
            multiline
            rows={3}
            required
          />

          <FormInput
            label="Key Metrics"
            value={formData.metrics}
            onChange={(e) => setFormData(prev => ({ ...prev, metrics: e.target.value }))}
            placeholder="Monthly users, customer testimonials, or other relevant metrics"
            multiline
            rows={3}
          />

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>
    </form>
  );
}