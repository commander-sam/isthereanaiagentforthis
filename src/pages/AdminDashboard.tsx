import React, { useState } from 'react';
import { Agent, AgentStatus } from '../types';
import { AgentFormData } from '../types/admin';
import { agentsManager } from '../utils/agentsManager';
import AdminAgentForm from '../components/admin/form/AdminAgentForm';
import AgentsList from '../components/admin/AgentsList';
import BulkUpload from '../components/admin/BulkUpload';
import { Plus, Upload } from 'lucide-react';
import ActionButton from '../components/common/ActionButton';
import PageTitle from '../components/common/PageTitle';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAdminAgents } from '../hooks/useAdminAgents';
import { useAdminForm } from '../hooks/useAdminForm';

export default function AdminDashboard() {
  const { agents, isLoading, error: fetchError } = useAdminAgents();
  const {
    isFormOpen,
    isBulkUploadOpen,
    editingAgent,
    error: formError,
    handleAddAgent,
    handleUpdateAgent,
    handleEdit,
    handleCancel,
    openBulkUpload,
    closeBulkUpload
  } = useAdminForm();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (fetchError) {
    return (
      <ErrorMessage 
        title="Error Loading Agents"
        message={fetchError}
      />
    );
  }

  const handleDeleteAgent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await agentsManager.deleteAgent(id);
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedAgents.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedAgents.length} agents?`)) {
      try {
        await agentsManager.bulkDelete(selectedAgents);
        setSelectedAgents([]);
      } catch (error) {
        console.error('Error bulk deleting agents:', error);
      }
    }
  };

  const handleStatusChange = async (id: string, status: AgentStatus) => {
    try {
      await agentsManager.updateAgentStatus(id, status);
    } catch (error) {
      console.error('Error updating agent status:', error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await agentsManager.toggleFeatured(id);
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleBulkUpload = async (agentsData: AgentFormData[]) => {
    try {
      for (const agent of agentsData) {
        await agentsManager.addAgent(agent);
      }
      closeBulkUpload();
    } catch (error) {
      console.error('Error bulk uploading agents:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <PageTitle 
            title="Manage AI Agents"
            subtitle="Add, edit, and manage your AI agent listings"
          />
          
          <div className="flex flex-wrap gap-4 mt-6">
            <ActionButton
              icon={Upload}
              label="Bulk Upload"
              onClick={openBulkUpload}
              className="bg-green-600 hover:bg-green-700 border-none"
            />
            <ActionButton
              icon={Plus}
              label="Add New Agent"
              onClick={() => {
                handleCancel();
                setIsFormOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 border-none"
            />
            {selectedAgents.length > 0 && (
              <ActionButton
                icon={Upload}
                label={`Delete Selected (${selectedAgents.length})`}
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 border-none"
              />
            )}
          </div>
        </div>

        {formError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{formError}</p>
          </div>
        )}

        {isBulkUploadOpen ? (
          <BulkUpload
            onUpload={handleBulkUpload}
            onClose={closeBulkUpload}
          />
        ) : isFormOpen ? (
          <AdminAgentForm
            initialData={editingAgent}
            onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent}
            onCancel={handleCancel}
          />
        ) : (
          <AgentsList
            agents={agents}
            onEdit={handleEdit}
            onDelete={handleDeleteAgent}
            onStatusChange={handleStatusChange}
            onToggleFeatured={handleToggleFeatured}
            selectedAgents={selectedAgents}
            onSelectionChange={setSelectedAgents}
          />
        )}
      </div>
    </div>
  );
}