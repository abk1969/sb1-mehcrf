export function validateApiKey(apiKey: string): boolean {
  const API_KEY_REGEX = /^sk-[A-Za-z0-9]{32,}$/;
  return API_KEY_REGEX.test(apiKey);
}

export function validateQuery(query: string): boolean {
  return query.trim().length >= 3;
}

export function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
}