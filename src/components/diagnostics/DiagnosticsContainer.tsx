'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GradeSelection } from './GradeSelection';
import { ProblemSolver } from './ProblemSolver';
import { TestResult } from './TestResult';
import { TimeoutChecker } from './TimeoutChecker';
import {
  useDiagnosticEligibility,
  useStartDiagnosticTest,
  useSubmitAnswer,
  useSessionTimer,
} from '@/hooks/useDiagnostics';
import { useDiagnosticsStore } from '@/stores/diagnosticsStore';
import { GradeRange, AnswerSubmitRequest } from '@/types/diagnostics';

interface DiagnosticsContainerProps {
  userId: number;
}

export const DiagnosticsContainer: React.FC<DiagnosticsContainerProps> = ({
  userId,
}) => {
  const router = useRouter();
  const {
    currentTest,
    testResult,
    isLoading,
    error,
    resetTest,
    startSession,
    totalSessionTime,
  } = useDiagnosticsStore();

  // 자격 확인
  const { data: eligibility, isLoading: eligibilityLoading } =
    useDiagnosticEligibility(userId);

  // 테스트 시작
  const startTestMutation = useStartDiagnosticTest();

  // 답안 제출
  const submitAnswerMutation = useSubmitAnswer();

  // 세션 타이머 시작
  useSessionTimer();

  // 자격이 없는 경우 처리
  useEffect(() => {
    if (eligibility && !eligibility.eligible) {
      alert(`진단 테스트를 진행할 수 없습니다: ${eligibility.reason}`);
      router.push('/dashboard');
    }
  }, [eligibility, router]);

  // 학년 선택 및 테스트 시작
  const handleGradeSelect = async (gradeRange: GradeRange) => {
    try {
      await startTestMutation.mutateAsync({ userId, data: { gradeRange } });
      // 테스트 시작 시 세션 시작
      startSession();
    } catch (error) {
      console.error('테스트 시작 실패:', error);
    }
  };

  // 답안 제출
  const handleAnswerSubmit = async (answer: AnswerSubmitRequest) => {
    if (!currentTest) return;

    try {
      await submitAnswerMutation.mutateAsync({
        testId: currentTest.testId,
        userId: currentTest.userId,
        data: answer,
      });
    } catch (error) {
      console.error('답안 제출 실패:', error);
    }
  };

  // 테스트 재시작
  const handleRetry = () => {
    resetTest();
  };

  // 홈으로 돌아가기
  const handleGoHome = () => {
    resetTest();
    router.push('/dashboard');
  };

  // 로딩 상태
  if (eligibilityLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            페이지 새로고침
          </button>
        </div>
      </div>
    );
  }

  // 자격이 없는 경우
  if (eligibility && !eligibility.eligible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            진단 테스트 불가
          </h2>
          <p className="text-gray-600 mb-6">{eligibility.reason}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 테스트 결과 표시
  if (testResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <TestResult
          result={testResult}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
        />
      </div>
    );
  }

  // 테스트 진행 중
  if (currentTest) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        {/* 타임아웃 체커 */}
        <TimeoutChecker
          testId={currentTest.testId}
          userId={currentTest.userId}
          onTimeout={() => {
            // 타임아웃 시 자동으로 결과 화면으로 이동
          }}
        />

        {/* 문제 풀이 */}
        <ProblemSolver
          problemId={currentTest.currentProblemId}
          onAnswerSubmit={handleAnswerSubmit}
          isLoading={submitAnswerMutation.isPending}
          answeredCount={currentTest.answeredCount}
          totalProblems={currentTest.totalProblems}
        />

        {/* 테스트 정보 */}
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="text-center text-sm text-gray-600">
            <p>테스트 ID: {currentTest.testId}</p>
            <p>
              시작 시간:{' '}
              {new Date(currentTest.startedAt).toLocaleString('ko-KR')}
            </p>
            <p>제한 시간: {currentTest.timeoutMinutes}분</p>
            <p>전체 세션 시간: {totalSessionTime}초</p>
          </div>
        </div>
      </div>
    );
  }

  // 학년 선택 화면
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <GradeSelection
        onGradeSelect={handleGradeSelect}
        isLoading={startTestMutation.isPending}
      />
    </div>
  );
};
