import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAnimatedPlaceholder } from '../hooks/useAnimatedPlaceholder';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const placeholderText = useAnimatedPlaceholder();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/agents?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-90 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 relative z-10">
        <div className="text-center">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30"></div>
            <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row items-center gap-4">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100 whitespace-nowrap">
                Is there an AI agent for
              </span>
              <div className="flex-1 min-w-0 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholderText}
                  className="w-full px-6 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full text-white placeholder-blue-200/70 focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all group"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}