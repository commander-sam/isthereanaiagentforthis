import React from 'react';
import FormInput from '../../form/FormInput';
import FileUpload from '../../form/FileUpload';
import RadioGroup from '../../form/RadioGroup';
import { ToolFormData, ToolFormErrors } from '../../../types/admin';

interface BasicInformationProps {
  values: ToolFormData;
  onChange: (name: string, value: string | File) => void;
  errors: ToolFormErrors;
  logoPreview: string;
}

export default function BasicInformation({ values, onChange, errors, logoPreview }: BasicInformationProps) {
  return (
    <div className="space-y-6">
      <FormInput
        label="Tool Name"
        name="name"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
        placeholder="Enter tool name"
      />

      <FormInput
        label="Short Description"
        name="shortDescription"
        value={values.shortDescription}
        onChange={(e) => onChange('shortDescription', e.target.value)}
        error={errors.shortDescription}
        placeholder="Brief description of your tool"
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
        helperText="We'll use this to send updates about your tool's listing status"
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