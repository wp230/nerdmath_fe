import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as dashboardApi from '@/services/dashboard';
import { dashboardQueryKeys } from './queryKeys';
import type {
  BookmarkToggleRequest,
  BookmarkReviewRequest,
  DashboardQueryParams,
} from '@/types/dashboard';

// ============================================================================
// 북마크 토글 mutation
// ============================================================================

export const useBookmarkToggleMutation = (params?: DashboardQueryParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookmarkToggleRequest) =>
      dashboardApi.toggleBookmark(data, params),
    onSuccess: (response) => {
      // 북마크 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.bookmarks(params),
      });

      // 성공 메시지 로깅
      console.log('Bookmark toggled:', response.message);
    },
    onError: (error) => {
      console.error('Failed to toggle bookmark:', error);
    },
  });
};

// ============================================================================
// 북마크 복습 시작 mutation
// ============================================================================

export const useStartBookmarkReviewMutation = (
  params?: DashboardQueryParams
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookmarkReviewRequest) =>
      dashboardApi.startBookmarkReview(data, params),
    onSuccess: (response) => {
      // 활동 통계 쿼리 무효화 (새로운 학습 세션이 시작됨)
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.activityStats(params),
      });

      // 활성 학습 세션 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.activeLearning(),
      });

      // 복습 페이지로 이동 (setId를 사용)
      // 실제 복습 페이지 경로는 프로젝트 구조에 따라 조정 필요
      router.push(`/study/review/${response.setId}`);
    },
    onError: (error) => {
      console.error('Failed to start bookmark review:', error);
    },
  });
};

// ============================================================================
// 대시보드 데이터 새로고침 유틸리티
// ============================================================================

export const useDashboardRefresh = (params?: DashboardQueryParams) => {
  const queryClient = useQueryClient();

  const refreshAll = async () => {
    // 모든 대시보드 관련 쿼리 무효화
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.all,
    });
  };

  const refreshProfile = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.profile(),
    });
  };

  const refreshCharacter = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.character(params),
    });
  };

  const refreshProgress = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.progress(),
    });
  };

  const refreshActivityStats = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.activityStats(params),
    });
  };

  const refreshBookmarks = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.bookmarks(params),
    });
  };

  const refreshActiveLearning = async () => {
    await queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.activeLearning(),
    });
  };

  return {
    refreshAll,
    refreshProfile,
    refreshCharacter,
    refreshProgress,
    refreshActivityStats,
    refreshBookmarks,
    refreshActiveLearning,
  };
};
