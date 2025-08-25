import React from 'react';
import { ProgressBar } from './ProgressBar';

interface ConceptHeaderProps {
  unitId: string;
  chapterTitle: string;
  progress: number;
  onExit: () => void;
}

export const ConceptHeader: React.FC<ConceptHeaderProps> = ({
  unitId,
  chapterTitle,
  progress,
  onExit,
}) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 소단원 정보 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {chapterTitle}
                </h1>
                <p className="text-sm text-gray-500">{unitId} 단원</p>
              </div>
            </div>
          </div>

          {/* 진행바 */}
          <div className="flex-1 max-w-md mx-8">
            <ProgressBar progress={progress} className="h-3" />
            <p className="text-sm text-gray-600 mt-1 text-center font-medium">
              {progress}% 완료
            </p>
          </div>

          {/* 나가기 버튼 */}
          <button
            onClick={onExit}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300 flex items-center gap-2"
          >
            <span>❌</span>
            <span>나가기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
