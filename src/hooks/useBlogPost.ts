import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: postError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name),
            tags:blog_post_tags(
              tag:blog_tags(*)
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .lte('published_at', new Date().toISOString())
          .single();

        if (postError) throw postError;
        if (!data) throw new Error('Post not found');

        setPost(data);

        // Fetch related posts
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name)
          `)
          .eq('category_id', data.category_id)
          .eq('status', 'published')
          .lte('published_at', new Date().toISOString())
          .neq('id', data.id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedPosts(relatedData || []);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const incrementViews = async (postId: string) => {
    try {
      await supabase.rpc('increment_post_views', { post_id: postId });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  return { post, relatedPosts, isLoading, error, incrementViews };
}