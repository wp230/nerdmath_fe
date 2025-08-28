import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  startTest,
  submitAnswer,
  completeTest,
  restartTest,
  generateIdempotencyKey,
} from '@/services/diagnostic';
import {
  StartTestPayload,
  SubmitAnswerPayload,
  CompleteTestPayload,
} from '@/types/diagnostic';
import { QUERY_KEYS } from './queryKeys';

interface UseStartTestMutationProps {
  userId: number;
}

/**
 * 2.2. 진단 시작 (Start Test)
 */
export const useStartTestMutation = ({ userId }: UseStartTestMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartTestPayload) => {
      const idempotencyKey = generateIdempotencyKey('start_test', userId);
      return startTest(userId, payload, idempotencyKey);
    },
    onSuccess: (data) => {
      // 진단 시작 성공 시 관련 쿼리들 무효화
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_ELIGIBILITY(userId),
        }),
        // 다음 문제 미리 프리패치
        data.firstProblemId &&
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.DIAGNOSTIC_PROBLEM(data.firstProblemId),
            queryFn: () =>
              import('@/services/diagnostic').then(({ getProblem }) =>
                getProblem(data.firstProblemId)
              ),
          }),
      ]);
    },
  });
};

interface UseSubmitAnswerMutationProps {
  testId: string;
  userId: number;
}

/**
 * 2.4. 답안 제출 (Submit Answer)
 */
export const useSubmitAnswerMutation = ({
  testId,
  userId,
}: UseSubmitAnswerMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitAnswerPayload) => {
      const idempotencyKey = generateIdempotencyKey(
        'submit_answer',
        `${testId}_${payload.problemId}`
      );
      return submitAnswer(testId, userId, payload, idempotencyKey);
    },
    onSuccess: (data) => {
      return Promise.all([
        // 테스트 상태 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_STATUS(testId),
        }),
        // 다음 문제가 있다면 미리 프리패치
        data.nextProblemId &&
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.DIAGNOSTIC_PROBLEM(data.nextProblemId),
            queryFn: () =>
              import('@/services/diagnostic').then(({ getProblem }) =>
                getProblem(data.nextProblemId!)
              ),
          }),
      ]);
    },
  });
};

interface UseCompleteTestMutationProps {
  testId: string;
  userId: number;
}

/**
 * 2.5. 진단 완료 (Complete Test)
 */
export const useCompleteTestMutation = ({
  testId,
  userId,
}: UseCompleteTestMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CompleteTestPayload) => {
      const idempotencyKey = generateIdempotencyKey('complete_test', testId);
      return completeTest(testId, userId, payload, idempotencyKey);
    },
    onSuccess: () => {
      // 테스트 완료 시 관련 쿼리들 모두 무효화
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_STATUS(testId),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_ELIGIBILITY(userId),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_TIMEOUT(testId),
        }),
        // 분석 결과 쿼리 미리 시작
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.DIAGNOSTIC_ANALYSIS(userId),
          queryFn: () =>
            import('@/services/diagnostic').then(({ getAnalysisResult }) =>
              getAnalysisResult(userId)
            ),
        }),
      ]);
    },
  });
};

interface UseRestartTestMutationProps {
  testId: string;
  userId: number;
}

/**
 * 2.6. 진단 테스트 재시작 (Restart Test)
 */
export const useRestartTestMutation = ({
  testId,
  userId,
}: UseRestartTestMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const idempotencyKey = generateIdempotencyKey('restart_test', testId);
      return restartTest(testId, userId, idempotencyKey);
    },
    onSuccess: (data) => {
      return Promise.all([
        // 관련 쿼리들 무효화
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_STATUS(testId),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DIAGNOSTIC_TIMEOUT(testId),
        }),
        // 첫 번째 문제 프리패치
        data.firstProblemId &&
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.DIAGNOSTIC_PROBLEM(data.firstProblemId),
            queryFn: () =>
              import('@/services/diagnostic').then(({ getProblem }) =>
                getProblem(data.firstProblemId)
              ),
          }),
      ]);
    },
  });
};
