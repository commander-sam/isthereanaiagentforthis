import React from 'react';
import { Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '../../../types';
import { formatDate } from '../../../utils/date';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Featured image */}
        {post.featured_image && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post info */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.published_at)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              5 min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {post.view_count} views
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}