import React from 'react';

interface ErrorMessageProps {
  title: string;
  message: string;
}

export default function ErrorMessage({ title, message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-20 blur-lg"></div>
        <div className="relative text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
}