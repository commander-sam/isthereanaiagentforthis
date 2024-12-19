import { ToolFormData } from '../types/admin';

export const parseCsvFile = async (file: File): Promise<ToolFormData[]> => {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const tool: ToolFormData = {
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
        if (header in tool) {
          tool[header as keyof ToolFormData] = values[index] as string;
        }
      });
      
      return tool;
    });
};