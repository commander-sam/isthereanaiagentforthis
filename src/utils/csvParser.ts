import { AgentFormData } from '../types/admin';
import { validateAgentForm } from './validation';

export const parseCsvFile = async (file: File): Promise<AgentFormData[]> => {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  // Validate required headers
  const requiredHeaders = ['name', 'shortdescription', 'source', 'pricing', 'contactemail', 'websiteurl'];
  const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
  
  if (missingHeaders.length > 0) {
    throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
  }

  const agents = lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      const values = line.split(',').map(value => value.trim());
      const agent: AgentFormData = {
        name: '',
        shortDescription: '',
        logo: null,
        source: 'closed_source',
        pricing: 'free',
        contactEmail: '',
        websiteUrl: '',
      };
      
      headers.forEach((header, i) => {
        if (values[i]) {
          switch (header) {
            case 'name':
              agent.name = values[i];
              break;
            case 'shortdescription':
              agent.shortDescription = values[i];
              break;
            case 'source':
              agent.source = values[i] as 'open_source' | 'closed_source';
              break;
            case 'pricing':
              agent.pricing = values[i] as 'free' | 'freemium' | 'paid';
              break;
            case 'contactemail':
              agent.contactEmail = values[i];
              break;
            case 'websiteurl':
              agent.websiteUrl = values[i];
              break;
          }
        }
      });

      // Validate each row
      const errors = validateAgentForm(agent);
      if (Object.keys(errors).length > 0) {
        throw new Error(`Row ${index + 2}: ${Object.values(errors).join(', ')}`);
      }

      return agent;
    });

  return agents;
};