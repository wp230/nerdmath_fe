import React, { useState, useEffect } from 'react';
import { ConceptBlocks } from '../ui/ConceptBlocks';
import { VocabCards } from '../ui/VocabCards';
import { PracticeProblems } from '../ui/PracticeProblems';
import { ExitWarningModal } from '../ui/ExitWarningModal';
import { useLearningData } from '@/hooks/learning/useLearningData';
import { LearningProgress } from '@/types/learning';

interface ConceptLearningProps {
  unitId: string;
  chapterTitle: string;
  onExit: () => void;
  onComplete: () => void;
}

export const ConceptLearning: React.FC<ConceptLearningProps> = ({
  unitId,
  chapterTitle,
  onExit,
  onComplete,
}) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingExit, setPendingExit] = useState(false);

  const {
    learningData,
    learningProgress,
    isLoading,
    error,
    updateProgress,
    completeSection,
    completeLearning,
  } = useLearningData(unitId);

  // 진행률 상태 관리
  const [localProgress, setLocalProgress] = useState<LearningProgress>({
    conceptProgress: 0,
    vocabProgress: 0,
    practiceProgress: 0,
    overallProgress: 0,
    status: 'not_started',
  });

  // 서버 진행률과 로컬 진행률 동기화
  useEffect(() => {
    if (learningProgress) {
      setLocalProgress(learningProgress);
    }
  }, [learningProgress]);

  // 진행률 업데이트 함수
  const handleProgressUpdate = (
    section: 'concept' | 'vocab' | 'practice',
    progress: number
  ) => {
    setLocalProgress((prev) => {
      const updated = { ...prev };
      updated[`${section}Progress`] = progress;

      // 전체 진행률 계산 (가중 평균)
      const totalProgress = Math.round(
        updated.conceptProgress * 0.45 +
          updated.vocabProgress * 0.35 +
          updated.practiceProgress * 0.2
      );

      updated.overallProgress = totalProgress;

      // 상태 업데이트
      if (totalProgress === 100) {
        updated.status = 'completed';
      } else if (totalProgress > 0) {
        updated.status = 'in_progress';
      } else {
        updated.status = 'not_started';
      }

      return updated;
    });

    // 서버에도 업데이트
    updateProgress(section, progress);
  };

  // 테스트용: 진행률을 100%로 강제 설정
  const handleTestProgress = () => {
    console.log('🧪 테스트: 진행률을 100%로 강제 설정');
    setLocalProgress({
      conceptProgress: 100,
      vocabProgress: 100,
      practiceProgress: 100,
      overallProgress: 100,
      status: 'completed',
    });
  };

  // 나가기 버튼 클릭 처리
  const handleExitClick = () => {
    if (localProgress.overallProgress > 0) {
      setShowExitModal(true);
    } else {
      onExit();
    }
  };

  // 경고 모달에서 나가기 확인
  const handleExitConfirm = () => {
    setShowExitModal(false);
    setPendingExit(true);
    // 진행 상태 초기화 (실제로는 서버에 저장하지 않음)
    setTimeout(() => {
      onExit();
    }, 100);
  };

  // 경고 모달 닫기
  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  // 학습 완료 처리
  const handleComplete = async () => {
    console.log('🎯 완료 버튼 클릭됨');
    try {
      console.log('📡 학습 완료 API 호출 시작');
      const result = await completeLearning();
      console.log('✅ 학습 완료 API 호출 성공:', result);
      console.log('🔄 onComplete 콜백 호출');
      onComplete();
    } catch (err) {
      console.error('❌ 학습 완료 API 호출 실패:', err);
      // 에러 처리 (사용자에게 알림 등)
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">학습 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            오류가 발생했습니다
          </h1>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!learningData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-4">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            학습 데이터를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 학습 정보가 존재하지 않습니다.
          </p>
          <button
            onClick={onExit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 콘텐츠 */}
      <main className="max-w-9xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 섹션1: 개념 블록 (45%) */}
          <div className="lg:col-span-6">
            <ConceptBlocks
              blocks={learningData.concept.blocks}
              onProgressUpdate={(progress) =>
                handleProgressUpdate('concept', progress)
              }
            />
          </div>

          {/* 섹션2: 어휘 카드 (25%) */}
          <div className="lg:col-span-3">
            <VocabCards
              vocabularies={learningData.vocab.vocabularies}
              onProgressUpdate={(progress) =>
                handleProgressUpdate('vocab', progress)
              }
            />
          </div>

          {/* 섹션3: 연습 문제 (25%) */}
          <div className="lg:col-span-3">
            <PracticeProblems
              problems={learningData.practice.problems}
              onProgressUpdate={(progress) =>
                handleProgressUpdate('practice', progress)
              }
            />
          </div>
        </div>
      </main>

      {/* 간단한 푸터 */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="space-y-4">
            {/* Unit ID 및 테스트 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {chapterTitle}
                  </h3>
                  <p className="text-sm text-gray-500">Unit ID: {unitId}</p>
                </div>
                <button
                  onClick={handleTestProgress}
                  className="bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600"
                >
                  🧪 테스트
                </button>
              </div>
            </div>

            {/* 기존 진행률 바 제거 */}

            {/* 액션 버튼들 (좌우 분할) */}
            <div className="flex items-center justify-between">
              {/* 좌측: 나가기 버튼 */}
              <button
                onClick={handleExitClick}
                className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 text-sm"
              >
                🚪 나가기
              </button>

              {/* 우측: 완료 버튼 */}
              <button
                onClick={handleComplete}
                disabled={localProgress.overallProgress < 100}
                className={`px-6 py-2 rounded text-sm font-medium ${
                  localProgress.overallProgress === 100
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {localProgress.overallProgress === 100 ? '🎯 완료' : '진행중'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 플로팅 챗봇 (향후 구현) */}
      <div className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
        <span className="text-2xl">💬</span>
      </div>

      {/* 중도 이탈 경고 모달 */}
      <ExitWarningModal
        isOpen={showExitModal}
        onClose={handleExitCancel}
        onConfirm={handleExitConfirm}
        type="concept"
        progress={localProgress.overallProgress}
        title="학습 중단 경고"
      />
    </div>
  );
};
