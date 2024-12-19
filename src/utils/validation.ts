import { ToolFormData, ToolFormErrors } from '../types/admin';

export const validateToolForm = (data: ToolFormData): ToolFormErrors => {
  const errors: ToolFormErrors = {};

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

  // Validate optional URLs if provided
  const urlFields = ['githubUrl', 'twitterUrl', 'facebookUrl', 'linkedinUrl', 'discordUrl'];
  urlFields.forEach(field => {
    if (data[field as keyof ToolFormData]?.trim() && !isValidUrl(data[field as keyof ToolFormData] as string)) {
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