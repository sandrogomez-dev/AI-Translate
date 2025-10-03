export interface TranslationRequest {
  text: string;
  targetLang: string;
  sourceLang?: string;
  context?: 'general' | 'business' | 'technical' | 'casual' | 'formal';
}

export interface TranslationResponse {
  success: boolean;
  data: {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    processingTime: number;
    confidence: number;
    translationId: string;
  };
}

export interface MultipleTranslationRequest {
  text: string;
  targetLangs: string[];
  sourceLang?: string;
  context?: 'general' | 'business' | 'technical' | 'casual' | 'formal';
}

export interface TranslationHistory {
  _id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
}

export interface TranslationStats {
  totalTranslations: number;
  avgProcessingTime: number;
  languagePairs: string[];
  totalCharacters: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];
