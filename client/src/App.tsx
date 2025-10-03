import React, { useState, useEffect } from 'react';
import { Globe, History, BarChart3, AlertCircle } from 'lucide-react';
import TranslationForm from './components/TranslationForm';
import TranslationResult from './components/TranslationResult';
import TranslationHistory from './components/TranslationHistory';
import { translationApi } from './services/translationApi';

interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  processingTime: number;
  confidence: number;
}

function App() {
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkServerStatus();
    
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkServerStatus = async () => {
    try {
      await translationApi.healthCheck();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
    }
  };

  const handleTranslation = (result: TranslationResult) => {
    setTranslationResult(result);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTranslationResult(null);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return 'text-red-600';
    if (serverStatus === 'offline') return 'text-red-600';
    if (serverStatus === 'checking') return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (serverStatus === 'offline') return 'Server Offline';
    if (serverStatus === 'checking') return 'Checking...';
    return 'Online';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Translation Hub</h1>
                <p className="text-sm text-gray-600">Advanced AI-powered translation platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Translation Form */}
          <div className="lg:col-span-2">
            <TranslationForm 
              onTranslation={handleTranslation}
              onError={handleError}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Translation Result */}
            {translationResult && (
              <TranslationResult 
                result={translationResult}
                onCopy={handleCopy}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="card border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Error</h3>
                </div>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Translation History */}
            <TranslationHistory />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Translation Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of AI-powered translation with advanced features
              and professional-grade accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">50+ Languages</h3>
              <p className="text-gray-600">
                Support for major world languages with automatic detection and context-aware translation.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
              <p className="text-gray-600">
                Track your translation history, performance metrics, and usage statistics.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <History className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Awareness</h3>
              <p className="text-gray-600">
                Choose from business, technical, casual, or formal translation contexts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold">AI Translation Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced AI-powered translation platform built with modern technologies
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span>Built with React + TypeScript</span>
              <span>•</span>
              <span>Powered by OpenAI</span>
              <span>•</span>
              <span>Secured with modern practices</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;