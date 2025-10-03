import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// CORS configuration
export const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Rate limiting
export const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General rate limiter
export const generalLimiter = createRateLimit(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  'Too many requests from this IP, please try again later.'
);

// Translation rate limiter (more restrictive)
export const translationLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  20, // 20 requests per 15 minutes
  'Too many translation requests, please try again later.'
);

// Security middleware
export const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
  cors(corsOptions)
];

// Input validation middleware
export const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Text validation rules
export const validateTranslationText = [
  body('text')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Text must be between 1 and 5000 characters')
    .escape(),
  body('targetLang')
    .isLength({ min: 2, max: 10 })
    .withMessage('Target language must be between 2 and 10 characters')
    .matches(/^[a-z]{2}(-[A-Z]{2})?$/)
    .withMessage('Invalid language code format'),
  validateInput
];

// File validation
export const validateFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'pdf,doc,docx,txt').split(',');
  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
  
  if (!allowedTypes.includes(fileExtension)) {
    return res.status(400).json({ 
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    });
  }

  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB
  if (req.file.size > maxSize) {
    return res.status(400).json({ 
      error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB` 
    });
  }

  next();
};

