import express from 'express';
import {
  translateText,
  translateMultiple,
  detectLanguage,
  getTranslationHistory,
  getTranslationStats
} from '../controllers/translationController.js';
import {
  validateTranslationText,
  translationLimiter
} from '../middleware/security.js';

const router = express.Router();

// Translation routes with rate limiting and validation
router.post('/translate', translationLimiter, validateTranslationText, translateText);
router.post('/translate-multiple', translationLimiter, translateMultiple);
router.post('/detect-language', detectLanguage);
router.get('/history', getTranslationHistory);
router.get('/stats', getTranslationStats);

export default router;

