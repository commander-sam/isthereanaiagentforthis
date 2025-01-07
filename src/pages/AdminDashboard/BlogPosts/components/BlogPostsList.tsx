import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, Star } from 'lucide-react';
import { BlogPost } from '../../../../types';
import { formatDate } from '../../../../utils/date';
import ActionButton from '../../../../components/common/ActionButton';
import { supabase } from '../../../../lib/supabase';

interface BlogPostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
}

export default function BlogPostsList({ posts, onEdit }: BlogPostsListProps) {
  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  const handleToggleFeatured = async (postId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured })
        .eq('id', postId);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post');
    }
  };

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      <div className="relative overflow-x-auto border border-white/10 rounded-lg backdrop-blur-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50 backdrop-blur-xl divide-y divide-gray-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-white">{post.title}</div>
                      <div className="text-sm text-gray-400">{post.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-900/50 text-green-300 border border-green-500/20'
                      : 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/20'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDate(post.published_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {post.view_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleFeatured(post.id, !post.featured)}
                      className={`p-2 rounded transition-colors ${
                        post.featured
                          ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20'
                          : 'text-gray-400 hover:text-gray-300 bg-gray-500/10 hover:bg-gray-500/20'
                      }`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded transition-colors"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}