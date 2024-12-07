import { Platform, ToneType } from '../types';

export const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1/chat/completions',
};

export const STORAGE_KEYS = {
  API_KEY: 'openai_api_key',
  RESPONSE_COUNT: 'responseCount',
  ONBOARDING_COMPLETED: 'hasCompletedOnboarding',
};

export const ENCRYPTION_CONFIG = {
  KEY: 'globacom3000reply_secure_key',
  API_KEY_REGEX: /^sk-[A-Za-z0-9]{32,}$/,
};

export const PLATFORM_CONFIG: Record<Platform, { name: string; prompt: string }> = {
  gmail: {
    name: 'Gmail',
    prompt: 'Vous êtes un assistant qui aide à rédiger des emails professionnels.',
  },
  linkedin: {
    name: 'LinkedIn',
    prompt: 'Vous êtes un expert en communication professionnelle sur LinkedIn.',
  },
  instagram: {
    name: 'Instagram',
    prompt: 'Vous êtes un expert en communication sur Instagram.',
  },
  twitter: {
    name: 'Twitter',
    prompt: 'Vous êtes un expert en communication concise sur Twitter.',
  },
};

export const TONE_CONFIG: Record<ToneType, { name: string; prompt: string; temperature: number }> = {
  professional: {
    name: 'Professionnel',
    prompt: 'Adoptez un ton formel et professionnel.',
    temperature: 0.3,
  },
  friendly: {
    name: 'Amical',
    prompt: 'Adoptez un ton amical et décontracté.',
    temperature: 0.7,
  },
  sales: {
    name: 'Commercial',
    prompt: 'Adoptez un ton commercial et persuasif.',
    temperature: 0.5,
  },
  empathetic: {
    name: 'Empathique',
    prompt: 'Adoptez un ton empathique et compréhensif.',
    temperature: 0.6,
  },
};