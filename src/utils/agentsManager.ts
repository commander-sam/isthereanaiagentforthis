import { createClient } from '@supabase/supabase-js';
import { Agent, AgentStatus } from '../types';
import { AgentFormData } from '../types/admin';
import { EventEmitter } from './eventEmitter';
import { DATABASE_ENUMS } from '../constants/database';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

class AgentsManager extends EventEmitter {
  private static readonly CHANGE_EVENT = 'change';

  constructor() {
    super();
  }

  subscribe(callback: () => void): () => void {
    this.on(AgentsManager.CHANGE_EVENT, callback);
    return () => this.off(AgentsManager.CHANGE_EVENT, callback);
  }

  private notifySubscribers(): void {
    this.emit(AgentsManager.CHANGE_EVENT);
  }

  async getAllAgents(): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('status', DATABASE_ENUMS.STATUS.APPROVED)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return this.mapDatabaseToAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  }

  async getAllAgentsForAdmin(): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return this.mapDatabaseToAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  }

  async getAgentById(id: string): Promise<Agent | null> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? this.mapDatabaseToAgent(data) : null;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }
  }

  async addAgent(formData: AgentFormData): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([this.mapFormToDatabase(formData)])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create agent');

      this.notifySubscribers();
      return this.mapDatabaseToAgent(data);
    } catch (error) {
      console.error('Error adding agent:', error);
      throw error;
    }
  }

  async updateAgent(id: string, formData: AgentFormData): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update(this.mapFormToDatabase(formData))
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Agent not found');

      this.notifySubscribers();
      return this.mapDatabaseToAgent(data);
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  }

  private mapFormToDatabase(formData: AgentFormData) {
    return {
      name: formData.name,
      description: formData.description,
      short_description: formData.shortDescription,
      image_url: formData.imageUrl || 'https://via.placeholder.com/300',
      category: formData.category || 'chatbots',
      url: formData.websiteUrl,
      featured: formData.featured ?? false,
      status: formData.status || DATABASE_ENUMS.STATUS.PENDING,
      source: formData.source,
      pricing: formData.pricing,
      contact_email: formData.contactEmail,
      github_url: formData.githubUrl,
      twitter_url: formData.twitterUrl,
      facebook_url: formData.facebookUrl,
      linkedin_url: formData.linkedinUrl,
      discord_url: formData.discordUrl,
      submitted_by: null // Will be set by RLS
    };
  }

  private mapDatabaseToAgent(data: any): Agent {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      shortDescription: data.short_description,
      imageUrl: data.image_url,
      category: data.category,
      url: data.url,
      featured: data.featured,
      status: data.status,
      pricing: data.pricing,
      source: data.source,
      submittedAt: data.created_at,
      contactEmail: data.contact_email,
      githubUrl: data.github_url,
      twitterUrl: data.twitter_url,
      facebookUrl: data.facebook_url,
      linkedinUrl: data.linkedin_url,
      discordUrl: data.discord_url
    };
  }

  private mapDatabaseToAgents(data: any[]): Agent[] {
    return data.map(item => this.mapDatabaseToAgent(item));
  }

  // Rest of the class implementation remains the same...
}

export const agentsManager = new AgentsManager();