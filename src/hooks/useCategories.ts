import { useState, useEffect } from 'react';
import { Category } from '../types';
import { supabase } from '../lib/supabase';

interface CategoryWithCount extends Category {
  agent_count: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        // Fetch categories with agent counts
        const { data, error } = await supabase
          .from('categories')
          .select(`
            *,
            agents!agents_category_fkey(count)
          `);

        if (!mounted) return;

        if (error) throw error;

        if (!data) {
          throw new Error('No categories found');
        }

        const mappedCategories: CategoryWithCount[] = data.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          agent_count: category.agents?.[0]?.count || 0
        }));
        
        setCategories(mappedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    // Set up real-time subscription
    const subscription = supabase
      .channel('categories_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'categories' 
        }, 
        () => {
          if (mounted) {
            fetchCategories();
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { categories, isLoading, error };
}