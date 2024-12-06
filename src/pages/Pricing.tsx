import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    description: 'Parfait pour découvrir le service',
    features: [
      '10 réponses par jour',
      'Plateformes principales',
      'Tons de base',
      'Support par email'
    ]
  },
  {
    name: 'Pro',
    price: '19€',
    period: '/mois',
    description: 'Pour les professionnels',
    features: [
      'Réponses illimitées',
      'Toutes les plateformes',
      'Tous les tons disponibles',
      'Support prioritaire',
      'Statistiques avancées',
      'Templates personnalisés'
    ],
    highlighted: true
  },
  {
    name: 'Entreprise',
    price: 'Sur mesure',
    description: 'Pour les grandes équipes',
    features: [
      'Tout le plan Pro',
      'Intégration API',
      'Formation dédiée',
      'Account manager',
      'SLA garanti'
    ]
  }
];

export function Pricing() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Des tarifs adaptés à vos besoins
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez le plan qui correspond le mieux à votre utilisation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? 'bg-[#1C3F7C] text-white ring-2 ring-[#34D399]'
                  : 'bg-white'
              }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-lg ml-1 opacity-80">{plan.period}</span>
                  )}
                </div>
                <p className={`mt-2 ${plan.highlighted ? 'text-gray-200' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check size={20} className={plan.highlighted ? 'text-[#34D399]' : 'text-[#1C3F7C]'} />
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/generator"
                className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-[#34D399] text-white hover:bg-opacity-90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Commencer
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}