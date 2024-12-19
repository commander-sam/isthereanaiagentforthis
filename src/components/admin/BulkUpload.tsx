import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { parseCsvFile } from '../../utils/csvParser';
import { ToolFormData } from '../../types/admin';
import { validateToolForm } from '../../utils/validation';
import BulkUploadInfo from './bulk-upload/BulkUploadInfo';
import BulkUploadPreview from './bulk-upload/BulkUploadPreview';

interface BulkUploadProps {
  onUpload: (tools: ToolFormData[]) => void;
  onClose: () => void;
}

export default function BulkUpload({ onUpload, onClose }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<ToolFormData[]>([]);
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
      const tools = await parseCsvFile(selectedFile);
      setPreview(tools);
    } catch (err) {
      setError('Error parsing CSV file. Please check the format.');
    }
  };

  const handleUpload = async () => {
    if (!file || !preview.length) return;
    
    setIsProcessing(true);
    const errors: string[] = [];
    
    preview.forEach((tool, index) => {
      const validationErrors = validateToolForm(tool);
      if (Object.keys(validationErrors).length > 0) {
        errors.push(`Row ${index + 1}: ${Object.values(validationErrors).join(', ')}`);
      }
    });

    if (errors.length > 0) {
      setError(`Validation errors:\n${errors.join('\n')}`);
      setIsProcessing(false);
      return;
    }

    onUpload(preview);
    setIsProcessing(false);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur"></div>
      <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
        <h2 className="text-xl font-medium text-white mb-4">Bulk Upload Tools</h2>
        
        <BulkUploadInfo />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Choose CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-blue-600/50 file:text-blue-200
              hover:file:bg-blue-600/70
              file:cursor-pointer cursor-pointer"
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <pre className="text-sm text-red-400 whitespace-pre-wrap font-mono">{error}</pre>
            </div>
          </div>
        )}

        <BulkUploadPreview tools={preview} />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
              !file || isProcessing
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}