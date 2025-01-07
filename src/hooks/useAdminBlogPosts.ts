import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export function useAdminBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name),
            tags:blog_post_tags(
              tag:blog_tags(*)
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    const subscription = supabase
      .channel('admin_blog_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'blog_posts' 
        }, 
        fetchPosts
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { posts, isLoading, error };
}