export type ToolStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  url: string;
  featured?: boolean;
  status: ToolStatus;
  submittedAt: string;
  githubUrl?: string;
}