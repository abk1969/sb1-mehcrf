import React from 'react';
import { Shield, Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface SecurityBadgeProps {
  type: 'data-privacy' | 'api-key';
}

export function SecurityBadge({ type }: SecurityBadgeProps) {
  const content = {
    'data-privacy': 'Vos données sont traitées de manière sécurisée et ne sont jamais stockées',
    'api-key': 'Votre clé API est stockée de manière sécurisée et chiffrée'
  };

  return (
    <Tooltip content={content[type]}>
      <div className="inline-flex items-center space-x-1 text-sm text-gray-500">
        <Shield className="w-4 h-4" />
        <span>{type === 'data-privacy' ? 'Données non stockées' : 'Clé API sécurisée'}</span>
        <Info className="w-4 h-4" />
      </div>
    </Tooltip>
  );
}