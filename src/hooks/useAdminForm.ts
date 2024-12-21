import { useState } from 'react';
import { Agent, AgentStatus } from '../types';
import { AgentFormData } from '../types/admin';
import { agentsManager } from '../utils/agentsManager';

export function useAdminForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>();
  const [error, setError] = useState<string | null>(null);

  const handleAddAgent = async (formData: AgentFormData) => {
    try {
      setError(null);
      await agentsManager.addAgent(formData);
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add agent');
      console.error('Error adding agent:', err);
    }
  };

  const handleUpdateAgent = async (formData: AgentFormData & { status?: AgentStatus }) => {
    if (!editingAgent) return;
    
    try {
      setError(null);
      await agentsManager.updateAgent(editingAgent.id, formData);
      setEditingAgent(undefined);
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update agent');
      console.error('Error updating agent:', err);
    }
  };

  const handleEdit = (agent: Agent) => {
    setError(null);
    setEditingAgent(agent);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setError(null);
    setEditingAgent(undefined);
    setIsFormOpen(false);
  };

  const openBulkUpload = () => {
    setError(null);
    setIsBulkUploadOpen(true);
  };

  const closeBulkUpload = () => {
    setError(null);
    setIsBulkUploadOpen(false);
  };

  return {
    isFormOpen,
    isBulkUploadOpen,
    editingAgent,
    error,
    handleAddAgent,
    handleUpdateAgent,
    handleEdit,
    handleCancel,
    openBulkUpload,
    closeBulkUpload
  };
}