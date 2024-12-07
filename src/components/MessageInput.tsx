import React, { useCallback } from 'react';
import { LoadingButton } from './LoadingButton';
import { SecurityBadge } from './SecurityBadge';
import { OnboardingTip } from './OnboardingTip';
import { validateQuery } from '../utils/validation';
import { trackEvent } from '../utils/analytics';
import { ToneType } from '../types';
import clsx from 'clsx';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  tone: ToneType;
  onToneChange: (tone: ToneType) => void;
  placeholder?: string;
}

export function MessageInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading = false,
  disabled = false,
  tone,
  onToneChange,
  placeholder = "Que souhaitez-vous savoir ?"
}: MessageInputProps) {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateQuery(value)) {
      return;
    }

    trackEvent({
      category: 'Message',
      action: 'Submit',
      label: 'Generator'
    });

    onSubmit();
  }, [value, onSubmit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (validateQuery(value) && !isLoading && !disabled) {
        onSubmit();
      }
    }
  }, [value, onSubmit, isLoading, disabled]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" role="form">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Votre requête
          </label>
          <OnboardingTip content="Saisissez votre question ou demande d'information" />
        </div>
        
        <div className="relative">
          <textarea
            id="message"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx(
              "w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-[#1C3F7C] focus:border-transparent resize-none",
              "bg-white",
              !validateQuery(value) && value.length > 0 && "border-red-300"
            )}
            aria-label="Votre requête"
            data-testid="message-input"
          />
          {!validateQuery(value) && value.length > 0 && (
            <p className="mt-1 text-sm text-red-500">
              La requête doit contenir au moins 3 caractères
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Ton de la réponse
          </label>
          <div className="flex space-x-2">
            {['professional', 'friendly', 'sales', 'empathetic'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onToneChange(t as ToneType)}
                className={clsx(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  tone === t
                    ? 'bg-[#1C3F7C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {t === 'professional' && 'Professionnel'}
                {t === 'friendly' && 'Amical'}
                {t === 'sales' && 'Commercial'}
                {t === 'empathetic' && 'Empathique'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <SecurityBadge type="data-privacy" />
          
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Génération en cours..."
            className={clsx(
              'px-6 py-2 rounded-lg font-medium transition-colors',
              (!validateQuery(value) || isLoading || disabled)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#1C3F7C] text-white hover:bg-opacity-90'
            )}
            disabled={!validateQuery(value) || isLoading || disabled}
            data-testid="submit-button"
          >
            Générer la réponse
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}