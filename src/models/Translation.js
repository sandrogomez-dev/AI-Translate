import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  translatedText: {
    type: String,
    required: true,
    trim: true
  },
  sourceLanguage: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  targetLanguage: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  sessionId: {
    type: String,
    required: true
  },
  translationContext: {
    type: String,
    enum: ['general', 'business', 'technical', 'casual', 'formal'],
    default: 'general'
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.8
  },
  processingTime: {
    type: Number,
    default: 0
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
translationSchema.index({ sessionId: 1 });
translationSchema.index({ userId: 1 });
translationSchema.index({ createdAt: -1 });
translationSchema.index({ sourceLanguage: 1, targetLanguage: 1 });

// Virtual for translation pair
translationSchema.virtual('languagePair').get(function() {
  return `${this.sourceLanguage}-${this.targetLanguage}`;
});

// Method to get translation statistics
translationSchema.statics.getStats = async function(sessionId) {
  const stats = await this.aggregate([
    { $match: { sessionId } },
    {
      $group: {
        _id: null,
        totalTranslations: { $sum: 1 },
        avgProcessingTime: { $avg: '$processingTime' },
        languagePairs: { $addToSet: '$languagePair' },
        totalCharacters: { $sum: { $strLenCP: '$originalText' } }
      }
    }
  ]);
  
  return stats[0] || {
    totalTranslations: 0,
    avgProcessingTime: 0,
    languagePairs: [],
    totalCharacters: 0
  };
};

export default mongoose.model('Translation', translationSchema);

