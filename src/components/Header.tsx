import React from 'react';
import { MessageSquareText } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#1C3F7C] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquareText size={32} className="text-[#34D399]" />
          <div>
            <h1 className="text-2xl font-bold">Globacom3000Reply</h1>
            <p className="text-sm text-gray-300">Générez des réponses professionnelles en un clic</p>
          </div>
        </div>
      </div>
    </header>
  );
}