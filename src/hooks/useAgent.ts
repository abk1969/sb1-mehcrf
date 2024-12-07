import { useState, useCallback } from 'react';
import { Platform, ToneType } from '../types';
import { agentService } from '../services/agentService';
import { useApiKey } from './useApiKey';
import { trackEvent, trackError } from '../utils/analytics';

export function useAgent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { hasApiKey, getApiKey } = useApiKey();

  const runAgent = useCallback(async (platform: Platform, message: string, tone: ToneType) => {
    if (!hasApiKey()) {
      throw new Error('Veuillez configurer votre clé API OpenAI dans les paramètres');
    }

    setIsLoading(true);
    setError(null);

    try {
      trackEvent({
        category: 'Agent',
        action: 'Execute',
        label: platform
      });

      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('Clé API invalide ou manquante');
      }

      const response = await agentService.getResponse(platform, message, tone, apiKey);
      
      trackEvent({
        category: 'Agent',
        action: 'Success',
        label: platform
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      trackError(err instanceof Error ? err : new Error(errorMessage));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [hasApiKey, getApiKey]);

  return {
    runAgent,
    isLoading,
    error
  };
}