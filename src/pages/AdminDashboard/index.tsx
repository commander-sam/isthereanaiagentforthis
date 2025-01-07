import React, { useState } from 'react';
import { Layout, Users, FileText, Settings } from 'lucide-react';
import AgentsList from '../components/admin/AgentsList';
import BlogPosts from './BlogPosts';
import { useAdminAgents } from '../hooks/useAdminAgents';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

type AdminView = 'agents' | 'blog' | 'settings';

export default function AdminDashboard() {
  const { agents, isLoading, error } = useAdminAgents();
  const [currentView, setCurrentView] = useState<AdminView>('agents');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage title="Error" message={error} />;

  const navigation = [
    { name: 'Agents', icon: Users, view: 'agents' },
    { name: 'Blog Posts', icon: FileText, view: 'blog' },
    { name: 'Settings', icon: Settings, view: 'settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen p-4">
          <div className="flex items-center space-x-2 px-4 py-3 mb-8">
            <Layout className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold text-white">Admin Dashboard</span>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setCurrentView(item.view as AdminView)}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    currentView === item.view
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {currentView === 'agents' && (
            <AgentsList
              agents={agents}
              selectedAgents={selectedAgents}
              onSelectionChange={setSelectedAgents}
            />
          )}
          {currentView === 'blog' && <BlogPosts />}
          {currentView === 'settings' && (
            <div className="text-white">Settings coming soon...</div>
          )}
        </div>
      </div>
    </div>
  );
}