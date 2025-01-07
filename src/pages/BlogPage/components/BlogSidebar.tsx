import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useBlogTags } from '../../../hooks/useBlogTags';
import GradientCard from '../../../components/common/GradientCard';

export default function BlogSidebar() {
  const { categories } = useCategories();
  const { tags } = useBlogTags();

  return (
    <>
      <GradientCard>
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/blog?category=${category.id}`}
              className="block text-gray-400 hover:text-blue-400 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </GradientCard>

      <GradientCard>
        <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag.id}
              to={`/blog?tag=${tag.id}`}
              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500/20 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </GradientCard>
    </>
  );
}