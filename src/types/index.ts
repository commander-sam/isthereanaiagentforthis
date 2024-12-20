import { AgentPricing, AgentSource, AgentStatus } from './enums';

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
}

// Re-export enum types for convenience
export type { AgentPricing, AgentSource, AgentStatus };