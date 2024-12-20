import React, { useState, useEffect } from 'react';
import { Agent, AgentStatus } from '../../../types';
import { AgentFormData } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../form/SocialLinks';
import StatusSelect from './StatusSelect';
import { validateAgentForm } from '../../../utils/validation';
import GradientCard from '../../common/GradientCard';

interface AdminAgentFormProps {
  initialData?: Agent;
  onSubmit: (data: AgentFormData & { status?: AgentStatus }) => void;
  onCancel: () => void;
}

export default function AdminAgentForm({ initialData, onSubmit, onCancel }: AdminAgentFormProps) {
  const [formData, setFormData] = useState<AgentFormData & { status?: AgentStatus }>({
    name: '',
    shortDescription: '',
    description: '',
    logo: null,
    source: 'closed_source',
    pricing: 'free',
    contactEmail: '',
    websiteUrl: '',
    githubUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    discordUrl: '',
    status: 'draft',
    category: 'chatbots',
    featured: false,
    imageUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoPreview, setLogoPreview] = useState('');

  // Initialize form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        shortDescription: initialData.shortDescription || '',
        description: initialData.description || '',
        logo: null,
        source: initialData.source || 'closed_source',
        pricing: initialData.pricing || 'free',
        contactEmail: initialData.contactEmail || '',
        websiteUrl: initialData.url || '',
        githubUrl: initialData.githubUrl || '',
        twitterUrl: initialData.twitterUrl || '',
        facebookUrl: initialData.facebookUrl || '',
        linkedinUrl: initialData.linkedinUrl || '',
        discordUrl: initialData.discordUrl || '',
        status: initialData.status,
        category: initialData.category,
        featured: initialData.featured || false,
        imageUrl: initialData.imageUrl
      });
      setLogoPreview(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleChange = (name: string, value: string | File | boolean) => {
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
    const validationErrors = validateAgentForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      // Preserve the original image URL if no new logo is uploaded
      imageUrl: formData.logo ? logoPreview : initialData?.imageUrl || ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <GradientCard>
        <h3 className="text-xl font-medium text-white mb-6">Basic Information</h3>
        <BasicInformation
          values={formData}
          onChange={handleChange}
          errors={errors}
          logoPreview={logoPreview}
        />
      </GradientCard>

      {initialData && (
        <GradientCard>
          <h3 className="text-xl font-medium text-white mb-6">Status</h3>
          <StatusSelect
            value={formData.status || 'draft'}
            onChange={(value) => handleChange('status', value)}
          />
        </GradientCard>
      )}

      <GradientCard>
        <h3 className="text-xl font-medium text-white mb-6">Social Links</h3>
        <SocialLinks
          values={formData}
          onChange={handleChange}
          errors={errors}
        />
      </GradientCard>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="relative group px-6 py-3 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative text-white">
            {initialData ? 'Update Agent' : 'Add Agent'}
          </span>
        </button>
      </div>
    </form>
  );
}