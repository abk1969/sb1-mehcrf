import { useApiKeyStore } from '../store/apiKeyStore';

interface AgentResponse {
  response: string;
}

class AgentService {
  private readonly API_URL = 'http://localhost:8000/api';

  async getResponse(type: string, query: string, apiKey: string): Promise<string> {
    try {
      const response = await fetch(`${this.API_URL}/agents/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get response from agent');
      }

      const data: AgentResponse = await response.json();
      return data.response;
    } catch (error) {
      console.error('Agent service error:', error);
      if (error instanceof Error && error.message.includes('API key')) {
        useApiKeyStore.getState().clearApiKey();
      }
      throw error;
    }
  }
}

export const agentService = new AgentService();