import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Zap, Shield } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Générez des réponses professionnelles{' '}
            <span className="text-[#1C3F7C]">en un clic</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gagnez du temps et améliorez vos interactions sur Gmail, LinkedIn, Instagram et Twitter
            grâce à notre assistant IA intelligent.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/generator"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#1C3F7C] text-white font-medium hover:bg-opacity-90 transition-colors"
            >
              Commencer maintenant
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Globacom3000Reply ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-50">
              <MessageSquare className="w-12 h-12 text-[#1C3F7C] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Réponses intelligentes</h3>
              <p className="text-gray-600">
                Notre IA génère des réponses contextuelles et pertinentes adaptées à chaque plateforme.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <Zap className="w-12 h-12 text-[#34D399] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ultra rapide</h3>
              <p className="text-gray-600">
                Générez des réponses en quelques secondes et gagnez un temps précieux.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <Shield className="w-12 h-12 text-[#1C3F7C] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
              <p className="text-gray-600">
                Vos données sont traitées de manière sécurisée et ne sont jamais stockées.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}