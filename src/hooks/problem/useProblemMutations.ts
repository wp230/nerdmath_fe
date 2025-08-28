import { useMutation, useQueryClient } from '@tanstack/react-query';
import { problemApi, bookmarkApi } from '@/services/problem';
import { CheckAnswerRequest, BookmarkRequest } from '@/types/problem';
import { problemQueryKeys } from './queryKeys';

export const useProblemMutations = {
  /**
   * 답안 채점 뮤테이션
   */
  useCheckAnswer: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: CheckAnswerRequest) => problemApi.checkAnswer(data),
      onSuccess: (data, variables) => {
        // 진행률 관련 캐시 무효화
        queryClient.invalidateQueries({
          queryKey: ['progress'],
        });

        // XP/게이미피케이션 관련 캐시 무효화
        queryClient.invalidateQueries({
          queryKey: ['gamification'],
        });

        // 대시보드 통계 무효화
        queryClient.invalidateQueries({
          queryKey: ['dashboard'],
        });

        // 첫 문제 쿼리 무효화 (다음 문제 조회를 위해)
        queryClient.invalidateQueries({
          queryKey: problemQueryKeys.firstProblem(variables.unitId),
        });
      },
      onError: (error) => {
        console.error('Failed to check answer:', error);
      },
    });
  },

  /**
   * 북마크 토글 뮤테이션
   */
  useToggleBookmark: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: BookmarkRequest & { userId: string }) =>
        bookmarkApi.toggleBookmark(data),
      onSuccess: (data, variables) => {
        // 북마크 상태 캐시 업데이트
        queryClient.setQueryData(
          problemQueryKeys.bookmarkStatus(
            variables.problemId,
            variables.userId
          ),
          {
            problemId: variables.problemId,
            bookmarked: data.bookmarked,
            bookmarkedAt: data.bookmarked
              ? new Date().toISOString()
              : undefined,
          }
        );

        // 북마크 목록 무효화
        queryClient.invalidateQueries({
          queryKey: ['bookmarks'],
        });
      },
      onError: (error) => {
        console.error('Failed to toggle bookmark:', error);
      },
    });
  },

  /**
   * 다중 북마크 추가 (완료 후 틀린 문제들 일괄 북마크)
   */
  useBookmarkMultiple: () => {
    const queryClient = useQueryClient();
    const toggleBookmark = useProblemMutations.useToggleBookmark();

    return useMutation({
      mutationFn: async (data: { problemIds: string[]; userId: string }) => {
        const results = [];

        // 순차적으로 북마크 추가
        for (const problemId of data.problemIds) {
          try {
            const result = await bookmarkApi.toggleBookmark({
              problemId,
              userId: data.userId,
            });
            results.push(result);
          } catch (error) {
            console.error(`Failed to bookmark problem ${problemId}:`, error);
          }
        }

        return results;
      },
      onSuccess: (data, variables) => {
        // 모든 북마크 관련 캐시 무효화
        queryClient.invalidateQueries({
          queryKey: ['bookmarks'],
        });

        // 각 문제별 북마크 상태 무효화
        variables.problemIds.forEach((problemId) => {
          queryClient.invalidateQueries({
            queryKey: problemQueryKeys.bookmarkStatus(
              problemId,
              variables.userId
            ),
          });
        });
      },
      onError: (error) => {
        console.error('Failed to bookmark multiple problems:', error);
      },
    });
  },
};
