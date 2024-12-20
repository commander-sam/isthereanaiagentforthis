export type AgentStatus = 'draft' | 'pending' | 'approved' | 'rejected';

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
  submittedAt: string;
  githubUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}