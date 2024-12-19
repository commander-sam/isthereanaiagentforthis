import React, { useState } from 'react';
import { Tool, ToolStatus } from '../../../types';
import { ToolFormData, ToolFormErrors } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../form/SocialLinks';
import StatusSelect from './StatusSelect';
import { validateToolForm } from '../../../utils/validation';

interface AdminToolFormProps {
  initialData?: Tool;
  onSubmit: (data: ToolFormData & { status?: ToolStatus }) => void;
  onCancel: () => void;
}

export default function AdminToolForm({ initialData, onSubmit, onCancel }: AdminToolFormProps) {
  const [formData, setFormData] = useState<ToolFormData & { status?: ToolStatus }>({
    name: initialData?.name || '',
    shortDescription: initialData?.shortDescription || '',
    logo: null,
    source: initialData?.source || 'closed_source',
    pricing: initialData?.pricing || 'free',
    contactEmail: '',
    websiteUrl: initialData?.url || '',
    githubUrl: initialData?.githubUrl || '',
    twitterUrl: initialData?.twitterUrl || '',
    facebookUrl: initialData?.facebookUrl || '',
    linkedinUrl: initialData?.linkedinUrl || '',
    discordUrl: initialData?.discordUrl || '',
    status: initialData?.status,
  });

  const [errors, setErrors] = useState<ToolFormErrors>({});
  const [logoPreview, setLogoPreview] = useState(initialData?.imageUrl || '');

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
    const validationErrors = validateToolForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur"></div>
        <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-medium text-white mb-6">Basic Information</h3>
          <BasicInformation
            values={formData}
            onChange={handleChange}
            errors={errors}
            logoPreview={logoPreview}
          />
        </div>
      </div>

      {initialData && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium text-white mb-6">Status</h3>
            <StatusSelect
              value={formData.status || 'draft'}
              onChange={(value) => handleChange('status', value)}
            />
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur"></div>
        <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-medium text-white mb-6">Social Links</h3>
          <SocialLinks
            values={formData}
            onChange={handleChange}
            errors={errors}
          />
        </div>
      </div>

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
            {initialData ? 'Update Tool' : 'Add Tool'}
          </span>
        </button>
      </div>
    </form>
  );
}