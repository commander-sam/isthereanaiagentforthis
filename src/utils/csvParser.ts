import { AgentFormData } from '../types/admin';

export const parseCsvFile = async (file: File): Promise<AgentFormData[]> => {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const agent: AgentFormData = {
        name: '',
        shortDescription: '',
        logo: null,
        source: 'closed_source',
        pricing: 'free',
        contactEmail: '',
        websiteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        facebookUrl: '',
        linkedinUrl: '',
        discordUrl: '',
      };
      
      headers.forEach((header, index) => {
        if (values[index] && header in agent) {
          (agent as any)[header] = values[index];
        }
      });
      
      return agent;
    });
};