import React, { useState, useEffect } from 'react';
import { Cog, Key, Bot, Database, Info } from 'lucide-react';
import { ModelSelector } from '../components/ModelSelector';
import { ApiKeyInput } from '../components/ApiKeyInput';
import { Tooltip } from '../components/Tooltip';
import { SecurityBadge } from '../components/SecurityBadge';
import { useApiKey } from '../hooks/useApiKey';
import { toast } from 'sonner';
import clsx from 'clsx';

interface Settings {
  apiKey: string;
  model: {
    selected: string;
    temperature: number;
  };
  knowledge: {
    files: string[];
  };
}

const initialSettings: Settings = {
  apiKey: '',
  model: {
    selected: 'gpt-4',
    temperature: 0.7,
  },
  knowledge: {
    files: [],
  },
};

const sections = [
  {
    id: 'api',
    icon: Key,
    label: 'Clé API',
    description: 'Configurez votre clé API OpenAI',
  },
  {
    id: 'model',
    icon: Bot,
    label: 'Modèle IA',
    description: 'Choisissez et configurez votre modèle',
  },
  {
    id: 'knowledge',
    icon: Database,
    label: 'Base de connaissances',
    description: 'Gérez vos documents de référence',
  },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState('api');
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { getApiKey, setApiKey } = useApiKey();

  useEffect(() => {
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setSettings(prev => ({
        ...prev,
        apiKey: savedApiKey
      }));
    }
  }, [getApiKey]);

  const handleApiKeyChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      apiKey: value
    }));
  };

  const handleApiKeySave = async () => {
    if (!settings.apiKey) {
      toast.error('Veuillez entrer une clé API');
      return;
    }

    setIsSaving(true);
    try {
      await setApiKey(settings.apiKey);
      toast.success('Clé API sauvegardée avec succès');
    } catch (error) {
      console.error('Error saving API key:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erreur lors de la sauvegarde de la clé API');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const renderSectionContent = (section: string) => {
    switch (section) {
      case 'api':
        return (
          <ApiKeyInput
            value={settings.apiKey}
            onChange={handleApiKeyChange}
            onSave={handleApiKeySave}
            isLoading={isSaving}
          />
        );

      case 'model':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Info size={16} className="text-[#1C3F7C]" />
                <p>Choisissez le modèle qui correspond le mieux à vos besoins</p>
              </div>
            </div>
            <ModelSelector
              selectedModel={settings.model.selected}
              onModelSelect={(model) =>
                setSettings({
                  ...settings,
                  model: { ...settings.model, selected: model },
                })
              }
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Température (Créativité)
                </label>
                <Tooltip content="Une température plus élevée rend les réponses plus créatives mais moins précises">
                  <div>
                    <Cog size={16} className="text-gray-400" />
                  </div>
                </Tooltip>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.model.temperature}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    model: { ...settings.model, temperature: parseFloat(e.target.value) },
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Précis</span>
                <span>Créatif</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Valeur actuelle : {settings.model.temperature}
              </p>
            </div>
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Info size={16} className="text-[#1C3F7C]" />
                <p>Les documents ajoutés permettront d'enrichir le contexte pour des réponses plus pertinentes</p>
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Database size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-4">
                Déposez vos fichiers PDF ici ou{' '}
                <button className="text-[#1C3F7C] hover:underline">parcourez</button>
              </p>
              <SecurityBadge type="data-privacy" />
            </div>
            {settings.knowledge.files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers importés</h4>
                <ul className="space-y-2">
                  {settings.knowledge.files.map((file) => (
                    <li
                      key={file}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">{file}</span>
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            knowledge: {
                              files: settings.knowledge.files.filter((f) => f !== file),
                            },
                          })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64">
          <nav className="space-y-1">
            {sections.map(({ id, icon: Icon, label, description }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={clsx(
                  'w-full flex items-start p-3 rounded-lg transition-colors',
                  activeSection === id
                    ? 'bg-[#1C3F7C] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon size={20} className="mr-3 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium">{label}</div>
                  <div className={clsx(
                    'text-sm',
                    activeSection === id ? 'text-gray-200' : 'text-gray-500'
                  )}>
                    {description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-lg p-6 shadow-sm">
          <div className="max-w-2xl">
            {renderSectionContent(activeSection)}
          </div>
        </main>
      </div>
    </div>
  );
}