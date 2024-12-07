import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#1C3F7C] text-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MessageSquareText size={32} className="text-[#34D399]" />
          <div>
            <h1 className="text-2xl font-bold">Globacom3000Reply</h1>
            <p className="text-sm text-gray-300">Générez des réponses professionnelles en un clic</p>
          </div>
        </Link>
        
        <Link 
          to="/settings"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Settings size={20} />
          <span>Paramètres</span>
        </Link>
      </div>
    </header>
  );
}