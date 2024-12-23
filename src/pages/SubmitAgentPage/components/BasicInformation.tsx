import React from 'react';
import FormInput from '../../../components/form/FormInput';
import FileUpload from '../../../components/form/FileUpload';
import RadioGroup from '../../../components/form/RadioGroup';

interface BasicInformationProps {
  values: {
    name: string;
    shortDescription: string;
    logo: File | null;
    source: string;
    pricing: string;
    contactEmail: string;
    websiteUrl: string;
  };
  onChange: (name: string, value: string | File) => void;
  errors: Record<string, string>;
  logoPreview: string;
}

export default function BasicInformation({ values, onChange, errors, logoPreview }: BasicInformationProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white mb-6">Basic Information</h3>
      
      <FormInput
        label="Agent Name"
        name="name"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
        placeholder="Enter agent name"
      />

      <FormInput
        label="Short Description"
        name="shortDescription"
        value={values.shortDescription}
        onChange={(e) => onChange('shortDescription', e.target.value)}
        error={errors.shortDescription}
        placeholder="Brief description of your AI agent"
      />

      <FileUpload
        label="Logo"
        onChange={(file) => onChange('logo', file)}
        accept="image/*"
        error={errors.logo}
        preview={logoPreview}
      />

      <RadioGroup
        label="Source"
        name="source"
        options={[
          { label: 'Open Source', value: 'open_source' },
          { label: 'Closed Source', value: 'closed_source' }
        ]}
        value={values.source}
        onChange={(value) => onChange('source', value)}
        error={errors.source}
      />

      <RadioGroup
        label="Pricing"
        name="pricing"
        options={[
          { label: 'Free', value: 'free' },
          { label: 'Freemium', value: 'freemium' },
          { label: 'Paid', value: 'paid' }
        ]}
        value={values.pricing}
        onChange={(value) => onChange('pricing', value)}
        error={errors.pricing}
      />

      <FormInput
        label="Contact Email"
        name="contactEmail"
        type="email"
        value={values.contactEmail}
        onChange={(e) => onChange('contactEmail', e.target.value)}
        error={errors.contactEmail}
        placeholder="your@email.com"
        helperText="We'll use this to send updates about your agent's listing status"
      />

      <FormInput
        label="Website Link"
        name="websiteUrl"
        type="url"
        value={values.websiteUrl}
        onChange={(e) => onChange('websiteUrl', e.target.value)}
        error={errors.websiteUrl}
        placeholder="https://"
      />
    </div>
  );
}