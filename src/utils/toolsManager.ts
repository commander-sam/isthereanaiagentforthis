import { Tool, ToolStatus } from '../types';
import { ToolFormData } from '../types/admin';
import { tools as initialTools } from '../data/tools';

class ToolsManager {
  private tools: Tool[];
  private contactEmails: Map<string, string>;
  private subscribers: Set<() => void>;

  constructor() {
    // Add status and submittedAt to existing tools
    this.tools = initialTools.map(tool => ({
      ...tool,
      status: 'approved' as ToolStatus,
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

  getAllTools(): Tool[] {
    // Only return approved tools for public views
    return [...this.tools].filter(tool => tool.status === 'approved');
  }

  getAllToolsForAdmin(): Tool[] {
    // Return all tools for admin view
    return [...this.tools];
  }

  getToolById(id: string): Tool | undefined {
    return this.tools.find(tool => tool.id === id);
  }

  addTool(formData: ToolFormData): Tool {
    const id = this.generateId();
    const now = new Date().toISOString();

    const newTool: Tool = {
      id,
      name: formData.name,
      description: formData.shortDescription,
      shortDescription: formData.shortDescription,
      imageUrl: formData.logo ? URL.createObjectURL(formData.logo) : 'https://via.placeholder.com/300',
      category: 'chatbots',
      url: formData.websiteUrl,
      featured: false,
      status: 'pending',
      submittedAt: now
    };

    this.contactEmails.set(id, formData.contactEmail);
    this.tools.unshift(newTool);
    this.saveTools();
    this.notifySubscribers();
    return newTool;
  }

  updateToolStatus(id: string, status: ToolStatus): Tool | null {
    const index = this.tools.findIndex(tool => tool.id === id);
    if (index === -1) return null;

    this.tools[index] = {
      ...this.tools[index],
      status
    };

    this.saveTools();
    this.notifySubscribers();
    return this.tools[index];
  }

  updateTool(id: string, updates: Partial<Tool>): Tool | null {
    const index = this.tools.findIndex(tool => tool.id === id);
    if (index === -1) return null;

    this.tools[index] = { ...this.tools[index], ...updates };
    this.saveTools();
    this.notifySubscribers();
    return this.tools[index];
  }

  deleteTool(id: string): boolean {
    const initialLength = this.tools.length;
    this.tools = this.tools.filter(tool => tool.id !== id);
    const deleted = this.tools.length < initialLength;
    
    if (deleted) {
      this.saveTools();
      this.notifySubscribers();
    }
    
    return deleted;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveTools(): void {
    // In a real application, this would save to a database
    console.log('Tools saved:', this.tools);
  }
}

export const toolsManager = new ToolsManager();