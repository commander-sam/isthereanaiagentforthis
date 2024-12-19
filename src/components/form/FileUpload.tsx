import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onChange: (file: File) => void;
  accept?: string;
  error?: string;
  preview?: string;
}

export default function FileUpload({ label, onChange, accept, error, preview }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-300 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <button
          type="button"
          onClick={handleClick}
          className="relative w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-gray-900/70 transition-all flex items-center justify-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Logo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Logo preview" className="h-12 w-12 rounded-lg object-cover" />
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}