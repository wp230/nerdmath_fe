import { useQuery } from '@tanstack/react-query';
import { PracticeService } from '@/service/learning/practiceService';
import { FirstProblemResponse } from '@/types/learning';

/**
 * 소단원별 첫 번째 문제 조회 훅
 * GET /v1/units/{unitId}/first-problem
 */
export const usePracticeProblem = (unitId: string) => {
  return useQuery<FirstProblemResponse>({
    queryKey: ['practiceProblem', unitId],
    queryFn: () => PracticeService.getFirstProblem(unitId),
    enabled: !!unitId,
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * 문제 세트 검증 훅
 */
export const useProblemSetValidation = (problemIds: string[]) => {
  return useQuery({
    queryKey: ['problemSetValidation', problemIds.join(',')],
    queryFn: () => PracticeService.validateProblemSet(problemIds),
    enabled: problemIds.length > 0,
    staleTime: Infinity, // 검증 결과는 변경되지 않음
    gcTime: Infinity,
  });
};

/**
 * 문제 진행률 계산 훅
 */
export const useProblemProgress = (
  completedCount: number,
  totalCount: number
) => {
  return useQuery({
    queryKey: ['problemProgress', completedCount, totalCount],
    queryFn: () =>
      PracticeService.calculateProgress(completedCount, totalCount),
    enabled: totalCount > 0,
    staleTime: 0, // 진행률은 실시간으로 업데이트
    gcTime: 1 * 60 * 1000, // 1분
  });
};

/**
 * 다음 문제 ID 조회 훅
 */
export const useNextProblemId = (
  currentIndex: number,
  problemIds: string[]
) => {
  return useQuery({
    queryKey: ['nextProblemId', currentIndex, problemIds.join(',')],
    queryFn: () => PracticeService.getNextProblemId(currentIndex, problemIds),
    enabled: problemIds.length > 0 && currentIndex >= 0,
    staleTime: 0, // 인덱스가 변경될 때마다 업데이트
    gcTime: 1 * 60 * 1000, // 1분
  });
};
