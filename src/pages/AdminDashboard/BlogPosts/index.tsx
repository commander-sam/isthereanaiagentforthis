import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAdminBlogPosts } from '../../../hooks/useAdminBlogPosts';
import BlogPostsList from './components/BlogPostsList';
import BlogPostForm from './components/BlogPostForm';
import CategoryManager from './components/CategoryManager';
import ActionButton from '../../../components/common/ActionButton';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';

export default function BlogPosts() {
  const { posts, isLoading, error } = useAdminBlogPosts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage title="Error" message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <ActionButton
          icon={Plus}
          label="New Post"
          onClick={() => {
            setEditingPost(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 border-none"
        />
      </div>

      {isFormOpen ? (
        <BlogPostForm
          post={editingPost}
          onSubmit={async () => {
            setIsFormOpen(false);
            setEditingPost(null);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingPost(null);
          }}
        />
      ) : (
        <>
          <CategoryManager />
          <BlogPostsList
            posts={posts}
            onEdit={(post) => {
              setEditingPost(post);
              setIsFormOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
}