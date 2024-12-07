import React, { useState, useCallback } from 'react';
import { PlatformSelector } from '../components/PlatformSelector';
import { MessageInput } from '../components/MessageInput';
import { ChatInterface } from '../components/ChatInterface';
import { OnboardingOverlay } from '../components/OnboardingOverlay';
import { FeedbackDialog } from '../components/FeedbackDialog';
import { Platform, ToneType } from '../types';
import { useAgent } from '../hooks/useAgent';
import { useApiKey } from '../hooks/useApiKey';
import { useChat } from '../hooks/useChat';
import { toast } from 'sonner';

export function Generator() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<ToneType>('professional');
  const [showFeedback, setShowFeedback] = useState(false);
  const { runAgent, isLoading } = useAgent();
  const { hasApiKey } = useApiKey();
  const { messages, addMessage } = useChat();

  const handleSubmit = useCallback(async () => {
    if (!hasApiKey()) {
      toast.error('Veuillez configurer votre clé API OpenAI dans les paramètres');
      return;
    }

    if (!selectedPlatform) {
      toast.error('Veuillez sélectionner une plateforme');
      return;
    }

    if (!message.trim()) {
      toast.error('Veuillez entrer un message');
      return;
    }

    // Add user message immediately
    addMessage({
      type: 'user',
      content: message,
      timestamp: new Date()
    });

    try {
      const response = await runAgent(selectedPlatform, message, tone);
      
      // Add bot response
      addMessage({
        type: 'bot',
        content: response,
        timestamp: new Date()
      });
      
      // Clear input
      setMessage('');
      
      // Show feedback dialog every 5 messages
      const messageCount = parseInt(localStorage.getItem('messageCount') || '0', 10) + 1;
      localStorage.setItem('messageCount', messageCount.toString());
      if (messageCount % 5 === 0) {
        setShowFeedback(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  }, [selectedPlatform, message, tone, hasApiKey, runAgent, addMessage]);

  const handleFeedback = useCallback((feedback: { rating: number; comment: string }) => {
    setShowFeedback(false);
    toast.success('Merci pour votre retour !');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <OnboardingOverlay />
      
      <section>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Générateur de réponses</h1>
          <p className="text-gray-600 mt-2">
            Sélectionnez une plateforme et générez une réponse professionnelle
          </p>
        </div>
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
      </section>

      {selectedPlatform && (
        <section className="space-y-8">
          <MessageInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            tone={tone}
            onToneChange={setTone}
          />

          {messages.length > 0 && (
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
            />
          )}
        </section>
      )}

      {showFeedback && (
        <FeedbackDialog
          onSubmit={handleFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}