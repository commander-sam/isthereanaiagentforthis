import React from 'react';
import { BlogPost } from '../../../types';
import BlogPostCard from './BlogPostCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';

interface BlogListProps {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
}

export default function BlogList({ posts, isLoading, error }: BlogListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage title="Error" message={error} />;
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}