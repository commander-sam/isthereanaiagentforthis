import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
        <div className="relative w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}