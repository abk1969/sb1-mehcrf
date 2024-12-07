import { create } from 'zustand';
import { Platform, ToneType } from '../types';

interface GeneratorState {
  platform: Platform | null;
  message: string;
  tone: ToneType;
  isLoading: boolean;
  response: string;
  setPlatform: (platform: Platform | null) => void;
  setMessage: (message: string) => void;
  setTone: (tone: ToneType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setResponse: (response: string) => void;
  reset: () => void;
}

const initialState = {
  platform: null,
  message: '',
  tone: 'professional' as ToneType,
  isLoading: false,
  response: '',
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  ...initialState,
  setPlatform: (platform) => set({ platform }),
  setMessage: (message) => set({ message }),
  setTone: (tone) => set({ tone }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setResponse: (response) => set({ response }),
  reset: () => set(initialState),
}));