import React, { useState } from 'react';
import { Tool, ToolStatus } from '../types';
import { ToolFormData } from '../types/admin';
import { toolsManager } from '../utils/toolsManager';
import AdminToolForm from '../components/admin/form/AdminToolForm';
import ToolsList from '../components/admin/ToolsList';
import BulkUpload from '../components/admin/BulkUpload';
import { Plus, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const [tools, setTools] = useState<Tool[]>(toolsManager.getAllToolsForAdmin());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | undefined>();

  const handleAddTool = (formData: ToolFormData) => {
    const newTool = toolsManager.addTool(formData);
    setTools(toolsManager.getAllToolsForAdmin());
    setIsFormOpen(false);
  };

  const handleUpdateTool = (formData: ToolFormData) => {
    if (editingTool) {
      const updatedTool = toolsManager.updateTool(editingTool.id, formData);
      if (updatedTool) {
        setTools(toolsManager.getAllToolsForAdmin());
        setEditingTool(undefined);
        setIsFormOpen(false);
      }
    }
  };

  const handleDeleteTool = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      const deleted = toolsManager.deleteTool(id);
      if (deleted) {
        setTools(toolsManager.getAllToolsForAdmin());
      }
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: ToolStatus) => {
    const updated = toolsManager.updateToolStatus(id, status);
    if (updated) {
      setTools(toolsManager.getAllToolsForAdmin());
    }
  };

  const handleBulkUpload = (toolsData: ToolFormData[]) => {
    toolsData.forEach(tool => {
      toolsManager.addTool(tool);
    });
    setTools(toolsManager.getAllToolsForAdmin());
    setIsBulkUploadOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Manage Tools</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsBulkUploadOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Bulk Upload
            </button>
            <button
              onClick={() => {
                setEditingTool(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Tool
            </button>
          </div>
        </div>

        {isBulkUploadOpen ? (
          <div className="mb-8">
            <BulkUpload
              onUpload={handleBulkUpload}
              onClose={() => setIsBulkUploadOpen(false)}
            />
          </div>
        ) : isFormOpen ? (
          <div className="mb-8">
            <AdminToolForm
              initialData={editingTool}
              onSubmit={editingTool ? handleUpdateTool : handleAddTool}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTool(undefined);
              }}
            />
          </div>
        ) : (
          <ToolsList
            tools={tools}
            onEdit={handleEdit}
            onDelete={handleDeleteTool}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}