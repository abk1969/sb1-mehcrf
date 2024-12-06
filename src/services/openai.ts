import { Platform, ToneType } from '../types';
import { apiKeyService } from './apiKey';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface GenerateResponseParams {
  platform: Platform;
  message: string;
  tone: ToneType;
  apiKey: string;
}

export async function generateAIResponse({ platform, message, tone, apiKey }: GenerateResponseParams) {
  if (!apiKey || !apiKeyService.validateApiKey(apiKey)) {
    throw new Error('Clé API OpenAI invalide. Veuillez vérifier vos paramètres.');
  }

  const systemPrompt = getSystemPrompt(platform, tone);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: getToneTemperature(tone),
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erreur lors de la génération de la réponse');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error instanceof Error && error.message.includes('API key')) {
      apiKeyService.clearApiKey();
    }
    throw error;
  }
}

function getSystemPrompt(platform: Platform, tone: ToneType): string {
  const platformPrompts = {
    gmail: 'Vous êtes un assistant qui aide à rédiger des emails professionnels.',
    linkedin: 'Vous êtes un expert en communication professionnelle sur LinkedIn.',
    instagram: 'Vous êtes un expert en communication sur Instagram.',
    twitter: 'Vous êtes un expert en communication concise sur Twitter.'
  };

  const toneInstructions = {
    professional: 'Adoptez un ton formel et professionnel.',
    friendly: 'Adoptez un ton amical et décontracté.',
    sales: 'Adoptez un ton commercial et persuasif.',
    empathetic: 'Adoptez un ton empathique et compréhensif.'
  };

  return `${platformPrompts[platform]} ${toneInstructions[tone]} Générez une réponse appropriée au message fourni.`;
}

function getToneTemperature(tone: ToneType): number {
  const temperatures = {
    professional: 0.3,
    friendly: 0.7,
    sales: 0.5,
    empathetic: 0.6
  };

  return temperatures[tone];
}