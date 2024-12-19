import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-white">
                AI Directory
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-blue-400">
              Home
            </Link>
            <Link to="/tools" className="text-gray-200 hover:text-blue-400">
              All Tools
            </Link>
            <Link to="/categories" className="text-gray-200 hover:text-blue-400">
              Categories
            </Link>
            <Link to="/submit" className="text-gray-200 hover:text-blue-400">
              Submit a Tool
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center text-gray-200 hover:text-blue-400"
              title="Admin Dashboard"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}