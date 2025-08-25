import React, { useState } from 'react';
import { Vocabulary } from '@/types/voca';

interface VocabCardProps {
  vocab: Vocabulary;
  showDetails?: boolean;
}

export const VocabCard: React.FC<VocabCardProps> = ({
  vocab,
  showDetails = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-48">
      <div
        className={`relative w-full h-full transition-all duration-500 cursor-pointer ${
          isFlipped ? 'transform rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 앞면 - 영어 단어 */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {vocab.word}
            </h3>

            {vocab.imageUrl && (
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src={vocab.imageUrl}
                  alt={vocab.word}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-sm text-gray-500">클릭하여 뜻 보기</p>
          </div>
        </div>

        {/* 뒷면 - 한글 뜻과 어원 */}
        <div
          className="absolute inset-0 w-full h-full bg-indigo-50 rounded-lg shadow-md border border-indigo-200 p-6 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <h4 className="text-xl font-semibold text-indigo-800 mb-3">
              {vocab.meaning}
            </h4>

            <div className="text-sm text-indigo-600 mb-4">
              <p className="font-medium">어원:</p>
              <p>{vocab.etymology}</p>
            </div>

            {showDetails && vocab.totalAttempts !== undefined && (
              <div className="text-xs text-indigo-500 space-y-1">
                <p>시도 횟수: {vocab.totalAttempts}</p>
                <p>정답률: {((vocab.accuracy || 0) * 100).toFixed(1)}%</p>
                {vocab.lastAttempted && (
                  <p>
                    마지막 학습:{' '}
                    {new Date(vocab.lastAttempted).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <p className="text-xs text-indigo-400 mt-2">
              다시 클릭하여 단어 보기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
