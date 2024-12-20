import { AgentFormData } from '../types/admin';

// Normalize header text for comparison
const normalizeHeader = (header: string): string => {
  return header.toLowerCase().replace(/[^a-z]/g, '');
};

// Map common variations of column names
const headerMappings: Record<string, string[]> = {
  name: ['name', 'agentname', 'title'],
  shortDescription: ['shortdescription', 'description', 'desc', 'about'],
  source: ['source', 'sourcetype', 'type'],
  pricing: ['pricing', 'price', 'pricingmodel', 'cost'],
  contactEmail: ['contactemail', 'email', 'contact'],
  websiteUrl: ['websiteurl', 'website', 'url', 'link']
};

// Parse a CSV line respecting quotes
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Handle escaped quotes (two double quotes in a row)
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // Skip the next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  return result;
};

export const parseCsvFile = async (file: File): Promise<AgentFormData[]> => {
  try {
    const text = await file.text();
    // Split by newlines but handle both \n and \r\n
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
    const missingFields = ['name', 'shortDescription', 'source', 'pricing', 'contactEmail', 'websiteUrl']
      .filter(field => !columnMap.has(field));

    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
    }

    // Parse rows
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = parseCSVLine(line);
        
        return {
          name: values[columnMap.get('name')!] || '',
          shortDescription: values[columnMap.get('shortDescription')!] || '',
          logo: null,
          source: values[columnMap.get('source')!]?.toLowerCase() === 'open_source' ? 'open_source' : 'closed_source',
          pricing: (values[columnMap.get('pricing')!]?.toLowerCase() || 'free') as 'free' | 'freemium' | 'paid',
          contactEmail: values[columnMap.get('contactEmail')!] || '',
          websiteUrl: values[columnMap.get('websiteUrl')!] || '',
        };
      });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error parsing CSV file: ${error.message}`);
    }
    throw new Error('Error parsing CSV file. Please check the format.');
  }
};