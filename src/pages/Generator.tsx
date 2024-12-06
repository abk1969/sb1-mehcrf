import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlatformSelector } from '../components/PlatformSelector';
import { MessageInput } from '../components/MessageInput';
import { ResponseDisplay } from '../components/ResponseDisplay';
import { OnboardingSteps } from '../components/OnboardingSteps';
import { FeedbackDialog } from '../components/FeedbackDialog';
import { Platform, ToneType } from '../types';
import { generateAIResponse } from '../services/openai';
import { apiKeyService } from '../services/apiKey';
import { toast } from 'sonner';

export function Generator() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<ToneType>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [generatedResponse, setGeneratedResponse] = useState('');

  useEffect(() => {
    const count = parseInt(localStorage.getItem('responseCount') || '0', 10);
    setResponseCount(count);

    // Check for API key on component mount
    if (!apiKeyService.hasApiKey()) {
      toast.error('Veuillez configurer votre clé API OpenAI dans les paramètres');
      navigate('/settings');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!selectedPlatform || !message) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    const apiKey = apiKeyService.getApiKey();
    if (!apiKey) {
      toast.error('Clé API manquante. Veuillez la configurer dans les paramètres');
      navigate('/settings');
      return;
    }

    setIsLoading(true);
    try {
      const response = await generateAIResponse({
        platform: selectedPlatform,
        message,
        tone,
        apiKey
      });

      setGeneratedResponse(response);
      
      const newCount = responseCount + 1;
      setResponseCount(newCount);
      localStorage.setItem('responseCount', newCount.toString());
      
      if (newCount % 5 === 0) {
        setShowFeedback(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Une erreur est survenue lors de la génération de la réponse');
      }
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (feedback: { rating: number; comment: string }) => {
    console.log('Feedback:', feedback);
    setShowFeedback(false);
    toast.success('Merci pour votre retour !');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <OnboardingSteps />
      
      <section>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Générateur de réponses</h1>
          <p className="text-gray-600 mt-2">
            Sélectionnez votre plateforme et générez une réponse professionnelle en quelques secondes
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
            message={message}
            tone={tone}
            onMessageChange={setMessage}
            onToneChange={setTone}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <ResponseDisplay
            response={generatedResponse}
            isLoading={isLoading}
          />
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