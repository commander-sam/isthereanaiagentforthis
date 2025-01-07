import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogSidebar from './components/BlogSidebar';
import SearchBar from './components/SearchBar';
import PageTitle from '../../components/common/PageTitle';
import { useBlogPosts } from '../../hooks/useBlogPosts';

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const { posts, isLoading, error } = useBlogPosts();
  const searchQuery = searchParams.get('search') || '';
  const categoryId = searchParams.get('category');
  const tagId = searchParams.get('tag');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = categoryId 
      ? post.category_id === categoryId
      : true;

    const matchesTag = tagId
      ? post.tags?.some(tag => tag.id === tagId)
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Blog"
          subtitle="Insights and updates from our AI community"
        />
        
        <div className="mt-8">
          <SearchBar />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogList posts={filteredPosts} isLoading={isLoading} error={error} />
          </div>
          <div className="space-y-8">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}