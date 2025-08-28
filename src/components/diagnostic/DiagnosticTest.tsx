'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDiagnosticStore } from '@/stores/diagnostic.store';
import {
  useGetProblemQuery,
  useGetTestStatusQuery,
  useCheckTimeoutQuery,
} from '@/hooks/diagnostic/useDiagnosticQueries';
import {
  useSubmitAnswerMutation,
  useCompleteTestMutation,
} from '@/hooks/diagnostic/useDiagnosticMutations';
import { useCurrentUser } from '@/stores/auth.store';
import ProblemViewer from './ProblemViewer';
import Timer from './Timer';
import { Spinner, Button, Modal, FullScreenError } from '@/components/common';

export default function DiagnosticTest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [timeoutWarning, setTimeoutWarning] = useState<string | null>(null);

  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useCurrentUser();

  // Zustand 스토어에서 테스트 상태 가져오기
  const {
    testId,
    currentProblemId,
    answeredCount,
    totalProblems,
    startedAt,
    timeoutMinutes,
    completed,
    advanceToProblem,
    markCompleted,
    resetTest,
    hydrateFromSession,
    applyStatusUpdate,
    getCurrentProblemDuration,
    startProblemTimer,
    isTimedOut,
    setLoading,
    setError,
  } = useDiagnosticStore();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!currentUser) {
    router.replace('/login');
    return null;
  }

  // 쿼리 파라미터에서 testId가 있으면 해당 테스트로 상태 복구
  const queryTestId = searchParams.get('testId');

  // 초기화 로직
  useEffect(() => {
    if (queryTestId && !testId) {
      // 쿼리 파라미터의 testId로 상태 조회
      setLoading(true);
    } else if (!queryTestId && !testId) {
      // 세션 복구 시도
      const restored = hydrateFromSession();
      if (!restored) {
        router.replace('/diagnostic');
        return;
      }
    }
  }, [queryTestId, testId, hydrateFromSession, router, setLoading]);

  // 테스트 상태 조회 (쿼리 파라미터가 있거나 기존 테스트 진행 중일 때)
  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError: isStatusError,
    error: statusError,
  } = useGetTestStatusQuery(queryTestId || testId, currentUser.userId, {
    enabled: !!(queryTestId || testId),
    refetchInterval: 30000, // 30초마다 상태 폴링
  });

  // 상태 데이터가 로드되면 스토어에 반영
  useEffect(() => {
    if (statusData && !completed) {
      applyStatusUpdate({
        answeredCount: statusData.answeredCount,
        remainingCount: statusData.remainingCount,
        currentProblemId: statusData.currentProblemId,
        completed: statusData.completed,
        timeoutMinutes: statusData.timeoutMinutes,
      });

      if (statusData.completed) {
        setShowCompletionModal(true);
      }
    }
  }, [statusData, completed, applyStatusUpdate]);

  // 현재 문제 정보 가져오기
  const {
    data: problem,
    isLoading: isProblemLoading,
    isError: isProblemError,
    error: problemError,
  } = useGetProblemQuery(currentProblemId);

  // 타임아웃 체크
  const { data: timeoutData, isError: isTimeoutError } = useCheckTimeoutQuery(
    testId,
    currentUser.userId,
    {
      enabled: !!testId && !!startedAt,
      refetchInterval: 60000, // 1분마다 체크
    }
  );

  // 타임아웃 처리
  useEffect(() => {
    if (timeoutData?.timedOut && !showTimeoutModal) {
      setShowTimeoutModal(true);
      handleCompleteTest(true);
    }
  }, [timeoutData, showTimeoutModal]);

  // 답안 제출 뮤테이션
  const { mutate: submitAnswer } = useSubmitAnswerMutation({
    testId: testId!,
    userId: currentUser.userId,
  });

  // 테스트 완료 뮤테이션
  const { mutate: completeTest } = useCompleteTestMutation({
    testId: testId!,
    userId: currentUser.userId,
  });

  // 문제가 변경될 때마다 타이머 시작
  useEffect(() => {
    if (currentProblemId && !completed) {
      startProblemTimer(currentProblemId);
      setSelectedAnswer(null);
    }
  }, [currentProblemId, completed, startProblemTimer]);

  // 다음 문제로 넘어가는 함수
  const handleNextProblem = useCallback(() => {
    if (!selectedAnswer || !currentProblemId || isSubmitting) return;

    setIsSubmitting(true);
    const duration = getCurrentProblemDuration();

    const payload = {
      problemId: currentProblemId,
      userAnswer: { value: selectedAnswer },
      durationSeconds: duration,
    };

    // 개발 중 디버깅 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('답안 제출:', {
        userId: currentUser.userId,
        testId: testId,
        problemId: currentProblemId,
        answer: selectedAnswer,
        duration: duration,
      });
    }

    submitAnswer(payload, {
      onSuccess: (data) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('답안 제출 성공:', data);
        }

        advanceToProblem(data.nextProblemId, data.answeredCount);

        if (!data.nextProblemId || data.remainingCount === 0) {
          // 모든 문제를 다 풀었을 경우
          handleCompleteTest();
        }
      },
      onError: (error: any) => {
        console.error('Answer submission failed:', error);
        setError(error.message || '답안 제출 중 오류가 발생했습니다.');
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  }, [
    selectedAnswer,
    currentProblemId,
    isSubmitting,
    getCurrentProblemDuration,
    submitAnswer,
    advanceToProblem,
  ]);

  // 테스트 완료 처리 함수
  const handleCompleteTest = useCallback(
    (isTimeout = false) => {
      if (!testId) return;

      const payload = {
        endedAt: new Date().toISOString(),
        completed: true,
      };

      // 개발 중 디버깅 로그
      if (process.env.NODE_ENV === 'development') {
        console.log('진단 테스트 완료:', {
          userId: currentUser.userId,
          testId: testId,
          isTimeout: isTimeout,
          answeredCount: answeredCount,
          totalProblems: totalProblems,
        });
      }

      completeTest(payload, {
        onSuccess: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('진단 테스트 완료 성공');
          }

          markCompleted();
          if (isTimeout) {
            setShowTimeoutModal(true);
          } else {
            setShowCompletionModal(true);
          }
        },
        onError: (error: any) => {
          console.error('Test completion failed:', error);
          setError(error.message || '테스트 완료 처리 중 오류가 발생했습니다.');
        },
      });
    },
    [
      testId,
      completeTest,
      markCompleted,
      setError,
      currentUser.userId,
      answeredCount,
      totalProblems,
    ]
  );

  // 타임아웃 처리 함수
  const handleTimeout = useCallback(() => {
    handleCompleteTest(true);
  }, [handleCompleteTest]);

  // 타임아웃 경고 처리
  const handleTimeoutWarning = useCallback((minutes: number) => {
    if (minutes <= 5) {
      setTimeoutWarning(`⚠️ ${minutes}분 후 자동으로 테스트가 종료됩니다.`);
      setTimeout(() => setTimeoutWarning(null), 5000);
    }
  }, []);

  // 완료 후 대시보드 이동
  const handleGoToDashboard = () => {
    resetTest();
    router.push('/dashboard');
  };

  // 로딩 상태들 처리
  if (isStatusLoading || (!testId && !queryTestId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">테스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isStatusError || isProblemError) {
    return (
      <FullScreenError
        message={
          statusError?.message ||
          problemError?.message ||
          '테스트를 불러오는 중 오류가 발생했습니다.'
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  // 현재 문제가 없으면 로딩
  if (!currentProblemId || isProblemLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 문제 데이터가 없으면 에러
  if (!problem) {
    return (
      <FullScreenError
        message="문제를 불러올 수 없습니다."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 개발 중 사용자 정보 디버깅 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              진단 테스트 디버그 정보
            </h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>사용자 ID: {currentUser?.userId}</p>
              <p>사용자명: {currentUser?.name}</p>
              <p>테스트 ID: {testId}</p>
              <p>현재 문제 ID: {currentProblemId}</p>
            </div>
          </div>
        )}

        {/* 상단 진행률 및 타이머 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">진단 테스트</h1>
              <div className="text-sm text-gray-500">
                문제 {answeredCount + 1} / {totalProblems}
              </div>
            </div>

            {startedAt && timeoutMinutes > 0 && (
              <Timer
                startedAt={startedAt}
                timeoutMinutes={timeoutMinutes}
                onTimeout={handleTimeout}
                onWarning={handleTimeoutWarning}
              />
            )}
          </div>

          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${totalProblems > 0 ? (answeredCount / totalProblems) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>
              진행률:{' '}
              {totalProblems > 0
                ? Math.round((answeredCount / totalProblems) * 100)
                : 0}
              %
            </span>
            <span>남은 문제: {totalProblems - answeredCount}개</span>
          </div>
        </div>

        {/* 타임아웃 경고 */}
        {timeoutWarning && (
          <div className="bg-orange-100 border border-orange-400 text-orange-800 px-4 py-3 rounded-lg mb-6">
            {timeoutWarning}
          </div>
        )}

        {/* 문제 영역 */}
        <ProblemViewer
          problem={problem}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onSubmit={handleNextProblem}
          isSubmitting={isSubmitting}
          problemNumber={answeredCount + 1}
          totalProblems={totalProblems}
        />

        {/* 하단 버튼 영역 */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNextProblem}
            disabled={!selectedAnswer || isSubmitting}
            size="lg"
            className="min-w-32"
          >
            {isSubmitting
              ? '제출 중...'
              : answeredCount + 1 === totalProblems
                ? '테스트 완료'
                : '다음 문제'}
          </Button>
        </div>
      </div>

      {/* 완료 모달 */}
      <Modal
        isOpen={showCompletionModal}
        onClose={() => {}}
        title="🎉 진단 테스트 완료!"
        size="lg"
      >
        <div className="text-center py-6">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            수고하셨습니다!
          </h3>
          <p className="text-gray-600 mb-6">
            총 {totalProblems}문제를 모두 완료하셨습니다.
            <br />
            분석 결과는 대시보드에서 확인하실 수 있습니다.
          </p>
          <Button
            onClick={handleGoToDashboard}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            대시보드로 이동
          </Button>
        </div>
      </Modal>

      {/* 타임아웃 모달 */}
      <Modal
        isOpen={showTimeoutModal}
        onClose={() => {}}
        title="⏰ 시간 초과"
        size="lg"
      >
        <div className="text-center py-6">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            시간이 초과되었습니다
          </h3>
          <p className="text-gray-600 mb-6">
            제한 시간이 지나 테스트가 자동으로 종료되었습니다.
            <br />
            지금까지 답변한 문제들로 분석을 진행합니다.
          </p>
          <Button
            onClick={handleGoToDashboard}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
          >
            대시보드로 이동
          </Button>
        </div>
      </Modal>
    </div>
  );
}
