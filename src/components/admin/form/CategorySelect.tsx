import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import FormInput from '../../form/FormInput';
import { supabase } from '../../../lib/supabase';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CategorySelect({ value, onChange, error }: CategorySelectProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingError, setLoadingError] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);

      // Set default category if none selected
      if (!value && data?.length) {
        onChange(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setLoadingError('Failed to load categories');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const id = newCategory.toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase
        .from('categories')
        .insert({
          id,
          name: newCategory.trim(),
          description: `${newCategory.trim()} category`,
          icon: 'Sparkles' // Default icon
        });

      if (error) throw error;

      await fetchCategories();
      onChange(id);
      setNewCategory('');
      setIsAddingCategory(false);
    } catch (err) {
      console.error('Error adding category:', err);
      setLoadingError('Failed to add category');
    }
  };

  const handleRemoveCategory = async (categoryId: string) => {
    if (!window.confirm('Are you sure you want to remove this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      await fetchCategories();
      if (value === categoryId && categories.length) {
        onChange(categories[0].id);
      }
    } catch (err) {
      console.error('Error removing category:', err);
      setLoadingError('Failed to remove category');
    }
  };

  if (loadingError) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-sm text-red-400">{loadingError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-blue-300">Category</label>
        <button
          type="button"
          onClick={() => setIsAddingCategory(true)}
          className="flex items-center px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Category
        </button>
      </div>

      {isAddingCategory ? (
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <FormInput
              label="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-4 py-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setNewCategory('');
                setIsAddingCategory(false);
              }}
              className="px-4 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative group flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                value === category.id
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                  : 'bg-gray-900/50 border-white/10 text-gray-300 hover:border-gray-600'
              }`}
              onClick={() => onChange(category.id)}
            >
              <span className="capitalize">
                {category.name}
              </span>
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCategory(category.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}