import { useQuery } from '@tanstack/react-query';
import {
  checkEligibility,
  getTestStatus,
  getProblem,
  checkTimeout,
  getAnalysisResult,
} from '@/services/diagnostic';
import { QUERY_KEYS } from './queryKeys';

/**
 * 2.1. 진단 자격 확인 (Check Eligibility)
 * @param userId 사용자 ID
 */
export const useCheckEligibilityQuery = (userId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.DIAGNOSTIC_ELIGIBILITY(userId),
    queryFn: () => checkEligibility(userId!),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분 후 가비지 컬렉션
  });
};

/**
 * 2.3. 진단 상태 조회 (Get Status)
 * @param testId 테스트 ID
 * @param userId 사용자 ID
 * @param options 쿼리 옵션
 */
export const useGetTestStatusQuery = (
  testId: string | null,
  userId: number | null,
  options?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: QUERY_KEYS.DIAGNOSTIC_STATUS(testId),
    queryFn: () => getTestStatus(testId!, userId!),
    enabled: (options?.enabled ?? true) && !!testId && !!userId,
    refetchInterval: options?.refetchInterval, // 폴링 지원
    staleTime: 1000 * 30, // 30초간 캐시 유지
  });
};

/**
 * 3.2. 문제 단건 조회 (Get Single Problem)
 * @param problemId 문제 ID
 */
export const useGetProblemQuery = (problemId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.DIAGNOSTIC_PROBLEM(problemId),
    queryFn: () => getProblem(problemId!),
    enabled: !!problemId,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (문제는 자주 변경되지 않음)
  });
};

/**
 * 2.7. 진단 테스트 타임아웃 체크 (Check Timeout)
 * @param testId 테스트 ID
 * @param userId 사용자 ID
 * @param options 쿼리 옵션
 */
export const useCheckTimeoutQuery = (
  testId: string | null,
  userId: number | null,
  options?: {
    refetchInterval?: number;
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: QUERY_KEYS.DIAGNOSTIC_TIMEOUT(testId),
    queryFn: () => checkTimeout(testId!, userId!),
    enabled: (options?.enabled ?? true) && !!testId && !!userId,
    refetchInterval: options?.refetchInterval || 1000 * 60, // 기본 1분 간격
    staleTime: 1000 * 30, // 30초간 캐시 유지
  });
};

/**
 * 2.8. 진단 분석 결과 조회 (Get Analysis Result)
 * @param userId 사용자 ID
 * @param enabled 쿼리 활성화 여부
 */
export const useGetAnalysisResultQuery = (
  userId: number | null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.DIAGNOSTIC_ANALYSIS(userId),
    queryFn: () => getAnalysisResult(userId!),
    enabled: enabled && !!userId,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: (failureCount, error: any) => {
      // 202 상태(분석 진행 중)는 재시도하지 않음
      if (error?.response?.status === 202) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
