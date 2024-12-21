import React from 'react';
import { AgentFormData } from '../../../types/admin';
import TextInput from './fields/TextInput';
import FileUpload from '../../form/FileUpload';
import RadioGroup from '../../form/RadioGroup';
import { FORM_OPTIONS } from '../../../constants/form';

interface BasicInformationProps {
  values: AgentFormData;
  onChange: (name: string, value: string | File) => void;
  errors: Record<string, string>;
  logoPreview: string;
}

export default function BasicInformation({ values, onChange, errors, logoPreview }: BasicInformationProps) {
  return (
    <div className="space-y-6">
      <TextInput
        label="Agent Name"
        name="name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter the name of the AI agent"
      />

      <TextInput
        label="Full Description"
        name="description"
        value={values.description}
        onChange={onChange}
        error={errors.description}
        placeholder="Detailed description of the agent's features, capabilities, and use cases"
        multiline
        rows={6}
      />

      <TextInput
        label="Short Description"
        name="shortDescription"
        value={values.shortDescription}
        onChange={onChange}
        error={errors.shortDescription}
        placeholder="Brief overview of the agent (1-2 sentences)"
      />

      <FileUpload
        label="Logo"
        onChange={(file) => onChange('logo', file)}
        accept="image/*"
        error={errors.logo}
        preview={logoPreview}
      />

      <TextInput
        label="Website URL"
        name="websiteUrl"
        value={values.websiteUrl}
        onChange={onChange}
        error={errors.websiteUrl}
        placeholder="https://"
        type="url"
      />

      <TextInput
        label="Contact Email"
        name="contactEmail"
        value={values.contactEmail}
        onChange={onChange}
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