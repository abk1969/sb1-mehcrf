export type Platform = 'gmail' | 'linkedin' | 'instagram' | 'twitter';

export type ToneType = 'professional' | 'friendly' | 'sales' | 'empathetic';

export interface ResponseConfig {
  platform: Platform;
  message: string;
  tone: ToneType;
}

export interface FeedbackData {
  responseId: string;
  useful: boolean;
  quality: number;
  comment?: string;
}