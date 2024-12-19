import React from 'react';
import { Tool } from '../../types';
import ToolsTable from './list/ToolsTable';

interface ToolsListProps {
  tools: Tool[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
}

export default function ToolsList({ tools, onEdit, onDelete }: ToolsListProps) {
  return <ToolsTable tools={tools} onEdit={onEdit} onDelete={onDelete} />;
}