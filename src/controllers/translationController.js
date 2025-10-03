import translationService from '../services/translationService.js';

export const translateText = async (req, res) => {
  try {
    const { text, targetLang, sourceLang = 'auto', context = 'general' } = req.body;
    const sessionId = req.sessionID || req.ip;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip;

    const result = await translationService.translateText(text, targetLang, {
      sourceLang,
      context,
      sessionId,
      userAgent,
      ipAddress
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Translation controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Translation failed'
    });
  }
};

export const translateMultiple = async (req, res) => {
  try {
    const { text, targetLangs, sourceLang = 'auto', context = 'general' } = req.body;
    const sessionId = req.sessionID || req.ip;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip;

    if (!Array.isArray(targetLangs) || targetLangs.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'targetLangs must be a non-empty array'
      });
    }

    if (targetLangs.length > 5) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 5 target languages allowed'
      });
    }

    const results = await translationService.translateMultiple(text, targetLangs, {
      sourceLang,
      context,
      sessionId,
      userAgent,
      ipAddress
    });

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Multiple translation controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Translation failed'
    });
  }
};

export const detectLanguage = async (req, res) => {
  try {
    const { text } = req.body;
    const detectedLang = await translationService.detectLanguage(text);

    res.json({
      success: true,
      data: {
        detectedLanguage: detectedLang,
        confidence: 0.9
      }
    });

  } catch (error) {
    console.error('Language detection controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Language detection failed'
    });
  }
};

export const getTranslationHistory = async (req, res) => {
  try {
    const sessionId = req.sessionID || req.ip;
    const { limit = 50 } = req.query;

    const history = await translationService.getTranslationHistory(sessionId, parseInt(limit));

    res.json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error('History controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve translation history'
    });
  }
};

export const getTranslationStats = async (req, res) => {
  try {
    const sessionId = req.sessionID || req.ip;
    const stats = await translationService.getTranslationStats(sessionId);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Stats controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve translation statistics'
    });
  }
};

