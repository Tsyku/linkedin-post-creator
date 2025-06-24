import React, { useState } from 'react';
import { Send, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState('professionnel');
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
      
      // Adaptation du ton selon la sélection
      let tonePrefix = '';
      let toneStyle = '';
      switch(tone) {
        case 'professionnel':
          tonePrefix = '🚀';
          toneStyle = 'Cette approche stratégique mérite réflexion.';
          break;
        case 'inspirant':
          tonePrefix = '✨';
          toneStyle = 'Cette idée peut transformer votre perspective !';
          break;
        case 'personnel':
          tonePrefix = '💭';
          toneStyle = 'Je voulais partager cette réflexion avec vous.';
          break;
        case 'expert':
          tonePrefix = '🎯';
          toneStyle = 'Voici une analyse approfondie de cette problématique.';
          break;
        default:
          tonePrefix = '🚀';
          toneStyle = 'Cette approche stratégique mérite réflexion.';
      }
      
      // Simulation d'un post généré
      const mockPost = `${tonePrefix} ${idea}

${toneStyle} Voici pourquoi je pense que c'est important :

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Créateur de Posts LinkedIn
            </h1>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Transformez vos idées en posts LinkedIn engageants avec l'intelligence artificielle
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                💡 Quelle est votre idée ?
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: L'importance de la formation continue dans le développement professionnel..."
                className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none h-32 transition-all duration-300 text-white placeholder-gray-300 hover:bg-white/25"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                🎭 Ton du post
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white hover:bg-white/25 transition-all duration-300"
                disabled={isLoading}
              >
                <option value="professionnel" className="bg-slate-800">🚀 Professionnel</option>
                <option value="inspirant" className="bg-slate-800">✨ Inspirant</option>
                <option value="personnel" className="bg-slate-800">💭 Personnel</option>
                <option value="expert" className="bg-slate-800">🎯 Expert</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!idea.trim() || isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Send size={24} />
              )}
              {isLoading ? 'Génération en cours...' : 'Générer le post'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-300 text-center font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Generated Post Section */}
        {generatedPost && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-slideIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                ✨ Votre post LinkedIn
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
              >
                {isCopied ? (
                  <>
                    <Check size={18} />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copier
                  </>
                )}
              </button>
            </div>
            
            {/* Post Preview */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-400 hover:bg-white/25 transition-all duration-300">
              <div className="whitespace-pre-wrap text-white leading-relaxed text-lg">
                {generatedPost}
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <span>📊</span>
                  <span>Longueur optimale</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <span>🏷️</span>
                  <span>Hashtags inclus</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <span>💬</span>
                  <span>Call-to-action ajouté</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-lg">
            Propulsé par <span className="text-blue-400 font-semibold">IA</span> • 
            Connecté à <span className="text-purple-400 font-semibold">Airtable</span> • 
            Orchestré par <span className="text-pink-400 font-semibold">N8N</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;