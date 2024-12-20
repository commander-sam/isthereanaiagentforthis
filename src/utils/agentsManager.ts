import { Agent, AgentStatus } from '../types';
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

  // ... rest of the methods remain the same but with 'agent' instead of 'tool'
}

export const agentsManager = new AgentsManager();