import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { SecurityBadge } from './SecurityBadge';
import { LoadingButton } from './LoadingButton';
import { useApiKeyStore } from '../store/apiKeyStore';
import clsx from 'clsx';

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => Promise<void>;
  isLoading: boolean;
}

export function ApiKeyInput({ value, onChange, onSave, isLoading }: ApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  const validateApiKey = useApiKeyStore(state => state.validateApiKey);
  const isValidKey = value ? validateApiKey(value) : true;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
          Clé API OpenAI
        </label>
        <div className="relative">
          <input
            id="api-key"
            type={showKey ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(
              "w-full px-4 py-2 pr-20 border rounded-lg focus:ring-2 focus:ring-[#1C3F7C] focus:border-transparent",
              !isValidKey && value && "border-red-300"
            )}
            placeholder="sk-..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="text-gray-400 hover:text-gray-600"
              aria-label={showKey ? 'Masquer la clé' : 'Afficher la clé'}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <Tooltip content="Votre clé API est stockée de manière sécurisée et n'est jamais partagée">
              <div>
                <Key size={16} className="text-gray-400" />
              </div>
            </Tooltip>
          </div>
        </div>
        {!isValidKey && value && (
          <p className="mt-1 text-sm text-red-500">
            Format de clé API invalide. La clé doit commencer par "sk-" suivi d'au moins 32 caractères
          </p>
        )}
      </div>

      <SecurityBadge type="api-key" />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Obtenez votre clé API sur{' '}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C3F7C] hover:underline"
          >
            OpenAI
          </a>
        </p>
        <LoadingButton
          onClick={onSave}
          isLoading={isLoading}
          loadingText="Sauvegarde..."
          disabled={!isValidKey || !value}
          className={clsx(
            'px-4 py-2 rounded-lg transition-colors',
            (!isValidKey || !value || isLoading)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#1C3F7C] text-white hover:bg-opacity-90'
          )}
        >
          Sauvegarder
        </LoadingButton>
      </div>
    </div>
  );
}