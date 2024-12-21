import React from 'react';
import { Feature } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';
import FormInput from '../../form/FormInput';

interface FeaturesAndUseCasesProps {
  features: Feature[];
  useCases: string[];
  onFeaturesChange: (features: Feature[]) => void;
  onUseCasesChange: (useCases: string[]) => void;
  errors: Record<string, string>;
}

export default function FeaturesAndUseCases({
  features = [],
  useCases = [],
  onFeaturesChange,
  onUseCasesChange,
  errors
}: FeaturesAndUseCasesProps) {
  const addFeature = () => {
    onFeaturesChange([...features, { title: '', description: '' }]);
  };

  const removeFeature = (index: number) => {
    onFeaturesChange(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updatedFeatures = features.map((feature, i) => {
      if (i === index) {
        return { ...feature, [field]: value };
      }
      return feature;
    });
    onFeaturesChange(updatedFeatures);
  };

  const addUseCase = () => {
    onUseCasesChange([...useCases, '']);
  };

  const removeUseCase = (index: number) => {
    onUseCasesChange(useCases.filter((_, i) => i !== index));
  };

  const updateUseCase = (index: number, value: string) => {
    const updatedUseCases = useCases.map((useCase, i) => {
      if (i === index) {
        return value;
      }
      return useCase;
    });
    onUseCasesChange(updatedUseCases);
  };

  return (
    <div className="space-y-6">
      {/* Features Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Key Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Feature
          </button>
        </div>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <FormInput
                    label="Title"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    error={errors[`features.${index}.title`]}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-4 p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <FormInput
                  label="Description"
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  error={errors[`features.${index}.description`]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Use Cases</h3>
          <button
            type="button"
            onClick={addUseCase}
            className="flex items-center px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Use Case
          </button>
        </div>
        
        <div className="space-y-4">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex items-center gap-4">
              <FormInput
                label={`Use Case ${index + 1}`}
                value={useCase}
                onChange={(e) => updateUseCase(index, e.target.value)}
                error={errors[`useCases.${index}`]}
              />
              <button
                type="button"
                onClick={() => removeUseCase(index)}
                className="mt-8 p-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}