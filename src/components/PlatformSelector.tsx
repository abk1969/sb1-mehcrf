import React from 'react';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Platform } from '../types';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';

interface PlatformSelectorProps {
  selectedPlatform: Platform | null;
  onSelect: (platform: Platform) => void;
}

const platforms = [
  {
    id: 'gmail' as Platform,
    icon: Mail,
    label: 'Gmail',
    description: 'Idéal pour les emails professionnels et personnels'
  },
  {
    id: 'linkedin' as Platform,
    icon: Linkedin,
    label: 'LinkedIn',
    description: 'Parfait pour le réseautage professionnel'
  },
  {
    id: 'twitter' as Platform,
    icon: Twitter,
    label: 'Twitter',
    description: 'Pour des réponses concises et engageantes'
  },
  {
    id: 'instagram' as Platform,
    icon: Instagram,
    label: 'Instagram',
    description: 'Adapté aux interactions sociales et au marketing'
  }
];

export function PlatformSelector({ selectedPlatform, onSelect }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
      {platforms.map(({ id, icon: Icon, label, description }) => (
        <Tooltip key={id} content={description}>
          <button
            onClick={() => onSelect(id)}
            className={clsx(
              'p-6 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all',
              selectedPlatform === id
                ? 'bg-[#1C3F7C] text-white'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            )}
            aria-label={`Sélectionner ${label}`}
          >
            <Icon size={24} />
            <span className="font-medium">{label}</span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}