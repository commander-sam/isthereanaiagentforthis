import React from 'react';

export default function BulkUploadInfo() {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-400 mb-2">
        Upload a CSV file with the following required columns:
      </p>
      <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
        <code className="text-sm text-blue-400">
          name,shortDescription,source,pricing,contactEmail,websiteUrl
        </code>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-xs text-gray-500">All fields above are required</p>
        <p className="text-xs text-gray-500">Source options: open_source, closed_source</p>
        <p className="text-xs text-gray-500">Pricing options: free, freemium, paid</p>
      </div>
    </div>
  );
}