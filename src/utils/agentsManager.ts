import { createClient } from '@supabase/supabase-js';
import { Agent } from '../types';
import { AgentFormData } from '../types/admin';
import { AgentStatus } from '../types/enums';
import { DATABASE_ENUMS } from '../constants/database';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

class AgentsManager {
  private subscribers: Set<() => void>;

  constructor() {
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

  async addAgent(formData: AgentFormData): Promise<Agent | null> {
    try {
      // Upload logo if provided
      let imageUrl = formData.imageUrl || 'https://via.placeholder.com/300';
      if (formData.logo) {
        const fileExt = formData.logo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('agent-logos')
          .upload(fileName, formData.logo);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('agent-logos')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Insert agent data
      const { data, error } = await supabase
        .from('agents')
        .insert([{
          name: formData.name,
          description: formData.description || formData.shortDescription,
          short_description: formData.shortDescription,
          image_url: imageUrl,
          category: formData.category || 'chatbots',
          url: formData.websiteUrl,
          featured: formData.featured || false,
          status: formData.status || DATABASE_ENUMS.STATUS.PENDING,
          source: formData.source,
          pricing: formData.pricing,
          contact_email: formData.contactEmail,
          github_url: formData.githubUrl,
          twitter_url: formData.twitterUrl,
          facebook_url: formData.facebookUrl,
          linkedin_url: formData.linkedinUrl,
          discord_url: formData.discordUrl,
          submitted_by: user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      this.notifySubscribers();
      return data;
    } catch (error) {
      console.error('Error in addAgent:', error);
      throw error;
    }
  }

  // ... rest of the methods remain the same ...
}

export const agentsManager = new AgentsManager();