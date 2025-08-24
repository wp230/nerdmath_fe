'use client';

import React from 'react';
import { useUnitSelection } from '../../hooks/useLearning';
import { GradeSelector } from './GradeSelector';
import { ChapterList } from './ChapterList';
import { LearningStartButton } from './LearningStartButton';

interface UnitSelectionContainerProps {
  unitId: string;
}

export const UnitSelectionContainer: React.FC<UnitSelectionContainerProps> = ({
  unitId,
}) => {
  const {
    unit,
    chapters,
    unitGradeInfo,
    loading,
    error,
    selectedGrade,
    selectedChapter,
    chaptersByGrade,
    availableGrades,
    setSelectedGrade,
    setSelectedChapter,
    startLearning,
  } = useUnitSelection(unitId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">단원 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!unit || !unitGradeInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600">단원을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const selectedChapterInfo = chaptersByGrade.find(
    (c) => c.chapter === selectedChapter
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 단원 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{unit.title}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {unit.description}
        </p>
      </div>

      {/* 학년 선택 */}
      <GradeSelector
        availableGrades={availableGrades}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
      />

      {/* 소단원 목록 */}
      <ChapterList
        chapters={chaptersByGrade}
        selectedChapter={selectedChapter}
        onChapterSelect={setSelectedChapter}
      />

      {/* 학습 시작 버튼 */}
      <LearningStartButton
        isEnabled={!!selectedChapter}
        onStart={startLearning}
        selectedUnitTitle={unit.title}
        selectedChapterTitle={selectedChapterInfo?.title}
      />

      {/* 선택된 단원 정보 요약 */}
      {selectedChapterInfo && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">선택된 단원 정보</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">대단원:</span> {unit.title}
            </div>
            <div>
              <span className="font-medium">소단원:</span>{' '}
              {selectedChapterInfo.title}
            </div>
            <div>
              <span className="font-medium">학년:</span> {selectedGrade}학년
            </div>
            <div>
              <span className="font-medium">단원 번호:</span>{' '}
              {selectedChapterInfo.chapter}단원
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
