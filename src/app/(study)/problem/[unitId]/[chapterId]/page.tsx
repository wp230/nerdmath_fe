'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { useProblemStore } from '@/stores/problem.store';
import { useProblemQueries, useProblemMutations } from '@/hooks/problem';
import { ProblemViewer } from '@/components/problem';
import { FullScreenError } from '@/components/common/FullScreenError';
import Spinner from '@/components/common/Spinner';

export default function ProblemPage() {
  const params = useParams();
  const unitId = params.unitId as string;
  const chapterId = params.chapterId as string;

  const { user } = useAuthStore();
  const {
    currentSession,
    currentProblem,
    answerState,
    initializeSession,
    setCurrentProblem,
    setSelectedAnswer,
    submitAnswer,
    setAnswerResult,
    resetAnswer,
    nextProblem,
    clearSession,
    setLoading,
    setError,
    hydrateFromSession,
    hasNextProblem,
    getCurrentProblemId,
  } = useProblemStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // API 훅들
  const { useFirstProblem } = useProblemQueries;
  const { useCheckAnswer } = useProblemMutations;

  const firstProblemQuery = useFirstProblem(
    unitId,
    user?.id,
    isInitialized && !currentSession
  );

  const checkAnswerMutation = useCheckAnswer();

  // 세션 복구 또는 초기화
  useEffect(() => {
    const restored = hydrateFromSession();

    if (restored && currentSession?.unitId === unitId) {
      // 기존 세션 복구 성공
      setIsInitialized(true);
    } else {
      // 새 세션 시작 또는 다른 단원
      if (restored) {
        clearSession(); // 다른 단원이면 기존 세션 클리어
      }
      setIsInitialized(true);
    }
  }, [unitId, hydrateFromSession, currentSession, clearSession]);

  // 첫 문제 데이터 처리
  useEffect(() => {
    if (firstProblemQuery.data && !currentSession) {
      initializeSession({
        unitId,
        chapterId,
        firstProblemResponse: firstProblemQuery.data,
      });
    }
  }, [
    firstProblemQuery.data,
    currentSession,
    initializeSession,
    unitId,
    chapterId,
  ]);

  // 문제 타이머 시작
  useEffect(() => {
    if (currentProblem && !answerState.isSubmitted) {
      setStartTime(Date.now());
    }
  }, [currentProblem, answerState.isSubmitted]);

  // 로딩 상태 동기화
  useEffect(() => {
    setLoading(firstProblemQuery.isLoading || checkAnswerMutation.isPending);
  }, [firstProblemQuery.isLoading, checkAnswerMutation.isPending, setLoading]);

  // 에러 상태 동기화
  useEffect(() => {
    const error = firstProblemQuery.error || checkAnswerMutation.error;
    setError(error ? String(error) : null);
  }, [firstProblemQuery.error, checkAnswerMutation.error, setError]);

  // 답안 제출 핸들러
  const handleSubmitAnswer = async () => {
    if (!currentProblem || !user || answerState.selectedAnswer === null) return;

    // 소요 시간 계산
    const duration = startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;
    setDurationSeconds(duration);

    // 답안 제출 상태로 변경
    submitAnswer();

    try {
      const sessionId = `session_${unitId}_${Date.now()}`;

      const result = await checkAnswerMutation.mutateAsync({
        mode: 'practice',
        sessionId,
        unitId,
        problemId: currentProblem.problemId,
        userAnswer: { answer: String(answerState.selectedAnswer) },
        durationSeconds: duration,
      });

      // 결과 저장
      setAnswerResult(result);
    } catch (error) {
      console.error('Failed to submit answer:', error);
      // 제출 상태 되돌리기
      resetAnswer();
    }
  };

  // 다음 문제 진행 핸들러
  const handleNextProblem = async () => {
    if (!user) return;

    try {
      // 다음 문제 조회
      const nextProblemData = await firstProblemQuery.refetch();

      if (nextProblemData.data?.problem) {
        // 다음 문제로 진행
        nextProblem();
        setCurrentProblem(nextProblemData.data.problem);
        resetAnswer();
      } else {
        // 더 이상 문제가 없음 (완료)
        setCurrentProblem(null);
      }
    } catch (error) {
      console.error('Failed to load next problem:', error);
      setError('다음 문제를 불러오는데 실패했습니다.');
    }
  };

  // 이전 문제 핸들러 (현재는 미구현)
  const handlePreviousProblem = () => {
    // TODO: 필요시 구현
    console.log('Previous problem not implemented');
  };

  // 에러 처리
  if (firstProblemQuery.error) {
    return (
      <FullScreenError
        message="문제를 불러오는데 실패했습니다."
        onRetry={() => {
          firstProblemQuery.refetch();
          setError(null);
        }}
      />
    );
  }

  // 로딩 처리
  if (!isInitialized || firstProblemQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // 문제가 없는 경우 (404 등)
  if (!firstProblemQuery.data && !currentSession) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">
          해당 단원의 문제를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <ProblemViewer
      unitId={unitId}
      chapterId={chapterId}
      onSubmitAnswer={handleSubmitAnswer}
      onNextProblem={handleNextProblem}
      onPreviousProblem={handlePreviousProblem}
      canSubmit={
        answerState.selectedAnswer !== null && !answerState.isSubmitted
      }
      canNext={answerState.isSubmitted}
      isSubmitting={checkAnswerMutation.isPending}
    />
  );
}
