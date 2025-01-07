import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '../../../types';
import { formatDate } from '../../../utils/date';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-100 transition-all duration-500 blur"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden">
        {post.featured_image && (
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-6">
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
              {post.title}
            </h2>
          </Link>

          <p className="text-gray-400 mb-4">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.published_at)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              5 min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.view_count} views
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/blog?tag=${tag.id}`}
                  className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500/20 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}