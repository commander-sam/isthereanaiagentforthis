import { AgentFormData } from '../../types/admin';
import { supabase } from '../../lib/supabase';
import { getGitHubLogoUrl } from '../logoUrl';
import { CsvParsingResult, CsvValidationError } from './types';
import { CSV_HEADERS, REQUIRED_FIELDS, normalizeHeader } from './headers';
import { validateSource, validatePricing, validateCategory } from './validation';

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result.map(value => value.replace(/^"|"$/g, ''));
};

export const parseCsvFile = async (file: File): Promise<CsvParsingResult<AgentFormData>> => {
  try {
    // Fetch valid categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) {
      throw new Error('Failed to fetch categories from database');
    }
    
    const validCategories = new Map(categories.map(c => [c.id, c.name]));

    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row');
    }
    
    // Parse headers
    const headers = parseCSVLine(lines[0]).map(h => normalizeHeader(h.trim()));
    
    // Map headers to fields
    const columnMap = new Map<string, number>();
    for (const { field, variations } of CSV_HEADERS) {
      const index = headers.findIndex(h => variations.includes(h));
      if (index !== -1) {
        columnMap.set(field, index);
      }
    }

    // Validate required fields
    const missingFields = REQUIRED_FIELDS.filter(field => !columnMap.has(field));
    if (missingFields.length > 0) {
      throw new Error(
        `Missing required columns: ${missingFields.join(', ')}\n` +
        'Expected format: name,shortDescription,source,pricing,contactEmail,websiteUrl,category[,logoFilename]'
      );
    }

    const errors: CsvValidationError[] = [];
    const agents: AgentFormData[] = [];

    // Parse data rows
    lines.slice(1).forEach((line, index) => {
      const values = parseCSVLine(line);
      const rowErrors: CsvValidationError[] = [];
      
      const agent: AgentFormData = {
        name: '',
        shortDescription: '',
        description: '',
        logo: null,
        source: 'closed_source',
        pricing: 'free',
        contactEmail: '',
        websiteUrl: '',
        category: 'chatbots'
      };
      
      // Map and validate values
      for (const [field, colIndex] of columnMap.entries()) {
        if (values[colIndex]) {
          const value = values[colIndex].trim();
          
          if (field === 'logoFilename') {
            agent.imageUrl = getGitHubLogoUrl(value);
            continue;
          }
          
          // Validate fields
          if (field === 'category') {
            const error = validateCategory(value, validCategories, index + 2);
            if (error) rowErrors.push(error);
          }
          
          if (field === 'source') {
            const error = validateSource(value, index + 2);
            if (error) rowErrors.push(error);
          }
          
          if (field === 'pricing') {
            const error = validatePricing(value, index + 2);
            if (error) rowErrors.push(error);
          }
          
          (agent as any)[field] = value;
        }
      }
      
      if (rowErrors.length === 0) {
        agents.push(agent);
      } else {
        errors.push(...rowErrors);
      }
    });

    return { data: agents, errors };
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `Error parsing CSV file: ${error.message}`
        : 'Error parsing CSV file. Please check the format.'
    );
  }
};