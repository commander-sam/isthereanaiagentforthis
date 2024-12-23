import { CsvValidationError } from './types';

export const validateSource = (value: string, row: number): CsvValidationError | null => {
  const validSources = ['open_source', 'closed_source'];
  if (!validSources.includes(value)) {
    return {
      row,
      field: 'source',
      value,
      message: 'Must be either "open_source" or "closed_source"'
    };
  }
  return null;
};

export const validatePricing = (value: string, row: number): CsvValidationError | null => {
  const validPricing = ['free', 'freemium', 'paid'];
  if (!validPricing.includes(value)) {
    return {
      row,
      field: 'pricing',
      value,
      message: 'Must be one of: free, freemium, paid'
    };
  }
  return null;
};

export const validateCategory = (
  value: string,
  validCategories: Map<string, string>,
  row: number
): CsvValidationError | null => {
  if (!validCategories.has(value)) {
    return {
      row,
      field: 'category',
      value,
      message: `Must be one of: ${Array.from(validCategories.keys()).join(', ')}`
    };
  }
  return null;
};