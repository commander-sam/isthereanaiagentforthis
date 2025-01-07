import React, { useState } from 'react';
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

export default function BlogPostForm({ post, onSubmit, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    featured_image: post?.featured_image || '',
    category_id: post?.category_id || '',
    status: post?.status || 'draft'
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (post?.id) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(formData)
          .eq('id', post.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([formData]);

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
        <h3 className="text-xl font-medium text-white mb-6">
          {post ? 'Edit Post' : 'New Post'}
        </h3>

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