// Note: This is a simple encryption implementation for demonstration.
// In a production environment, use more secure methods and proper key management.
export function encrypt(text: string): string {
  const b64 = btoa(text);
  return b64.split('').reverse().join('');
}

export function decrypt(encryptedText: string): string {
  const reversed = encryptedText.split('').reverse().join('');
  return atob(reversed);
}