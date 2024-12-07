import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from './LoadingSpinner';
import { trackEvent } from '../utils/analytics';
import ReactMarkdown from 'react-markdown';

interface AgentResponseProps {
  response: string;
  isLoading: boolean;
}

export function AgentResponse({ response, isLoading }: AgentResponseProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      toast.success('Réponse copiée dans le presse-papier');
      
      trackEvent({
        category: 'Response',
        action: 'Copy',
        label: 'Agent Response'
      });
    } catch (error) {
      toast.error('Erreur lors de la copie');
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    if (feedback) return;
    
    setFeedback(type);
    toast.success('Merci pour votre retour !');
    
    trackEvent({
      category: 'Feedback',
      action: type === 'positive' ? 'Thumbs Up' : 'Thumbs Down',
      label: 'Agent Response'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Génération de la réponse en cours...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm"
      data-testid="agent-response"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">Réponse de l'agent</h3>
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          aria-label="Copier la réponse"
          data-testid="copy-button"
        >
          <Copy size={20} />
        </button>
      </div>

      <div className="prose max-w-none mb-6">
        <ReactMarkdown className="text-gray-700">
          {response}
        </ReactMarkdown>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-gray-500">
          Cette réponse vous a-t-elle été utile ?
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleFeedback('positive')}
            className={`p-2 rounded-full transition-colors ${
              feedback === 'positive'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-500 hover:text-green-600 hover:bg-gray-100'
            }`}
            aria-label="Cette réponse est utile"
            disabled={!!feedback}
            data-testid="thumbs-up"
          >
            <ThumbsUp size={20} />
          </button>
          <button
            onClick={() => handleFeedback('negative')}
            className={`p-2 rounded-full transition-colors ${
              feedback === 'negative'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
            }`}
            aria-label="Cette réponse n'est pas utile"
            disabled={!!feedback}
            data-testid="thumbs-down"
          >
            <ThumbsDown size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}