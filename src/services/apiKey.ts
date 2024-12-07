import { toast } from 'sonner';
import { useApiKeyStore } from '../store/apiKeyStore';

export const apiKeyService = {
  saveApiKey(key: string): boolean {
    if (!key) {
      toast.error('Veuillez entrer une clé API valide');
      return false;
    }

    try {
      useApiKeyStore.getState().setApiKey(key);
      toast.success('Clé API sauvegardée avec succès');
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de la sauvegarde de la clé API');
      }
      return false;
    }
  },

  getApiKey(): string | null {
    try {
      return useApiKeyStore.getState().getApiKey();
    } catch (error) {
      console.error('Error getting API key:', error);
      return null;
    }
  },

  hasApiKey(): boolean {
    return useApiKeyStore.getState().hasApiKey();
  },

  clearApiKey(): void {
    useApiKeyStore.getState().clearApiKey();
  }
};