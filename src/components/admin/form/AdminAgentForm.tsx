import React, { useState, useEffect } from 'react';
import { Agent } from '../../../types';
import { AgentFormData } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../form/SocialLinks';
import StatusSelect from './StatusSelect';
import FeaturesAndUseCases from './FeaturesAndUseCases';
import GradientCard from '../../common/GradientCard';
import { validateAgentForm } from '../../../utils/validation';
import { DATABASE_ENUMS } from '../../../constants/database';
import { getGitHubLogoUrl } from '../../../utils/logoUrl';

interface AdminAgentFormProps {
  initialData?: Agent;
  onSubmit: (data: AgentFormData) => Promise<void>;
  onCancel: () => void;
}

export default function AdminAgentForm({ initialData, onSubmit, onCancel }: AdminAgentFormProps) {
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    source: DATABASE_ENUMS.SOURCE.CLOSED_SOURCE,
    pricing: DATABASE_ENUMS.PRICING.FREE,
    contactEmail: '',
    websiteUrl: '',
    githubUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    discordUrl: '',
    status: DATABASE_ENUMS.STATUS.DRAFT,
    category: 'chatbots',
    featured: false,
    features: [],
    useCases: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoFilename, setLogoFilename] = useState('');

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        shortDescription: initialData.shortDescription,
        imageUrl: initialData.imageUrl,
        source: initialData.source,
        pricing: initialData.pricing,
        contactEmail: initialData.contactEmail || '',
        websiteUrl: initialData.url,
        githubUrl: initialData.githubUrl || '',
        twitterUrl: initialData.twitterUrl || '',
        facebookUrl: initialData.facebookUrl || '',
        linkedinUrl: initialData.linkedinUrl || '',
        discordUrl: initialData.discordUrl || '',
        status: initialData.status,
        category: initialData.category,
        featured: initialData.featured || false,
        features: initialData.features || [],
        useCases: initialData.useCases || []
      });

      // Extract filename from imageUrl if it exists
      if (initialData.imageUrl) {
        const filename = initialData.imageUrl.split('/').pop();
        setLogoFilename(filename || '');
      }
    }
  }, [initialData]);

  const handleChange = (name: string, value: string | boolean | Array<any>) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Handle logo filename changes
    if (name === 'logoFilename') {
      const logoUrl = value ? getGitHubLogoUrl(value as string) : '';
      setFormData(prev => ({ ...prev, imageUrl: logoUrl }));
      setLogoFilename(value as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAgentForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <GradientCard>
        <h3 className="text-xl font-medium text-white mb-6">Basic Information</h3>
        <BasicInformation
          values={{ ...formData, logoFilename }}
          onChange={handleChange}
          errors={errors}
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

      <GradientCard>
        <h3 className="text-xl font-medium text-white mb-6">Features & Use Cases</h3>
        <FeaturesAndUseCases
          features={formData.features || []}
          useCases={formData.useCases || []}
          onFeaturesChange={(features) => handleChange('features', features)}
          onUseCasesChange={(useCases) => handleChange('useCases', useCases)}
          errors={errors}
        />
      </GradientCard>

      {errors.submit && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">{errors.submit}</p>
        </div>
      )}

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