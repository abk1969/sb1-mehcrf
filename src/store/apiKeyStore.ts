import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'globacom3000reply_secure_key';
const API_KEY_REGEX = /^sk-[A-Za-z0-9]{32,}$/;

interface ApiKeyState {
  encryptedApiKey: string | null;
  setApiKey: (apiKey: string) => void;
  getApiKey: () => string | null;
  clearApiKey: () => void;
  hasApiKey: () => boolean;
  validateApiKey: (apiKey: string) => boolean;
}

export const useApiKeyStore = create<ApiKeyState>()(
  persist(
    (set, get) => ({
      encryptedApiKey: null,
      
      setApiKey: (apiKey: string) => {
        if (!apiKey) {
          throw new Error('La clé API ne peut pas être vide');
        }
        
        if (!API_KEY_REGEX.test(apiKey)) {
          throw new Error('Format de clé API invalide. La clé doit commencer par "sk-" suivi d\'au moins 32 caractères');
        }

        try {
          const encrypted = CryptoJS.AES.encrypt(apiKey, ENCRYPTION_KEY).toString();
          set({ encryptedApiKey: encrypted });
          return true;
        } catch (error) {
          console.error('Encryption error:', error);
          throw new Error('Erreur lors du chiffrement de la clé API');
        }
      },
      
      getApiKey: () => {
        const { encryptedApiKey } = get();
        if (!encryptedApiKey) return null;
        
        try {
          const decrypted = CryptoJS.AES.decrypt(encryptedApiKey, ENCRYPTION_KEY);
          const apiKey = decrypted.toString(CryptoJS.enc.Utf8);
          
          if (!API_KEY_REGEX.test(apiKey)) {
            get().clearApiKey();
            return null;
          }
          
          return apiKey;
        } catch (error) {
          console.error('Decryption error:', error);
          get().clearApiKey();
          return null;
        }
      },
      
      clearApiKey: () => {
        set({ encryptedApiKey: null });
      },
      
      hasApiKey: () => {
        const apiKey = get().getApiKey();
        return !!apiKey && API_KEY_REGEX.test(apiKey);
      },

      validateApiKey: (apiKey: string) => {
        return API_KEY_REGEX.test(apiKey);
      }
    }),
    {
      name: 'api-key-storage',
      partialize: (state) => ({ encryptedApiKey: state.encryptedApiKey }),
      version: 1,
    }
  )
);