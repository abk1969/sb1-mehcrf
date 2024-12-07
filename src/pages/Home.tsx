import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Zap, Shield, Sparkles, Users, Bot } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F7C] to-[#0F172A] opacity-10" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.div 
            className="text-center space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn} className="space-y-4">
              <h1 className="text-6xl font-bold text-gray-900">
                Générez des réponses{' '}
                <span className="text-[#1C3F7C] relative">
                  intelligentes
                  <motion.div
                    className="absolute -right-8 -top-6"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Optimisez votre communication professionnelle grâce à notre assistant IA avancé.
                Réponses pertinentes, ton adapté, résultats immédiats.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="flex justify-center gap-4">
              <Link
                to="/generator"
                className="group relative inline-flex items-center px-8 py-4 rounded-lg bg-[#1C3F7C] text-white font-medium hover:bg-opacity-90 transition-colors overflow-hidden"
              >
                <span className="relative z-10">Commencer maintenant</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#34D399] to-[#1C3F7C]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <ArrowRight className="ml-2 relative z-10" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors border border-gray-200"
              >
                En savoir plus
              </Link>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="pt-12"
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt="Interface de l'application"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeIn} className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Une solution complète pour votre communication
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez comment notre IA peut transformer vos interactions professionnelles
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeIn}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F7C] to-[#34D399] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                  <div className="relative p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <feature.icon className="w-12 h-12 text-[#1C3F7C] mb-6" />
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center space-y-12"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ils nous font confiance
              </h2>
              <div className="flex justify-center items-center space-x-12">
                {['Microsoft', 'Google', 'Amazon', 'Meta'].map((company) => (
                  <span key={company} className="text-2xl font-bold text-gray-400">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md"
                >
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1C3F7C]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center text-white space-y-8"
          >
            <motion.h2 variants={fadeIn} className="text-4xl font-bold">
              Prêt à transformer votre communication ?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-200 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui optimisent déjà leurs interactions professionnelles
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                to="/generator"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-[#1C3F7C] font-medium hover:bg-gray-100 transition-colors"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Bot,
    title: 'IA Avancée',
    description: 'Utilise les derniers modèles d\'IA pour générer des réponses pertinentes et contextuelles.'
  },
  {
    icon: Zap,
    title: 'Réponses Instantanées',
    description: 'Générez des réponses professionnelles en quelques secondes.'
  },
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Vos données sont traitées de manière sécurisée et ne sont jamais stockées.'
  }
];

const testimonials = [
  {
    content: "L'outil parfait pour optimiser notre communication client. Nous avons gagné un temps précieux.",
    author: "Marie Laurent",
    role: "Responsable Communication"
  },
  {
    content: "La qualité des réponses générées est impressionnante. Un vrai gain de productivité.",
    author: "Thomas Dubois",
    role: "Chef de Projet"
  },
  {
    content: "Interface intuitive et résultats professionnels. Je recommande vivement.",
    author: "Sophie Martin",
    role: "Directrice Marketing"
  }
];