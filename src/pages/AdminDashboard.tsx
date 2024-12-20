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

export default function AdminDashboard() {
  const [agents, setAgents] = useState<Agent[]>(agentsManager.getAllAgentsForAdmin());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleAddAgent = (formData: AgentFormData) => {
    const newAgent = agentsManager.addAgent(formData);
    setAgents(agentsManager.getAllAgentsForAdmin());
    setIsFormOpen(false);
  };

  const handleUpdateAgent = (formData: AgentFormData & { status?: AgentStatus }) => {
    if (editingAgent) {
      const updatedAgent = agentsManager.updateAgent(editingAgent.id, formData);
      if (updatedAgent) {
        setAgents(agentsManager.getAllAgentsForAdmin());
        setEditingAgent(undefined);
        setIsFormOpen(false);
      }
    }
  };

  const handleDeleteAgent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      agentsManager.deleteAgent(id);
      setAgents(agentsManager.getAllAgentsForAdmin());
    }
  };

  const handleBulkDelete = () => {
    if (selectedAgents.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedAgents.length} agents?`)) {
      agentsManager.bulkDelete(selectedAgents);
      setAgents(agentsManager.getAllAgentsForAdmin());
      setSelectedAgents([]);
    }
  };

  const handleStatusChange = (id: string, status: AgentStatus) => {
    const updated = agentsManager.updateAgentStatus(id, status);
    if (updated) {
      setAgents(agentsManager.getAllAgentsForAdmin());
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updated = agentsManager.toggleFeatured(id);
    if (updated) {
      setAgents(agentsManager.getAllAgentsForAdmin());
    }
  };

  const handleBulkUpload = (agentsData: AgentFormData[]) => {
    agentsData.forEach(agent => {
      agentsManager.addAgent(agent);
    });
    setAgents(agentsManager.getAllAgentsForAdmin());
    setIsBulkUploadOpen(false);
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
              onClick={() => setIsBulkUploadOpen(true)}
              className="bg-green-600 hover:bg-green-700 border-none"
            />
            <ActionButton
              icon={Plus}
              label="Add New Agent"
              onClick={() => {
                setEditingAgent(undefined);
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

        {isBulkUploadOpen ? (
          <BulkUpload
            onUpload={handleBulkUpload}
            onClose={() => setIsBulkUploadOpen(false)}
          />
        ) : isFormOpen ? (
          <AdminAgentForm
            initialData={editingAgent}
            onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingAgent(undefined);
            }}
          />
        ) : (
          <AgentsList
            agents={agents}
            onEdit={(agent) => {
              setEditingAgent(agent);
              setIsFormOpen(true);
            }}
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