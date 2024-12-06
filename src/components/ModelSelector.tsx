import React from 'react';
import { Tooltip } from './Tooltip';
import { Zap, Clock, DollarSign } from 'lucide-react';
import clsx from 'clsx';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Meilleure qualité, plus lent et plus cher',
    metrics: {
      quality: 95,
      speed: 70,
      cost: 85
    }
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Équilibre entre performance et rapidité',
    metrics: {
      quality: 90,
      speed: 85,
      cost: 75
    }
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Version optimisée pour les réponses rapides',
    metrics: {
      quality: 85,
      speed: 90,
      cost: 60
    }
  }
];

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="space-y-4">
      {models.map((model) => (
        <Tooltip
          key={model.id}
          content={
            <div className="space-y-2">
              <p className="font-medium">{model.name}</p>
              <p>{model.description}</p>
            </div>
          }
        >
          <div
            onClick={() => onModelSelect(model.id)}
            className={clsx(
              'p-4 rounded-lg border cursor-pointer transition-all',
              selectedModel === model.id
                ? 'border-[#1C3F7C] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{model.name}</h3>
                <p className="text-sm text-gray-500">{model.description}</p>
              </div>
              <div
                className={clsx(
                  'h-4 w-4 rounded-full border flex items-center justify-center',
                  selectedModel === model.id
                    ? 'border-[#1C3F7C] bg-[#1C3F7C]'
                    : 'border-gray-300'
                )}
              >
                {selectedModel === model.id && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-[#1C3F7C]" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-[#1C3F7C] rounded-full"
                      style={{ width: `${model.metrics.quality}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">Qualité</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-[#34D399]" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-[#34D399] rounded-full"
                      style={{ width: `${model.metrics.speed}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">Vitesse</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-yellow-500" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{ width: `${model.metrics.cost}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">Coût</span>
              </div>
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}