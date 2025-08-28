import { useQuery } from '@tanstack/react-query';
import { problemApi, bookmarkApi } from '@/services/problem';
import { problemQueryKeys } from './queryKeys';

export const useProblemQueries = {
  /**
   * 첫 문제 조회 또는 이어풀기
   * @param unitId 단원 ID
   * @param userId 사용자 ID (선택적)
   * @param enabled 쿼리 활성화 여부
   */
  useFirstProblem: (unitId: string, userId?: string, enabled = true) =>
    useQuery({
      queryKey: problemQueryKeys.firstProblem(unitId, userId),
      queryFn: () => problemApi.getFirstProblem(unitId, userId),
      enabled: !!unitId && enabled,
      staleTime: 0, // 항상 최신 진행상황 반영
      retry: (failureCount, error: any) => {
        // 404 에러는 재시도하지 않음 (단원이 존재하지 않음)
        if (error?.response?.status === 404) {
          return false;
        }
        return failureCount < 2;
      },
    }),

  /**
   * 문제 단건 조회
   * @param problemId 문제 ID
   * @param enabled 쿼리 활성화 여부
   */
  useProblem: (problemId: string, enabled = true) =>
    useQuery({
      queryKey: problemQueryKeys.problem(problemId),
      queryFn: () => problemApi.getProblem(problemId),
      enabled: !!problemId && enabled,
      staleTime: 5 * 60 * 1000, // 5분간 캐시
    }),

  /**
   * 북마크 상태 확인
   * @param problemId 문제 ID
   * @param userId 사용자 ID
   * @param enabled 쿼리 활성화 여부
   */
  useBookmarkStatus: (problemId: string, userId: string, enabled = true) =>
    useQuery({
      queryKey: problemQueryKeys.bookmarkStatus(problemId, userId),
      queryFn: () => bookmarkApi.checkBookmarkStatus(problemId, userId),
      enabled: !!problemId && !!userId && enabled,
      staleTime: 30 * 1000, // 30초간 캐시
    }),
};
