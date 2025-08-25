'use client';

import React, { useState, use } from 'react';
import { ConceptLearning } from '../../../../components/learning/containers/ConceptLearning';
import { LearningModeSelector } from '../../../../components/learning/containers/LearningModeSelector';
import { ConceptCompletionModal } from '../../../../components/learning/ui/ConceptCompletionModal';
import { PracticeMode } from '../../../../components/learning/containers/PracticeMode';
import { ConceptLearningResult } from '../../../../types/learning';
import * as LearningServiceModule from '../../../../service/learning/learningService';
import { useChapterData } from '../../../../hooks/math/useChapterData';
import { useUnitData } from '../../../../hooks/math/useUnitData';

interface ChapterLearningPageProps {
  params: Promise<{
    unitId: string;
    chapterId: string;
  }>;
}

type LearningStep = 'mode-select' | 'concept' | 'problem' | 'complete';

export default function ChapterLearningPage({
  params,
}: ChapterLearningPageProps) {
  const { unitId, chapterId } = use(params);
  const [currentStep, setCurrentStep] = useState<LearningStep>('mode-select');
  const [selectedMode, setSelectedMode] = useState<
    'concept' | 'problem' | null
  >(null);
  const [conceptResult, setConceptResult] =
    useState<ConceptLearningResult | null>(null);

  // 대단원과 소단원 데이터 로드
  const {
    unitData,
    isLoading: unitLoading,
    error: unitError,
  } = useUnitData(unitId);
  const {
    chapters,
    isLoading: chaptersLoading,
    error: chaptersError,
  } = useChapterData(unitId);

  // 현재 소단원 정보 찾기
  const currentChapter = chapters.find(
    (ch) => ch.chapter.toString() === chapterId
  );
  const isLoading = unitLoading || chaptersLoading;
  const error = unitError || chaptersError;

  const handleModeSelect = (mode: 'concept' | 'problem') => {
    setSelectedMode(mode);
    if (mode === 'concept') {
      setCurrentStep('concept');
    } else {
      setCurrentStep('problem');
    }
  };

  const handleConceptComplete = async () => {
    try {
      console.log('🎯 개념 학습 완료 처리 시작', { unitId, chapterId });

      // conceptId 생성 (unitId와 chapterId 조합)
      const conceptId = `${unitId}_${chapterId}`;

      // 올바른 메서드 호출
      const result =
        await LearningServiceModule.LearningService.completeConcept(
          unitId,
          conceptId
        );

      console.log('✅ 개념 학습 완료 API 호출 성공:', result);
      setConceptResult(result);
      setCurrentStep('complete');
    } catch (error) {
      console.error('❌ 개념 학습 완료 처리 실패:', error);
    }
  };

  const handleProblemComplete = () => {
    setCurrentStep('complete');
  };

  const handleExit = () => {
    setCurrentStep('mode-select');
    setSelectedMode(null);
  };

  const handleRestart = () => {
    setCurrentStep('mode-select');
    setSelectedMode(null);
    setConceptResult(null);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">학습 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !currentChapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            {error ? '오류가 발생했습니다' : '소단원을 찾을 수 없습니다'}
          </h1>
          <p className="text-red-600 mb-6">
            {error || '요청하신 소단원 정보가 존재하지 않습니다.'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    );
  }

  // 완료 화면에서 Step 1 결과 모달 표시
  if (currentStep === 'complete' && conceptResult) {
    return (
      <ConceptCompletionModal
        result={conceptResult}
        onGoToDashboard={() => (window.location.href = '/dashboard')}
        onGoToProblemSolving={() => setCurrentStep('problem')}
      />
    );
  }

  // 개념 학습
  if (currentStep === 'concept') {
    return (
      <ConceptLearning
        unitId={unitId}
        chapterTitle={currentChapter.title}
        onExit={handleExit}
        onComplete={handleConceptComplete}
      />
    );
  }

  // 문제 풀이 (Step 2)
  if (currentStep === 'problem') {
    return (
      <PracticeMode
        unitId={unitId}
        onComplete={handleProblemComplete}
        onExit={handleExit}
      />
    );
  }

  // 학습 모드 선택 (기본)
  return (
    <LearningModeSelector unitId={unitId} onModeSelect={handleModeSelect} />
  );
}
