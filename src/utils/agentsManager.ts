import { Agent, AgentStatus } from '../types';
import { AgentFormData } from '../types/admin';
import { agents as initialAgents } from '../data/agents';

class AgentsManager {
  private agents: Agent[];
  private contactEmails: Map<string, string>;
  private subscribers: Set<() => void>;

  constructor() {
    this.agents = initialAgents.map(agent => ({
      ...agent,
      status: 'approved' as AgentStatus,
      submittedAt: new Date().toISOString()
    }));
    this.contactEmails = new Map();
    this.subscribers = new Set();
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: () => void) {
    this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }

  getAllAgents(): Agent[] {
    return [...this.agents].filter(agent => agent.status === 'approved');
  }

  getAllAgentsForAdmin(): Agent[] {
    return [...this.agents];
  }

  getAgentById(id: string): Agent | undefined {
    return this.agents.find(agent => agent.id === id);
  }

  addAgent(formData: AgentFormData): Agent {
    const id = this.generateId();
    const now = new Date().toISOString();

    // Store contact email
    this.contactEmails.set(id, formData.contactEmail);

    const newAgent: Agent = {
      id,
      name: formData.name,
      description: formData.shortDescription,
      shortDescription: formData.shortDescription.replace(/^"|"$/g, ''), // Remove quotes
      imageUrl: formData.logo ? URL.createObjectURL(formData.logo) : 'https://via.placeholder.com/300',
      category: 'chatbots', // Default category
      url: formData.websiteUrl,
      featured: false,
      status: 'pending',
      submittedAt: now,
      githubUrl: formData.githubUrl,
      twitterUrl: formData.twitterUrl,
      facebookUrl: formData.facebookUrl,
      linkedinUrl: formData.linkedinUrl,
      discordUrl: formData.discordUrl
    };

    this.agents.unshift(newAgent);
    this.notifySubscribers();
    return newAgent;
  }

  updateAgentStatus(id: string, status: AgentStatus): Agent | null {
    const index = this.agents.findIndex(agent => agent.id === id);
    if (index === -1) return null;

    this.agents[index] = {
      ...this.agents[index],
      status
    };

    this.notifySubscribers();
    return this.agents[index];
  }

  toggleFeatured(id: string): Agent | null {
    const index = this.agents.findIndex(agent => agent.id === id);
    if (index === -1) return null;

    this.agents[index] = {
      ...this.agents[index],
      featured: !this.agents[index].featured
    };

    this.notifySubscribers();
    return this.agents[index];
  }

  bulkDelete(ids: string[]): boolean {
    const initialLength = this.agents.length;
    this.agents = this.agents.filter(agent => !ids.includes(agent.id));
    const deleted = this.agents.length < initialLength;
    
    if (deleted) {
      ids.forEach(id => {
        this.contactEmails.delete(id);
      });
      this.notifySubscribers();
    }
    
    return deleted;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const agentsManager = new AgentsManager();