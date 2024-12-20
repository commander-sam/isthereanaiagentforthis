import React, { useState } from 'react';
import { AgentFormData } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../../components/form/SocialLinks';
import GradientCard from '../../../components/common/GradientCard';

interface SubmitAgentFormProps {
  onSubmit: (data: AgentFormData) => void;
}

export default function SubmitAgentForm({ onSubmit }: SubmitAgentFormProps) {
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    shortDescription: '',
    logo: null,
    source: 'closed_source',
    pricing: 'free',
    contactEmail: '',
    websiteUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoPreview, setLogoPreview] = useState('');

  const handleChange = (name: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'logo' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation logic here
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <GradientCard>
        <BasicInformation
          values={formData}
          onChange={handleChange}
          errors={errors}
          logoPreview={logoPreview}
        />
      </GradientCard>

      <GradientCard>
        <h3 className="text-xl font-medium text-white mb-6">Social Links</h3>
        <SocialLinks
          values={formData}
          onChange={handleChange}
          errors={errors}
        />
      </GradientCard>

      <div className="flex justify-end">
        <button
          type="submit"
          className="relative group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <span className="relative">Submit Agent</span>
        </button>
      </div>
    </form>
  );
}