import React from 'react';
import TextInput from './fields/TextInput';
import RadioGroup from '../../form/RadioGroup';
import CategorySelect from './CategorySelect';
import { FORM_OPTIONS } from '../../../constants/form';
import { getGitHubLogoUrl } from '../../../utils/logoUrl';

interface BasicInformationProps {
  values: {
    name: string;
    shortDescription: string;
    description: string;
    imageUrl?: string;
    source: string;
    pricing: string;
    contactEmail: string;
    websiteUrl: string;
    category?: string;
  };
  onChange: (name: string, value: string) => void;
  errors: Record<string, string>;
  logoPreview: string;
}

export default function BasicInformation({ values, onChange, errors, logoPreview }: BasicInformationProps) {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filename = e.target.value.trim();
    const logoUrl = filename ? getGitHubLogoUrl(filename) : '';
    onChange('imageUrl', logoUrl);
  };

  return (
    <div className="space-y-6">
      <TextInput
        label="Agent Name"
        name="name"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
        placeholder="Enter the name of the AI agent"
      />

      <TextInput
        label="Full Description"
        name="description"
        value={values.description}
        onChange={(e) => onChange('description', e.target.value)}
        error={errors.description}
        placeholder="Detailed description of the agent's features, capabilities, and use cases"
        multiline
        rows={6}
      />

      <TextInput
        label="Short Description"
        name="shortDescription"
        value={values.shortDescription}
        onChange={(e) => onChange('shortDescription', e.target.value)}
        error={errors.shortDescription}
        placeholder="Brief overview of the agent (1-2 sentences)"
      />

      <div className="space-y-2">
        <TextInput
          label="Logo Filename"
          name="logoFilename"
          onChange={handleLogoChange}
          error={errors.logo}
          placeholder="e.g., chatgpt.png"
          helperText="Enter the filename from the GitHub logo folder"
        />
        {values.imageUrl && (
          <div className="mt-2">
            <img 
              src={values.imageUrl} 
              alt="Logo preview" 
              className="h-12 w-12 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = getGitHubLogoUrl('default');
                if (errors.logo !== 'Logo file not found') {
                  onChange('imageUrl', getGitHubLogoUrl('default'));
                }
              }}
            />
          </div>
        )}
      </div>

      <CategorySelect
        value={values.category || 'chatbots'}
        onChange={(value) => onChange('category', value)}
        error={errors.category}
      />

      <TextInput
        label="Website URL"
        name="websiteUrl"
        value={values.websiteUrl}
        onChange={(e) => onChange('websiteUrl', e.target.value)}
        error={errors.websiteUrl}
        placeholder="https://"
        type="url"
      />

      <TextInput
        label="Contact Email"
        name="contactEmail"
        value={values.contactEmail}
        onChange={(e) => onChange('contactEmail', e.target.value)}
        error={errors.contactEmail}
        placeholder="contact@example.com"
        type="email"
      />

      <RadioGroup
        label="Source"
        name="source"
        options={FORM_OPTIONS.SOURCE}
        value={values.source}
        onChange={(value) => onChange('source', value)}
        error={errors.source}
      />

      <RadioGroup
        label="Pricing"
        name="pricing"
        options={FORM_OPTIONS.PRICING}
        value={values.pricing}
        onChange={(value) => onChange('pricing', value)}
        error={errors.pricing}
      />
    </div>
  );
}