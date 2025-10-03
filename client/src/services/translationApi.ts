import axios from 'axios';
import { TranslationRequest, TranslationResponse, MultipleTranslationRequest, TranslationHistory, TranslationStats } from '../types/translation';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const translationApi = {
  // Translate single text
  translate: async (request: TranslationRequest): Promise<TranslationResponse> => {
    const response = await api.post('/translation/translate', request);
    return response.data;
  },

  // Translate to multiple languages
  translateMultiple: async (request: MultipleTranslationRequest): Promise<TranslationResponse[]> => {
    const response = await api.post('/translation/translate-multiple', request);
    return response.data.data;
  },

  // Detect language
  detectLanguage: async (text: string): Promise<{ detectedLanguage: string; confidence: number }> => {
    const response = await api.post('/translation/detect-language', { text });
    return response.data.data;
  },

  // Get translation history
  getHistory: async (limit: number = 50): Promise<TranslationHistory[]> => {
    const response = await api.get(`/translation/history?limit=${limit}`);
    return response.data.data;
  },

  // Get translation statistics
  getStats: async (): Promise<TranslationStats> => {
    const response = await api.get('/translation/stats');
    return response.data.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string; uptime: number }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default translationApi;
