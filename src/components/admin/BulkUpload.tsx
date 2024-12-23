import React, { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { AgentFormData } from '../../types/admin';
import { parseCsvFile } from '../../utils/csv/parser';
import BulkUploadInfo from './bulk-upload/BulkUploadInfo';
import BulkUploadPreview from './bulk-upload/BulkUploadPreview';
import GradientCard from '../common/GradientCard';
import ActionButton from '../common/ActionButton';

interface BulkUploadProps {
  onUpload: (agents: AgentFormData[]) => Promise<void>;
  onClose: () => void;
}

export default function BulkUpload({ onUpload, onClose }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<AgentFormData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    setError('');
    
    try {
      const { data, errors } = await parseCsvFile(selectedFile);
      
      if (errors.length > 0) {
        setError(errors.map(e => 
          `Row ${e.row}: ${e.field} "${e.value}" - ${e.message}`
        ).join('\n'));
        setPreview([]);
      } else {
        setPreview(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error parsing CSV file');
      setPreview([]);
    }
  };

  const handleUpload = async () => {
    if (!file || !preview.length) return;
    
    setIsProcessing(true);
    setError('');

    try {
      await onUpload(preview);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload agents');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <GradientCard>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bulk Upload Agents</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <BulkUploadInfo />

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400 whitespace-pre-line">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
        >
          <Upload className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-gray-400">
            {file ? file.name : 'Choose a CSV file'}
          </span>
        </label>
      </div>

      <BulkUploadPreview agents={preview} />

      <div className="flex justify-end space-x-4">
        <ActionButton
          icon={X}
          label="Cancel"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 border-none"
        />
        <ActionButton
          icon={Upload}
          label={isProcessing ? 'Uploading...' : 'Upload Agents'}
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 border-none"
          disabled={!file || !preview.length || isProcessing}
        />
      </div>
    </GradientCard>
  );
}