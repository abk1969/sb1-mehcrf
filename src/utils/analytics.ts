interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function trackEvent({ category, action, label, value }: AnalyticsEvent): void {
  try {
    // Implementation would depend on your analytics provider
    console.log('Analytics event:', { category, action, label, value });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
  }
}

export function trackError(error: Error, context?: string): void {
  trackEvent({
    category: 'Error',
    action: error.message,
    label: context
  });
}