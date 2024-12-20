import React from 'react';
import { AgentFormData } from '../../../types/admin';

interface BulkUploadPreviewProps {
  agents: AgentFormData[];
}

export default function BulkUploadPreview({ agents }: BulkUploadPreviewProps) {
  if (!agents.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-300 mb-2">
        Preview ({agents.length} agents)
      </h3>
      <div className="max-h-60 overflow-y-auto border border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Pricing</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Links</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50 divide-y divide-gray-800">
            {agents.map((agent, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-gray-300">{agent.name}</td>
                <td className="px-4 py-2 text-sm text-gray-300 max-w-xs truncate">
                  {agent.shortDescription}
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">{agent.source}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{agent.pricing}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{agent.contactEmail}</td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex gap-2">
                    {agent.githubUrl && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                        GitHub
                      </span>
                    )}
                    {agent.twitterUrl && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                        Twitter
                      </span>
                    )}
                    {agent.discordUrl && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                        Discord
                      </span>
                    )}
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