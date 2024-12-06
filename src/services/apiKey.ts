import { toast } from 'sonner';
import { encrypt, decrypt } from '../utils/encryption';

const API_KEY_STORAGE_KEY = 'openai_api_key';

export const apiKeyService = {
  saveApiKey(key: string): boolean {
    if (!key) {
      toast.error('Veuillez entrer une clé API valide');
      return false;
    }

    if (!this.validateApiKey(key)) {
      toast.error('Format de clé API invalide. La clé doit commencer par "sk-"');
      return false;
    }
    
    try {
      const encryptedKey = encrypt(key);
      localStorage.setItem(API_KEY_STORAGE_KEY, encryptedKey);
      toast.success('Clé API sauvegardée avec succès');
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Erreur lors de la sauvegarde de la clé API');
      return false;
    }
  },

  getApiKey(): string | null {
    try {
      const encryptedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (!encryptedKey) return null;
      
      const key = decrypt(encryptedKey);
      if (!this.validateApiKey(key)) {
        this.clearApiKey();
        return null;
      }
      
      return key;
    } catch (error) {
      console.error('Error getting API key:', error);
      this.clearApiKey();
      return null;
    }
  },

  hasApiKey(): boolean {
    try {
      const key = this.getApiKey();
      return !!key && this.validateApiKey(key);
    } catch {
      return false;
    }
  },

  validateApiKey(key: string): boolean {
    return typeof key === 'string' && key.startsWith('sk-') && key.length > 20;
  },

  clearApiKey(): void {
    try {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing API key:', error);
    }
  }
};