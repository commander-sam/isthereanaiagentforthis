import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-90 animate-gradient-x"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0yMCAwTDQwIDBMNDAgMjBMMjAgMjBMMjAgMFpNMCAwTDIwIDBMMjAgMjBMMCAyMEwwIDBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-text-gradient">
            Discover the Future of AI
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Explore cutting-edge AI tools and agents reshaping the digital landscape
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI tools..."
                className="w-full px-8 py-5 rounded-full text-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all group">
                <Search className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}