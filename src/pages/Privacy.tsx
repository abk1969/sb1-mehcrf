import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export function Privacy() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
        
        <div className="space-y-8">
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-[#1C3F7C]" size={24} />
              <h2 className="text-2xl font-semibold">Protection des données</h2>
            </div>
            <p className="text-gray-600">
              Nous prenons la protection de vos données très au sérieux. Toutes les données sont
              traitées de manière sécurisée et ne sont jamais stockées de manière permanente.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="text-[#1C3F7C]" size={24} />
              <h2 className="text-2xl font-semibold">Sécurité</h2>
            </div>
            <p className="text-gray-600">
              Nous utilisons des protocoles de sécurité avancés pour protéger vos données
              pendant leur traitement. Toutes les communications sont chiffrées via HTTPS.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="text-[#1C3F7C]" size={24} />
              <h2 className="text-2xl font-semibold">Utilisation des données</h2>
            </div>
            <p className="text-gray-600">
              Les messages que vous soumettez sont uniquement utilisés pour générer des réponses
              et sont immédiatement supprimés après le traitement. Nous ne conservons aucune
              donnée personnelle.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Database className="text-[#1C3F7C]" size={24} />
              <h2 className="text-2xl font-semibold">API OpenAI</h2>
            </div>
            <p className="text-gray-600">
              Nous utilisons l'API OpenAI de manière sécurisée pour générer les réponses.
              Les clés API sont stockées de manière sécurisée et ne sont jamais exposées
              côté client.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}