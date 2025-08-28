'use client';

import { useEffect } from 'react';
import { useProblemStore } from '@/stores/problem.store';
import { useAuthStore } from '@/stores/auth.store';
import ProblemContent from './ProblemContent';
import AnswerChoices from './AnswerChoices';
import ProgressBar from './ProgressBar';
import ProblemNavigation from './ProblemNavigation';
import AnswerResult from './AnswerResult';
import ProblemComplete from './ProblemComplete';
import ProblemSkeleton from './ProblemSkeleton';
import { FullScreenError } from '@/components/common/FullScreenError';

interface ProblemViewerProps {
  unitId: string;
  chapterId: string;
  onSubmitAnswer: () => void;
  onNextProblem: () => void;
  onPreviousProblem: () => void;
  canSubmit: boolean;
  canNext: boolean;
  isSubmitting?: boolean;
}

const ProblemViewer: React.FC<ProblemViewerProps> = ({
  unitId,
  chapterId,
  onSubmitAnswer,
  onNextProblem,
  onPreviousProblem,
  canSubmit,
  canNext,
  isSubmitting = false,
}) => {
  const { user } = useAuthStore();
  const {
    currentSession,
    currentProblem,
    answerState,
    isLoading,
    error,
    isSessionComplete,
    clearSession,
  } = useProblemStore();

  // 세션 복구 시도
  useEffect(() => {
    const restored = useProblemStore.getState().hydrateFromSession();

    // 복구된 세션이 현재 unitId와 다르면 클리어
    if (restored && currentSession?.unitId !== unitId) {
      clearSession();
    }
  }, [unitId, currentSession?.unitId, clearSession]);

  // 에러 처리
  if (error) {
    return (
      <FullScreenError
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // 로딩 상태
  if (isLoading || !currentSession) {
    return <ProblemSkeleton />;
  }

  // 세션 완료 상태
  if (isSessionComplete()) {
    return (
      <ProblemComplete unitId={unitId} progress={currentSession.progress} />
    );
  }

  // 문제가 없는 경우 (완료된 상태)
  if (!currentProblem) {
    return (
      <ProblemComplete unitId={unitId} progress={currentSession.progress} />
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          단원 {unitId} - 챕터 {chapterId}
        </h1>
        <p className="text-gray-600">문제 풀이를 통해 실력을 향상시켜보세요.</p>
      </div>

      {/* 진행률 바 */}
      <ProgressBar
        current={currentSession.progress.completed}
        total={currentSession.progress.total}
        percentage={currentSession.progress.percentage}
      />

      {/* 문제 카드 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* 문제 내용 */}
        <ProblemContent
          problem={currentProblem}
          currentIndex={currentSession.currentIndex}
          totalProblems={currentSession.progress.total}
        />

        {/* 답안 선택지 */}
        <AnswerChoices
          choices={currentProblem.content.choices}
          selectedAnswer={answerState.selectedAnswer}
          isSubmitted={answerState.isSubmitted}
          correctAnswer={
            answerState.result?.isCorrect ? answerState.selectedAnswer : null
          }
          disabled={answerState.isSubmitted}
        />

        {/* 답안 결과 (제출 후 표시) */}
        {answerState.result && (
          <AnswerResult result={answerState.result} className="mt-6" />
        )}

        {/* 네비게이션 버튼 */}
        <ProblemNavigation
          canSubmit={canSubmit && !isSubmitting}
          canNext={canNext}
          isFirstProblem={currentSession.currentIndex === 0}
          isLastProblem={
            currentSession.currentIndex >= currentSession.progress.total - 1
          }
          onPrevious={onPreviousProblem}
          onSubmit={onSubmitAnswer}
          onNext={onNextProblem}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ProblemViewer;
