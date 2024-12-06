import React from 'react';
import { Users, Shield, Zap, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Une équipe expérimentée',
    description: 'Notre équipe combine expertise en IA et communication professionnelle.'
  },
  {
    icon: Shield,
    title: 'Sécurité garantie',
    description: 'Vos données sont traitées de manière sécurisée et jamais stockées.'
  },
  {
    icon: Zap,
    title: 'Performance optimale',
    description: 'Des réponses générées en quelques secondes pour une productivité maximale.'
  },
  {
    icon: MessageSquare,
    title: 'IA de pointe',
    description: 'Utilisation des dernières avancées en IA pour des réponses pertinentes.'
  }
];

export function About() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            À propos de Globacom3000Reply
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre mission est de simplifier la communication professionnelle en utilisant
            l'intelligence artificielle pour générer des réponses pertinentes et personnalisées.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Vision
            </h2>
            <p className="text-gray-600">
              Nous croyons en une communication professionnelle efficace et accessible à tous.
              Notre plateforme utilise l'IA pour vous aider à maintenir des échanges de qualité
              tout en gagnant un temps précieux.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Engagement
            </h2>
            <p className="text-gray-600">
              Nous nous engageons à fournir un service fiable, sécurisé et respectueux de
              la confidentialité. Chaque fonctionnalité est développée avec soin pour
              répondre aux besoins réels de nos utilisateurs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-6 rounded-lg">
              <Icon size={32} className="text-[#1C3F7C] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}