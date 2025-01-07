import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPost } from '../../hooks/useBlogPost';
import BlogContent from './components/BlogContent';
import BlogHeader from './components/BlogHeader';
import BlogSidebar from './components/BlogSidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, relatedPosts, isLoading, error, incrementViews } = useBlogPost(slug);

  useEffect(() => {
    if (post?.id) {
      incrementViews(post.id);
    }
  }, [post?.id]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !post) {
    return (
      <ErrorMessage 
        title="Post Not Found"
        message="The blog post you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <BlogHeader post={post} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogContent post={post} />
          </div>
          <div>
            <BlogSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}