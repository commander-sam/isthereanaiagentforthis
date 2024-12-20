import React from 'react';
import FormInput from '../../form/FormInput';
import FileUpload from '../../form/FileUpload';
import RadioGroup from '../../form/RadioGroup';
import { AgentFormData } from '../../../types/admin';
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
      {/* Other form fields remain the same */}
      
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

      {/* Other form fields remain the same */}
    </div>
  );
}