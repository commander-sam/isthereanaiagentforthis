import { AgentPricing, AgentSource, AgentStatus } from './enums';

export interface AgentFormData {
  name: string;
  shortDescription: string;
  description: string;
  logo: File | null;
  source: AgentSource;
  pricing: AgentPricing;
  contactEmail: string;
  websiteUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  discordUrl?: string;
  category?: string;
  featured?: boolean;
  imageUrl?: string;
  status?: AgentStatus;
}

export interface AgentFormErrors {
  [key: string]: string;
}