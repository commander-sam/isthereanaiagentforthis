import React, { useState } from 'react';
import { Agent, AgentStatus } from '../types';
import { AgentFormData } from '../types/admin';
import { agentsManager } from '../utils/agentsManager';
import AdminToolForm from '../components/admin/form/AdminToolForm';
import ToolsList from '../components/admin/ToolsList';
import BulkUpload from '../components/admin/BulkUpload';
import { Plus, Upload, Trash2 } from 'lucide-react';
import ActionButton from '../components/common/ActionButton';

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

  const handleUpdateAgent = (formData: AgentFormData) => {
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
      agentsManager.bulkDelete([id]);
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

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: AgentStatus) => {
    const updated = agentsManager.updateAgentStatus(id, status);
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

  const handleToggleFeatured = (id: string) => {
    const updated = agentsManager.toggleFeatured(id);
    if (updated) {
      setAgents(agentsManager.getAllAgentsForAdmin());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Manage Agents</h1>
          <div className="flex space-x-4">
            {selectedAgents.length > 0 && (
              <ActionButton
                icon={Trash2}
                label={`Delete Selected (${selectedAgents.length})`}
                onClick={handleBulkDelete}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
              />
            )}
            <ActionButton
              icon={Upload}
              label="Bulk Upload"
              onClick={() => setIsBulkUploadOpen(true)}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300"
            />
            <ActionButton
              icon={Plus}
              label="Add New Agent"
              onClick={() => {
                setEditingAgent(undefined);
                setIsFormOpen(true);
              }}
              className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
            />
          </div>
        </div>

        {isBulkUploadOpen ? (
          <BulkUpload
            onUpload={handleBulkUpload}
            onClose={() => setIsBulkUploadOpen(false)}
          />
        ) : isFormOpen ? (
          <AdminToolForm
            initialData={editingAgent}
            onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingAgent(undefined);
            }}
          />
        ) : (
          <ToolsList
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