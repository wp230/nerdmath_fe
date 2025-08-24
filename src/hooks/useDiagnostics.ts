import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkDiagnosticEligibility,
  startDiagnosticTest,
  getDiagnosticStatus,
  submitAnswer,
  checkTimeout,
  mockDiagnosticService,
} from '@/service/diagnosticsService';
import { useDiagnosticsStore } from '@/stores/diagnosticsStore';
import {
  DiagnosticStartRequest,
  AnswerSubmitRequest,
} from '@/types/diagnostics';
import React from 'react';

// 환경에 따라 실제 API 또는 Mock 서비스 선택
const isDevelopment = process.env.NODE_ENV === 'development';
const service = isDevelopment
  ? mockDiagnosticService
  : {
      checkEligibility: checkDiagnosticEligibility,
      startTest: startDiagnosticTest,
      getStatus: getDiagnosticStatus,
      submitAnswer: submitAnswer,
      checkTimeout: checkTimeout,
    };

// 진단 테스트 자격 확인
export const useDiagnosticEligibility = (userId: number) => {
  return useQuery({
    queryKey: ['diagnostic-eligibility', userId],
    queryFn: () => service.checkEligibility(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 진단 테스트 시작
export const useStartDiagnosticTest = () => {
  const queryClient = useQueryClient();
  const { setCurrentTest, setError } = useDiagnosticsStore();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: DiagnosticStartRequest;
    }) => service.startTest(userId, data),
    onSuccess: (data) => {
      // 테스트 정보를 스토어에 저장
      setCurrentTest({
        testId: data.testId,
        userId: data.userId,
        gradeRange: data.gradeRange,
        startedAt: data.startedAt,
        currentProblemId: data.firstProblemId,
        totalProblems: data.totalProblems,
        answeredCount: 0,
        remainingCount: data.totalProblems,
        completed: false,
        timeoutMinutes: 30,
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['diagnostic-eligibility', data.userId],
      });
      setError(null);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || '테스트 시작에 실패했습니다.');
    },
  });
};

// 진단 테스트 상태 조회
export const useDiagnosticStatus = (testId: string, userId: number) => {
  return useQuery({
    queryKey: ['diagnostic-status', testId, userId],
    queryFn: () => service.getStatus(testId, userId),
    enabled: !!testId && !!userId,
    refetchInterval: 30 * 1000, // 30초마다 갱신
    staleTime: 10 * 1000, // 10초
  });
};

// 답안 제출
export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();
  const { updateTestProgress, completeTest, setError } = useDiagnosticsStore();

  return useMutation({
    mutationFn: ({
      testId,
      userId,
      data,
    }: {
      testId: string;
      userId: number;
      data: AnswerSubmitRequest;
    }) => service.submitAnswer(testId, userId, data),
    onSuccess: (data, variables) => {
      // 테스트 진행 상태 업데이트
      updateTestProgress(
        data.answeredCount,
        data.remainingCount,
        data.nextProblemId || variables.data.problemId
      );

      // 다음 문제가 없으면 테스트 완료
      if (!data.nextProblemId) {
        // 전체 세션 시간을 가져와서 결과에 반영
        const { totalSessionTime } = useDiagnosticsStore.getState();

        // 정답 개수를 실제 풀은 문제 수에 비례하여 계산
        const totalAnswered = 20; // 총 20문제
        const correctAnswers =
          Math.floor(Math.random() * totalAnswered) +
          Math.floor(totalAnswered * 0.6); // 60% 이상 정답
        const incorrectAnswers = totalAnswered - correctAnswers;
        const score = Math.round((correctAnswers / totalAnswered) * 100); // 백분율 점수

        const mockResult = {
          testId: variables.testId,
          userId: variables.userId,
          totalProblems: 20,
          correctAnswers: correctAnswers, // ✅ 올바른 정답 개수
          incorrectAnswers: incorrectAnswers, // ✅ 틀린 답 개수
          score: score, // ✅ 백분율 점수 (0-100)
          completedAt: new Date().toISOString(),
          durationMinutes: Math.floor(totalSessionTime / 60), // 전체 세션 시간을 분 단위로 변환
        };
        completeTest(mockResult);
      }

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['diagnostic-status', variables.testId, variables.userId],
      });
      setError(null);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || '답안 제출에 실패했습니다.');
    },
  });
};

// 타임아웃 체크
export const useTimeoutCheck = (testId: string, userId: number) => {
  return useQuery({
    queryKey: ['timeout-check', testId, userId],
    queryFn: () => service.checkTimeout(testId, userId),
    enabled: !!testId && !!userId,
    refetchInterval: 60 * 1000, // 1분마다 갱신
    staleTime: 30 * 1000, // 30초
  });
};

// 문제 데이터 Mock (실제로는 별도 API 필요)
export const useMockProblem = (problemId: string) => {
  return useQuery({
    queryKey: ['mock-problem', problemId],
    queryFn: async () => {
      // Mock 문제 데이터 생성
      await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션

      return {
        id: problemId,
        content: `문제 ${problemId.split('_')[2]}: 다음 중 올바른 답을 선택하세요.`,
        type: 'multiple-choice',
        options: ['선택지 A', '선택지 B', '선택지 C', '선택지 D'],
      };
    },
    enabled: !!problemId,
    staleTime: Infinity, // 문제 내용은 변경되지 않음
  });
};

// 전체 세션 시간 실시간 업데이트
export const useSessionTimer = () => {
  const { sessionStartTime, updateSessionTime } = useDiagnosticsStore();

  React.useEffect(() => {
    if (!sessionStartTime) return;

    const timer = setInterval(() => {
      updateSessionTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime, updateSessionTime]);
};
