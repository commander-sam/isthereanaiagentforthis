import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BlogPost } from '../../../types';
import { formatDate } from '../../../utils/date';
import GradientCard from '../../../components/common/GradientCard';

interface BlogSidebarProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogSidebar({ post, relatedPosts }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Author info */}
      <GradientCard>
        <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-xl font-semibold">
                {post.author_id.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-white font-medium">Admin</div>
            <div className="text-sm text-gray-400">Content Team</div>
          </div>
        </div>
      </GradientCard>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <GradientCard>
          <h3 className="text-lg font-semibold text-white mb-4">Related Posts</h3>
          <div className="space-y-4">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="block group"
              >
                <div className="flex items-start">
                  {relatedPost.featured_image && (
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-16 h-16 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="ml-4">
                    <h4 className="text-white group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(relatedPost.published_at)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </GradientCard>
      )}
    </div>
  );
}