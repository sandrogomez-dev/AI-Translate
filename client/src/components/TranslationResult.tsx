import React from 'react';
import { Copy, CheckCircle, Clock, Zap } from 'lucide-react';

interface TranslationResultProps {
  result: {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    processingTime: number;
    confidence: number;
  };
  onCopy: (text: string) => void;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ result, onCopy }) => {
  const formatTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.7) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Translation Result</h3>
      </div>

      <div className="space-y-4">
        {/* Translation Text */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Translation</label>
            <button
              onClick={() => onCopy(result.translatedText)}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-gray-900 leading-relaxed">{result.translatedText}</p>
          </div>
        </div>

        {/* Translation Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Languages</span>
            </div>
            <p className="text-sm text-gray-600">
              {result.sourceLanguage} → {result.targetLanguage}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Processing Time</span>
            </div>
            <p className="text-sm text-gray-600">{formatTime(result.processingTime)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Confidence</span>
            </div>
            <p className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
              {getConfidenceText(result.confidence)} ({(result.confidence * 100).toFixed(0)}%)
            </p>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((result.processingTime / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600">
              {result.processingTime < 1000 ? 'Fast' : result.processingTime < 3000 ? 'Good' : 'Slow'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationResult;
