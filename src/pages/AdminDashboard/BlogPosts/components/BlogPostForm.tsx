import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../../../types';
import { supabase } from '../../../../lib/supabase';
import RichTextEditor from '../../../../components/admin/editor/RichTextEditor';
import FormInput from '../../../../components/form/FormInput';
import GradientCard from '../../../../components/common/GradientCard';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function BlogPostForm({ post, onSubmit, onCancel }: BlogPostFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    featured_image: post?.featured_image || '',
    category_id: post?.category_id || '',
    status: post?.status || 'draft',
    published_at: post?.published_at || null
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (data) setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        ...formData,
        published_at: formData.status === 'published' && !formData.published_at ? 
          new Date().toISOString() : 
          formData.published_at
      };

      if (post?.id) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(data)
          .eq('id', post.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([data]);

        if (insertError) throw insertError;
      }

      await onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <GradientCard>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-white">
            {post ? 'Edit Post' : 'New Post'}
          </h3>
          
          <div className="flex items-center gap-4">
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
              className="px-4 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                formData.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              <span className="text-sm text-gray-400">
                {formData.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FormInput
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <FormInput
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
            helperText="URL-friendly version of the title"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-300">Category</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            multiline
            rows={3}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-300">Content</label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
          </div>

          <FormInput
            label="Featured Image URL"
            value={formData.featured_image}
            onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
            type="url"
          />

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
      </GradientCard>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}