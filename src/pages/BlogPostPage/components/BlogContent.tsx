import React from 'react';
import { BlogPost } from '../../../types';

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg border border-white/10 p-8">
        <div 
          className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}