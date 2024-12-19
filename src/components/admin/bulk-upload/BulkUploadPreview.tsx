import React from 'react';
import { ToolFormData } from '../../../types/admin';
import { Check } from 'lucide-react';

interface BulkUploadPreviewProps {
  tools: ToolFormData[];
}

export default function BulkUploadPreview({ tools }: BulkUploadPreviewProps) {
  if (!tools.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-300 mb-2">
        Preview ({tools.length} tools)
      </h3>
      <div className="max-h-60 overflow-y-auto border border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Pricing</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50 divide-y divide-gray-800">
            {tools.map((tool, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-gray-300">{tool.name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{tool.source}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{tool.pricing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}