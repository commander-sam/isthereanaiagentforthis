import { useCategories } from '../../../../hooks/useCategories';
import { Category } from '../../../../types';
import { Sparkles, Star } from 'lucide-react';

export function useFilters() {
  const { categories } = useCategories();
  
  // Create category filters from Supabase data
  const categoryFilters = categories.map((category: Category) => ({
    id: category.id,
    label: category.name,
    icon: category.icon,
    color: 'bg-blue-600 hover:bg-blue-700'
  }));

  // Add default filters
  const defaultFilters = [
    { 
      id: 'all', 
      label: 'All Agents', 
      icon: 'Sparkles', 
      color: 'bg-blue-600 hover:bg-blue-700' 
    },
    { 
      id: 'featured', 
      label: 'Featured', 
      icon: 'Star', 
      color: 'bg-yellow-600 hover:bg-yellow-700' 
    }
  ];

  return [...defaultFilters, ...categoryFilters];
}