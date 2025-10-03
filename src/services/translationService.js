import OpenAI from 'openai';
import Translation from '../models/Translation.js';

class TranslationService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async translateText(text, targetLang, options = {}) {
    const startTime = Date.now();
    
    try {
      const {
        sourceLang = 'auto',
        context = 'general',
        sessionId = 'anonymous',
        userId = null
      } = options;

      // Demo mode - return mock translation
      if (process.env.NODE_ENV === 'demo' || !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('test')) {
        const mockTranslations = {
          'en': `[DEMO] Translated to English: "${text}"`,
          'es': `[DEMO] Traducido al español: "${text}"`,
          'fr': `[DEMO] Traduit en français: "${text}"`,
          'de': `[DEMO] Auf Deutsch übersetzt: "${text}"`,
          'it': `[DEMO] Tradotto in italiano: "${text}"`,
          'pt': `[DEMO] Traduzido para português: "${text}"`,
          'zh': `[DEMO] 翻译成中文: "${text}"`,
          'ja': `[DEMO] 日本語に翻訳: "${text}"`,
          'ko': `[DEMO] 한국어로 번역: "${text}"`,
          'ru': `[DEMO] Переведено на русский: "${text}"`,
          'ar': `[DEMO] مترجم إلى العربية: "${text}"`,
          'hi': `[DEMO] हिंदी में अनुवादित: "${text}"`
        };

        const translatedText = mockTranslations[targetLang] || `[DEMO] Translated to ${targetLang}: "${text}"`;
        const processingTime = Date.now() - startTime;
        const detectedSourceLang = sourceLang === 'auto' ? 'en' : sourceLang;

        console.log(`📝 Demo translation: ${text} → ${translatedText}`);

        return {
          translatedText,
          sourceLanguage: detectedSourceLang,
          targetLanguage: targetLang,
          processingTime,
          confidence: 0.8,
          translationId: `demo_${Date.now()}`
        };
      }

      // Create system prompt based on context
      const systemPrompt = this.createSystemPrompt(context);
      
      // Create user prompt
      const userPrompt = this.createUserPrompt(text, targetLang, sourceLang);

      // Call OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        response_format: { type: 'text' }
      });

      const translatedText = completion.choices[0].message.content.trim();
      const processingTime = Date.now() - startTime;

      // Detect source language if auto
      const detectedSourceLang = sourceLang === 'auto' 
        ? await this.detectLanguage(text) 
        : sourceLang;

      // Save translation to database
      const translation = new Translation({
        originalText: text,
        translatedText,
        sourceLanguage: detectedSourceLang,
        targetLanguage: targetLang,
        userId,
        sessionId,
        translationContext: context,
        processingTime,
        metadata: {
          userAgent: options.userAgent,
          ipAddress: options.ipAddress
        }
      });

      await translation.save();

      return {
        translatedText,
        sourceLanguage: detectedSourceLang,
        targetLanguage: targetLang,
        processingTime,
        confidence: 0.9,
        translationId: translation._id
      };

    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Translation failed. Please try again.');
    }
  }

  async translateMultiple(text, targetLangs, options = {}) {
    const translations = await Promise.all(
      targetLangs.map(lang => 
        this.translateText(text, lang, options)
      )
    );

    return translations;
  }

  async detectLanguage(text) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a language detection expert. Respond only with the ISO 639-1 language code (e.g., "en", "es", "fr").'
          },
          {
            role: 'user',
            content: `Detect the language of this text: "${text}"`
          }
        ],
        max_tokens: 10,
        temperature: 0
      });

      return completion.choices[0].message.content.trim().toLowerCase();
    } catch (error) {
      console.error('Language detection error:', error);
      return 'unknown';
    }
  }

  createSystemPrompt(context) {
    const basePrompt = 'You are a professional translator with expertise in multiple languages.';
    
    const contextPrompts = {
      general: 'Provide accurate, natural translations that maintain the original meaning and tone.',
      business: 'Focus on professional, formal language appropriate for business communications.',
      technical: 'Maintain technical accuracy and use appropriate terminology for the field.',
      casual: 'Use informal, conversational language that sounds natural.',
      formal: 'Use formal, respectful language appropriate for official documents.'
    };

    return `${basePrompt} ${contextPrompts[context] || contextPrompts.general}`;
  }

  createUserPrompt(text, targetLang, sourceLang) {
    if (sourceLang === 'auto') {
      return `Translate the following text to ${targetLang}:\n\n${text}\n\nTranslation:`;
    }
    
    return `Translate the following text from ${sourceLang} to ${targetLang}:\n\n${text}\n\nTranslation:`;
  }

  async getTranslationHistory(sessionId, limit = 50) {
    return await Translation.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('originalText translatedText sourceLanguage targetLanguage createdAt');
  }

  async getTranslationStats(sessionId) {
    return await Translation.getStats(sessionId);
  }
}

export default new TranslationService();

