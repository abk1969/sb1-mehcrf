import React from 'react';
import { ToneType } from '../types';
import { OnboardingTip } from './OnboardingTip';
import { LoadingSpinner } from './LoadingSpinner';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';

interface MessageInputProps {
  message: string;
  tone: ToneType;
  onMessageChange: (message: string) => void;
  onToneChange: (tone: ToneType) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const tones: { value: ToneType; label: string; description: string }[] = [
  { 
    value: 'professional',
    label: 'Professionnel',
    description: 'Ton formel et business adapté aux échanges professionnels'
  },
  { 
    value: 'friendly',
    label: 'Amical',
    description: 'Style décontracté pour des échanges plus personnels'
  },
  { 
    value: 'sales',
    label: 'Commercial',
    description: 'Approche commerciale persuasive et orientée résultats'
  },
  { 
    value: 'empathetic',
    label: 'Empathique',
    description: 'Ton compréhensif et attentionné pour des situations délicates'
  },
];

export function MessageInput({ 
  message,
  tone,
  onMessageChange,
  onToneChange,
  onSubmit,
  isLoading = false
}: MessageInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message à traiter
          </label>
          <OnboardingTip content="Collez le message auquel vous souhaitez répondre. Plus le message est complet, meilleure sera la réponse." />
        </div>
        
        <textarea
          id="message"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Collez votre message ici..."
          className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1C3F7C] focus:border-transparent"
          aria-label="Message à traiter"
        />
        
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Ton de la réponse
            </label>
            <OnboardingTip content="Choisissez le ton qui correspond le mieux au contexte de votre échange" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tones.map(({ value, label, description }) => (
              <Tooltip key={value} content={description}>
                <button
                  type="button"
                  onClick={() => onToneChange(value)}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    tone === value
                      ? 'bg-[#1C3F7C] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                  aria-label={`Sélectionner le ton ${label}`}
                >
                  {label}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!message || isLoading}
          className={clsx(
            'mt-6 w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center',
            !message || isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#34D399] text-white hover:bg-opacity-90'
          )}
          aria-label="Générer la réponse"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            'Générer la réponse'
          )}
        </button>
      </div>
    </form>
  );
}