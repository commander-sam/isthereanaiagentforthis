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
      return data || [];
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
      return data || [];
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
      return data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }
  }

  async addAgent(formData: AgentFormData): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([{
          name: formData.name,
          description: formData.description || formData.shortDescription,
          short_description: formData.shortDescription,
          image_url: formData.imageUrl || 'https://via.placeholder.com/300',
          category: formData.category || 'chatbots',
          url: formData.websiteUrl,
          featured: false,
          status: DATABASE_ENUMS.STATUS.PENDING,
          source: formData.source,
          pricing: formData.pricing,
          contact_email: formData.contactEmail,
          github_url: formData.githubUrl,
          twitter_url: formData.twitterUrl,
          facebook_url: formData.facebookUrl,
          linkedin_url: formData.linkedinUrl,
          discord_url: formData.discordUrl,
          submitted_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create agent');

      this.notifySubscribers();
      return data;
    } catch (error) {
      console.error('Error adding agent:', error);
      throw error;
    }
  }

  async updateAgent(id: string, formData: AgentFormData): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          name: formData.name,
          description: formData.description || formData.shortDescription,
          short_description: formData.shortDescription,
          image_url: formData.imageUrl || 'https://via.placeholder.com/300',
          category: formData.category || 'chatbots',
          url: formData.websiteUrl,
          status: formData.status || DATABASE_ENUMS.STATUS.PENDING,
          source: formData.source,
          pricing: formData.pricing,
          contact_email: formData.contactEmail,
          github_url: formData.githubUrl,
          twitter_url: formData.twitterUrl,
          facebook_url: formData.facebookUrl,
          linkedin_url: formData.linkedinUrl,
          discord_url: formData.discordUrl
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Agent not found');

      this.notifySubscribers();
      return data;
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  }

  async updateAgentStatus(id: string, status: AgentStatus): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Agent not found');

      this.notifySubscribers();
      return data;
    } catch (error) {
      console.error('Error updating agent status:', error);
      throw error;
    }
  }

  async toggleFeatured(id: string): Promise<Agent> {
    try {
      const agent = await this.getAgentById(id);
      if (!agent) throw new Error('Agent not found');

      const { data, error } = await supabase
        .from('agents')
        .update({ featured: !agent.featured })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Agent not found');

      this.notifySubscribers();
      return data;
    } catch (error) {
      console.error('Error toggling featured status:', error);
      throw error;
    }
  }

  async deleteAgent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      this.notifySubscribers();
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .in('id', ids);

      if (error) throw error;

      this.notifySubscribers();
    } catch (error) {
      console.error('Error bulk deleting agents:', error);
      throw error;
    }
  }
}

export const agentsManager = new AgentsManager();