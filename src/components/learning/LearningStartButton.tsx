'use client';

import React from 'react';

interface LearningStartButtonProps {
  isEnabled: boolean;
  onStart: () => void;
  selectedUnitTitle?: string;
  selectedChapterTitle?: string;
}

export const LearningStartButton: React.FC<LearningStartButtonProps> = ({
  isEnabled,
  onStart,
  selectedUnitTitle,
  selectedChapterTitle,
}) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="text-center">
        {selectedUnitTitle && selectedChapterTitle ? (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              선택된 학습 단원
            </h3>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{selectedUnitTitle}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{selectedChapterTitle}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">학습할 단원을 선택해주세요</p>
        )}

        <button
          onClick={onStart}
          disabled={!isEnabled}
          className={`
            px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200
            ${
              isEnabled
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isEnabled ? '개념 학습하기' : '단원을 선택해주세요'}
        </button>

        {isEnabled && (
          <p className="text-xs text-gray-500 mt-2">
            개념 학습 완료 후 문제 풀이로 자동 진행됩니다
          </p>
        )}
      </div>
    </div>
  );
};
