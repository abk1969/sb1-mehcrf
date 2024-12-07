import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, CreditCard, Info, Settings } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/generator', icon: MessageSquare, label: 'Générateur' },
  { to: '/pricing', icon: CreditCard, label: 'Tarifs' },
  { to: '/about', icon: Info, label: 'À propos' },
  { to: '/settings', icon: Settings, label: 'Paramètres' }
];

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  isActive
                    ? 'border-[#1C3F7C] text-[#1C3F7C]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}