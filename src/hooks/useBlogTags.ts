import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogTag } from '../types';

export function useBlogTags() {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_tags')
          .select('*')
          .order('name');

        if (error) throw error;
        setTags(data || []);
      } catch (err) {
        console.error('Error fetching blog tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog tags');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, isLoading, error };
}