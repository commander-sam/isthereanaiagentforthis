import { useState, useEffect } from 'react';
import { Category } from '../types';
import { supabase } from '../lib/supabase';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;

        if (!data) {
          throw new Error('No categories found');
        }

        const mappedCategories: Category[] = data.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon
        }));

        setCategories(mappedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();

    // Subscribe to changes
    const subscription = supabase
      .channel('categories_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'categories' 
        }, 
        fetchCategories
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { categories, isLoading, error };
}