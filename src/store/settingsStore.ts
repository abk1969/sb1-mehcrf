import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  model: string;
  temperature: number;
  setModel: (model: string) => void;
  setTemperature: (temperature: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      model: 'gpt-4',
      temperature: 0.7,
      setModel: (model) => set({ model }),
      setTemperature: (temperature) => set({ temperature }),
    }),
    {
      name: 'settings-storage',
      version: 1,
    }
  )
);