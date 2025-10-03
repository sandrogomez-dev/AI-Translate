import React, { useState, useEffect } from 'react';
import { History, Clock, Languages, Trash2 } from 'lucide-react';
import { TranslationHistory } from '../types/translation';
import { translationApi } from '../services/translationApi';

const TranslationHistory: React.FC = () => {
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const data = await translationApi.getHistory(20);
      setHistory(data);
    } catch (err: any) {
      setError('Failed to load translation history');
      console.error('History load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getLanguageName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Translation History</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Translation History</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadHistory}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Translation History</h3>
        </div>
        <button
          onClick={loadHistory}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No translations yet</p>
          <p className="text-sm">Start translating to see your history here</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Languages className="w-4 h-4" />
                  <span>{getLanguageName(item.sourceLanguage)} → {getLanguageName(item.targetLanguage)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Original:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{item.originalText}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Translation:</p>
                  <p className="text-sm text-gray-900 bg-primary-50 p-2 rounded">{item.translatedText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationHistory;
