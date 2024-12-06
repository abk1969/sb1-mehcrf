import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Bot, MessageSquare } from 'lucide-react';

const ONBOARDING_STORAGE_KEY = 'hasCompletedOnboarding';

const steps = [
  {
    id: 'welcome',
    icon: MessageSquare,
    title: 'Bienvenue sur Globacom3000Reply',
    content: 'Générez des réponses professionnelles en quelques clics. Suivez ce guide rapide pour commencer.',
  },
  {
    id: 'api-key',
    icon: Key,
    title: 'Configuration de la clé API',
    content: 'Commencez par configurer votre clé API OpenAI dans les paramètres. Cette étape est essentielle pour générer des réponses.',
  },
  {
    id: 'model-select',
    icon: Bot,
    title: 'Choix du modèle',
    content: 'GPT-4 offre la meilleure qualité mais est plus lent et plus coûteux. GPT-4o est optimisé pour la rapidité et le coût.',
  }
];

interface OnboardingOverlayProps {
  onComplete?: () => void;
}

export function OnboardingOverlay({ onComplete }: OnboardingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasCompleted = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (hasCompleted) {
      setIsVisible(false);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <CurrentIcon className="w-6 h-6 text-[#1C3F7C]" />
              <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
            </div>
            <button
              onClick={handleComplete}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fermer le guide"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-600 mb-8">{steps[currentStep].content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-[#1C3F7C]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleComplete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Passer
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#1C3F7C] text-white rounded-lg hover:bg-opacity-90"
              >
                {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}