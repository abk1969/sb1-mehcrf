import React from 'react';
import { Globe2, LineChart, Users } from 'lucide-react';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';

type AgentType = 'web' | 'finance' | 'team';

interface AgentSelectorProps {
  selectedAgent: AgentType | null;
  onSelect: (agent: AgentType) => void;
}

const agents = [
  {
    id: 'web' as AgentType,
    icon: Globe2,
    label: 'Web Agent',
    description: 'Recherche d\'informations sur le web'
  },
  {
    id: 'finance' as AgentType,
    icon: LineChart,
    label: 'Finance Agent',
    description: 'Données financières et analyses'
  },
  {
    id: 'team' as AgentType,
    icon: Users,
    label: 'Agent Team',
    description: 'Combine les capacités des deux agents'
  }
];

export function AgentSelector({ selectedAgent, onSelect }: AgentSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {agents.map(({ id, icon: Icon, label, description }) => (
        <Tooltip key={id} content={description}>
          <button
            onClick={() => onSelect(id)}
            className={clsx(
              'p-6 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all',
              selectedAgent === id
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