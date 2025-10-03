import React, { useState } from 'react';
import { Languages, Globe, Send, Loader2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../types/translation';
import { translationApi } from '../services/translationApi';

interface TranslationFormProps {
  onTranslation: (result: any) => void;
  onError: (error: string) => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({ onTranslation, onError }) => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [sourceLang, setSourceLang] = useState('auto');
  const [context, setContext] = useState<'general' | 'business' | 'technical' | 'casual' | 'formal'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      onError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await translationApi.translate({
        text: text.trim(),
        targetLang,
        sourceLang: sourceLang === 'auto' ? undefined : sourceLang,
        context
      });

      onTranslation(result.data);
      setText('');
    } catch (error: any) {
      onError(error.response?.data?.error || 'Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetectLanguage = async () => {
    if (!text.trim()) return;

    try {
      const result = await translationApi.detectLanguage(text);
      setDetectedLang(result.detectedLanguage);
    } catch (error) {
      console.error('Language detection failed:', error);
    }
  };

  const contextOptions = [
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'technical', label: 'Technical' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">AI Translation Hub</h2>
      </div>

      <form onSubmit={handleTranslate} className="space-y-4">
        {/* Text Input */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Text to Translate
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to translate..."
            className="input-field min-h-[100px] resize-none"
            disabled={isLoading}
          />
          {text && (
            <button
              type="button"
              onClick={handleDetectLanguage}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Detect Language
            </button>
          )}
          {detectedLang && (
            <p className="mt-1 text-sm text-gray-600">
              Detected: <span className="font-medium">{detectedLang}</span>
            </p>
          )}
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sourceLang" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              id="sourceLang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="input-field"
              disabled={isLoading}
            >
              <option value="auto">Auto-detect</option>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="targetLang" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              id="targetLang"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="input-field"
              disabled={isLoading}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Context Selection */}
        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            Translation Context
          </label>
          <select
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value as any)}
            className="input-field"
            disabled={isLoading}
          >
            {contextOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Translate
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TranslationForm;
