import { AgentPricing, AgentSource, AgentStatus } from './enums';

export interface AgentFormData {
  name: string;
  shortDescription: string;
  description: string;
  imageUrl?: string;
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
  status?: AgentStatus;
  features?: Array<{ title: string; description: string }>;
  useCases?: string[];
}

export interface AgentFormErrors {
  [key: string]: string;
}