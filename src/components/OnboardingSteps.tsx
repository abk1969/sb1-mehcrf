import React from 'react';
import { OnboardingOverlay } from './OnboardingOverlay';

const onboardingSteps = [
  {
    target: 'api-key',
    title: 'Configuration de la clé API',
    content: 'Commencez par configurer votre clé API OpenAI dans les paramètres. Cette étape est essentielle pour générer des réponses.'
  },
  {
    target: 'model-select',
    title: 'Choix du modèle',
    content: 'Choisissez le modèle d\'IA qui correspond à vos besoins. GPT-4 offre les meilleures réponses, GPT-3.5 est plus rapide et économique.'
  },
  {
    target: 'platform-select',
    title: 'Sélection de la plateforme',
    content: 'Sélectionnez la plateforme pour laquelle vous souhaitez générer une réponse. Chaque plateforme a ses spécificités.'
  }
];

export function OnboardingSteps() {
  const [hasSeenOnboarding] = React.useState(() => {
    return localStorage.getItem('hasSeenOnboarding') === 'true';
  });

  if (hasSeenOnboarding) {
    return null;
  }

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return <OnboardingOverlay steps={onboardingSteps} onComplete={handleComplete} />;
}