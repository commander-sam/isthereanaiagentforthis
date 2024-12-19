import React, { useState } from 'react';
import { ToolFormData } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../../components/form/SocialLinks';
import FormSection from './FormSection';

interface SubmitToolFormProps {
  onSubmit: (data: ToolFormData) => void;
}

export default function SubmitToolForm({ onSubmit }: SubmitToolFormProps) {
  const [formData, setFormData] = useState<ToolFormData>({
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

  const handleSocialLinksChange = (name: string, value: string) => {
    handleChange(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation logic here
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInformation
        values={formData}
        onChange={handleChange}
        errors={errors}
        logoPreview={logoPreview}
      />

      <FormSection title="Social Links">
        <SocialLinks
          values={formData}
          onChange={handleSocialLinksChange}
          errors={errors}
        />
      </FormSection>

      <div className="flex justify-end">
        <button
          type="submit"
          className="relative group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <span className="relative">Submit Tool</span>
        </button>
      </div>
    </form>
  );
}