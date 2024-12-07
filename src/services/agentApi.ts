import { apiRequest } from '../utils/api';
import { useApiKeyStore } from '../store/apiKeyStore';

export interface AgentResponse {
  response: string;
}

export async function runAgent(agentType: string, query: string): Promise<AgentResponse> {
  const store = useApiKeyStore.getState();
  const apiKey = store.getApiKey();
  
  if (!apiKey || !store.validateApiKey(apiKey)) {
    throw new Error('Clé API invalide ou manquante');
  }

  return apiRequest<AgentResponse>(`/api/agents/${agentType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query }),
  });
}