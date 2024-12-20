import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-white/5 rounded-full border border-white/10">
          <SearchX className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No Agents Found</h3>
      <p className="text-gray-400">
        No AI agents match your current filters. Try adjusting your search criteria.
      </p>
    </div>
  );
}