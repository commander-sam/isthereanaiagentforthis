import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../../../../lib/supabase';
import FormInput from '../../../../components/form/FormInput';
import GradientCard from '../../../../components/common/GradientCard';
import ActionButton from '../../../../components/common/ActionButton';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function CategoryManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const { error } = await supabase
        .from('blog_categories')
        .insert([{ ...formData, slug }]);

      if (error) throw error;
      
      setFormData({ name: '', description: '' });
      setIsAdding(false);
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category');
    }
  };

  return (
    <GradientCard>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-white">Blog Categories</h3>
        <ActionButton
          icon={Plus}
          label="Add Category"
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 border-none"
        />
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <FormInput
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            multiline
            rows={3}
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Category
            </button>
          </div>
        </form>
      )}
    </GradientCard>
  );
}