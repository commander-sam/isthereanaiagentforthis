import { AgentFormData, AgentFormErrors } from '../types/admin';

export const validateAgentForm = (data: AgentFormData): AgentFormErrors => {
  const errors: AgentFormErrors = {};

  // Required fields validation
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.shortDescription?.trim()) {
    errors.shortDescription = 'Short description is required';
  }

  if (!data.contactEmail?.trim()) {
    errors.contactEmail = 'Contact email is required';
  } else if (!isValidEmail(data.contactEmail)) {
    errors.contactEmail = 'Invalid email format';
  }

  if (!data.websiteUrl?.trim()) {
    errors.websiteUrl = 'Website URL is required';
  } else if (!isValidUrl(data.websiteUrl)) {
    errors.websiteUrl = 'Invalid URL format';
  }

  // Optional URL validations
  const urlFields = ['githubUrl', 'twitterUrl', 'facebookUrl', 'linkedinUrl', 'discordUrl'];
  urlFields.forEach(field => {
    const value = data[field as keyof AgentFormData];
    if (value && typeof value === 'string' && value.trim() && !isValidUrl(value)) {
      errors[field] = 'Invalid URL format';
    }
  });

  return errors;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// For backward compatibility
export const validateToolForm = validateAgentForm;
