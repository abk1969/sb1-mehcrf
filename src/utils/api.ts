import { API_ENDPOINTS } from '../config/constants';
import { apiKeyService } from '../services/apiKey';

interface ApiRequestConfig extends RequestInit {
  apiKey?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<T> {
  const { apiKey, ...requestConfig } = config;
  
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(endpoint, {
      ...requestConfig,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...requestConfig.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('API key')) {
      apiKeyService.clearApiKey();
    }
    throw error;
  }
}

export async function openaiRequest<T>(body: any, apiKey: string): Promise<T> {
  return apiRequest<T>(API_ENDPOINTS.OPENAI, {
    method: 'POST',
    body: JSON.stringify(body),
    apiKey,
  });
}