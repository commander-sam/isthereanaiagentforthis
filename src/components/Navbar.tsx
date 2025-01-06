import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Settings, Star, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-white hidden sm:block">
                AI Directory
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-blue-400">
              Home
            </Link>
            <Link to="/agents" className="text-gray-200 hover:text-blue-400">
              All Agents
            </Link>
            <Link to="/categories" className="text-gray-200 hover:text-blue-400">
              Categories
            </Link>
            <Link to="/submit" className="text-gray-200 hover:text-blue-400">
              Submit an Agent
            </Link>
            <Link 
              to="/feature" 
              className="flex items-center text-gray-200 hover:text-blue-400"
            >
              <Star className="h-4 w-4 mr-1" />
              Get Featured
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

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/agents"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              All Agents
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              to="/submit"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              Submit an Agent
            </Link>
            <Link
              to="/feature"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Get Featured
              </div>
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 text-gray-200 hover:text-blue-400"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-1" />
                Admin
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}