import { AgentFormData } from '../types/admin';
import { supabase } from '../lib/supabase';
import { getGitHubLogoUrl } from './logoUrl';

// ... (keep existing parseCSVLine and normalizeHeader functions)

const headerMappings: Record<string, string[]> = {
  name: ['name', 'agentname', 'title'],
  shortDescription: ['shortdescription', 'description', 'desc', 'about'],
  source: ['source', 'sourcetype', 'type'],
  pricing: ['pricing', 'price', 'pricingmodel', 'cost'],
  contactEmail: ['contactemail', 'email', 'contact'],
  websiteUrl: ['websiteurl', 'website', 'url', 'link'],
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
      .select('id');
    
    if (categoriesError) throw new Error('Failed to fetch categories');
    const validCategories = new Set(categories.map(c => c.id));

    const text = await file.text();
    const lines = text.split(/\r?\n/);
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row');
    }
    
    // Parse and normalize headers
    const headers = parseCSVLine(lines[0]).map(h => normalizeHeader(h.trim()));
    
    // Map headers to standardized field names
    const columnMap = new Map<string, number>();
    
    for (const [field, variations] of Object.entries(headerMappings)) {
      const index = headers.findIndex(h => variations.includes(h));
      if (index !== -1) {
        columnMap.set(field, index);
      }
    }

    // Validate required fields
    const missingFields = ['name', 'shortDescription', 'source', 'pricing', 'contactEmail', 'websiteUrl', 'category']
      .filter(field => !columnMap.has(field));

    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
    }

    // Parse rows
    const errors: string[] = [];
    const agents = lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        const values = parseCSVLine(line);
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
        for (const [field, index] of columnMap.entries()) {
          if (values[index]) {
            const value = values[index].replace(/^"|"$/g, '');
            
            // Handle logo filename
            if (field === 'logoFilename') {
              agent.imageUrl = getGitHubLogoUrl(value);
              continue;
            }
            
            // Validate category
            if (field === 'category' && !validCategories.has(value)) {
              errors.push(`Row ${index + 1}: Invalid category "${value}". Must be one of: ${Array.from(validCategories).join(', ')}`);
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
    if (error instanceof Error) {
      throw new Error(`Error parsing CSV file: ${error.message}`);
    }
    throw new Error('Error parsing CSV file. Please check the format.');
  }
};