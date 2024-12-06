import React from 'react';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
}

export function ResponseDisplay({ response, isLoading }: ResponseDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    toast.success('Réponse copiée dans le presse-papier');
  };

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-lg p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">Réponse générée</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Copier la réponse"
          >
            <Copy size={20} />
          </button>
        </div>
      </div>

      <div className="prose max-w-none mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-gray-500">
          N'oubliez pas de lire et ajuster la réponse avant de l'envoyer
        </p>
        <div className="flex space-x-2">
          <button
            className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
            aria-label="Cette réponse est utile"
          >
            <ThumbsUp size={20} />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
            aria-label="Cette réponse n'est pas utile"
          >
            <ThumbsDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}