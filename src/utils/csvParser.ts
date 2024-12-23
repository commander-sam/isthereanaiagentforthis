import { AgentFormData } from '../types/admin';
import { supabase } from '../lib/supabase';
import { getGitHubLogoUrl } from './logoUrl';

// Parse a CSV line respecting quotes and handling escaped quotes
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Handle escaped quotes (""")
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // Skip the next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Only split on commas outside of quotes
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result.map(value => value.replace(/^"|"$/g, '')); // Remove surrounding quotes
};

// Normalize header text for comparison
const normalizeHeader = (header: string): string => {
  return header.toLowerCase().replace(/[^a-z]/g, '');
};

// Map common variations of column names
const headerMappings: Record<string, string[]> = {
  name: ['name', 'agentname', 'title'],
  shortDescription: ['shortdescription', 'description', 'desc', 'shortdesc', 'about'],
  source: ['source', 'sourcetype', 'type'],
  pricing: ['pricing', 'price', 'pricingmodel', 'cost'],
  contactEmail: ['contactemail', 'email', 'contact'],
  websiteUrl: ['websiteurl', 'website', 'url', 'link', 'websiteURL'],
  category: ['category', 'categoryid', 'type'],
  logoFilename: ['logofilename', 'logo', 'image', 'imagefilename'],
  githubUrl: ['githuburl', 'github'],
  twitterUrl: ['twitterurl', 'twitter'],
  facebookUrl: ['facebookurl', 'facebook'],
  linkedinUrl: ['linkedinurl', 'linkedin'],
  discordUrl: ['discordurl', 'discord']
};

export const parseCsvFile = async (file: File): Promise<AgentFormData[]> => {
  try {
    // First, fetch valid categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) throw new Error('Failed to fetch categories');
    
    const validCategories = new Map(categories.map(c => [c.id, c.name]));
    console.log('Valid categories:', Array.from(validCategories.keys())); // Debug log

    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row');
    }
    
    // Parse and normalize headers
    const headers = parseCSVLine(lines[0]).map(h => normalizeHeader(h.trim()));
    console.log('Parsed headers:', headers); // Debug log
    
    // Map headers to standardized field names
    const columnMap = new Map<string, number>();
    
    for (const [field, variations] of Object.entries(headerMappings)) {
      const index = headers.findIndex(h => variations.includes(h));
      if (index !== -1) {
        columnMap.set(field, index);
      }
    }

    // Validate required fields
    const requiredFields = ['name', 'shortDescription', 'source', 'pricing', 'contactEmail', 'websiteUrl', 'category'];
    const missingFields = requiredFields.filter(field => !columnMap.has(field));

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required columns: ${missingFields.join(', ')}\n` +
        'Expected format: name,shortDescription,source,pricing,contactEmail,websiteUrl,category[,logoFilename]'
      );
    }

    // Parse rows
    const errors: string[] = [];
    const agents = lines.slice(1).map((line, index) => {
      const values = parseCSVLine(line);
      console.log(`Row ${index + 1} values:`, values); // Debug log

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
      
      // Map values to fields
      for (const [field, colIndex] of columnMap.entries()) {
        if (values[colIndex]) {
          const value = values[colIndex].trim();
          
          // Handle logo filename
          if (field === 'logoFilename') {
            agent.imageUrl = getGitHubLogoUrl(value);
            continue;
          }
          
          // Validate category
          if (field === 'category' && !validCategories.has(value)) {
            errors.push(
              `Row ${index + 2}: Invalid category "${value}". ` +
              `Must be one of: ${Array.from(validCategories.keys()).join(', ')}`
            );
          }
          
          // Validate source
          if (field === 'source' && !['open_source', 'closed_source'].includes(value)) {
            errors.push(
              `Row ${index + 2}: Invalid source "${value}". ` +
              'Must be either "open_source" or "closed_source"'
            );
          }
          
          // Validate pricing
          if (field === 'pricing' && !['free', 'freemium', 'paid'].includes(value)) {
            errors.push(
              `Row ${index + 2}: Invalid pricing "${value}". ` +
              'Must be one of: free, freemium, paid'
            );
          }
          
          (agent as any)[field] = value;
        }
      }
      
      return agent;
    });

    if (errors.length > 0) {
      throw new Error(`Validation errors:\n${errors.join('\n')}`);
    }

    return agents;
  } catch (error) {
    console.error('CSV parsing error:', error); // Debug log
    if (error instanceof Error) {
      throw new Error(`Error parsing CSV file: ${error.message}`);
    }
    throw new Error('Error parsing CSV file. Please check the format.');
  }
};