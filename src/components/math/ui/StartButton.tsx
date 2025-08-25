import React from 'react';
import { ChapterData } from '../../../types/math';

interface StartButtonProps {
  chapter: ChapterData | null;
  onStart: (chapter: ChapterData) => void;
  disabled?: boolean;
}

export const StartButton: React.FC<StartButtonProps> = ({ 
  chapter, 
  onStart, 
  disabled = false 
}) => {
  const handleClick = () => {
    if (chapter && !disabled) {
      onStart(chapter);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!chapter || disabled}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
        ${chapter && !disabled
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
      `}
    >
      {chapter ? (
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">🚀</span>
          <span>{chapter.title} 시작하기</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">📚</span>
          <span>소단원을 선택해주세요</span>
        </div>
      )}
    </button>
  );
};
