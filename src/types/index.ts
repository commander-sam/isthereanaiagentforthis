export interface Feature {
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  agent_count?: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  url: string;
  featured?: boolean;
  status: AgentStatus;
  pricing: AgentPricing;
  source: AgentSource;
  submittedAt: string;
  githubUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  discordUrl?: string;
  features?: Feature[];
  useCases?: string[];
}

// Re-export enum types for convenience
export type { AgentPricing, AgentSource, AgentStatus };