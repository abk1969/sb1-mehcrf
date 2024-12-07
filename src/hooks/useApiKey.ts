import { useCallback } from 'react';
import { useApiKeyStore } from '../store/apiKeyStore';
import { toast } from 'sonner';

export function useApiKey() {
  const store = useApiKeyStore();

  const setApiKey = useCallback(async (apiKey: string) => {
    try {
      if (!store.validateApiKey(apiKey)) {
        throw new Error('Format de clé API invalide');
      }
      
      store.setApiKey(apiKey);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de la sauvegarde de la clé API');
      }
      throw error;
    }
  }, [store]);

  return {
    hasApiKey: store.hasApiKey,
    getApiKey: store.getApiKey,
    setApiKey,
    clearApiKey: store.clearApiKey,
  };
}