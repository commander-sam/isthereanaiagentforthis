export interface ToolFormData {
  name: string;
  shortDescription: string;
  logo: File | null;
  source: 'open_source' | 'closed_source';
  pricing: 'free' | 'freemium' | 'paid';
  contactEmail: string;
  websiteUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  discordUrl?: string;
}

export interface ToolFormErrors {
  [key: string]: string;
}