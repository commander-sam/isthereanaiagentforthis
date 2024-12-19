import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <SearchX className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400">No tools found matching your criteria.</p>
    </div>
  );
}