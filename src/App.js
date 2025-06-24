import React, { useState } from 'react';
import { Send, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [idea, setIdea] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Ici on appellera ton webhook N8N
      // Pour l'instant, simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulation d'un post généré
      const mockPost = `🚀 ${idea}

Cette idée m'inspire vraiment ! Voici pourquoi je pense que c'est important :

✨ Premier point clé qui ressort
💡 Deuxième insight intéressant
🎯 Application pratique

Et vous, qu'en pensez-vous ? Partagez votre expérience en commentaire !

#LinkedIn #Innovation #Partage #Réflexion`;
      
      setGeneratedPost(mockPost);
    } catch (err) {
      setError('Erreur lors de la génération. Réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Erreur de copie:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Créateur de Posts LinkedIn
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transformez vos idées en posts LinkedIn engageants
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quelle est votre idée ?
          </label>
          <div className="flex gap-3">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: L'importance de la formation continue dans le développement professionnel..."
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={!idea.trim() || isLoading}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
              {isLoading ? 'Génération...' : 'Générer'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Generated Post Section */}
        {generatedPost && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Votre post LinkedIn
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check size={16} />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copier
                  </>
                )}
              </button>
            </div>
            
            {/* Post Preview */}
            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {generatedPost}
              </div>
            </div>
            
            {/* Stats simulation */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>📊 Longueur optimale pour LinkedIn</span>
                <span>🏷️ Hashtags inclus</span>
                <span>💬 Call-to-action ajouté</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Propulsé par IA • Connecté à Airtable • Orchestré par N8N</p>
        </div>
      </div>
    </div>
  );
}

export default App;