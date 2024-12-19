import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover the Best AI Agents & Tools
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Find the perfect AI solutions for your needs from our curated collection
        </p>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 dark:bg-blue-700 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}