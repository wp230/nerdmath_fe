import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as dashboardApi from '@/services/dashboard';
import { dashboardQueryKeys } from './queryKeys';
import type { DashboardQueryParams } from '@/types/dashboard';
import { useAuthStore } from '@/stores/auth.store';

// ============================================================================
// 개별 쿼리 훅들
// ============================================================================

export const useProfileQuery = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.profile(),
    queryFn: dashboardApi.getProfile,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 15 * 60 * 1000, // 15분
  });
};

export const useMyCharacterQuery = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const userParams = userId ? { ...params, userId } : params;

  return useQuery({
    queryKey: dashboardQueryKeys.character(userParams),
    queryFn: () => dashboardApi.getMyCharacter(userParams),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useOverallProgressQuery = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const userParams = userId ? { ...params, userId } : params;

  return useQuery({
    queryKey: dashboardQueryKeys.overallProgress(userParams),
    queryFn: () => dashboardApi.getOverallProgress(userParams),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useActivityStatsQuery = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const userParams = userId ? { ...params, userId } : params;

  return useQuery({
    queryKey: dashboardQueryKeys.activityStats(userParams),
    queryFn: () => dashboardApi.getActivityStats(userParams),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2분 (자주 업데이트되는 데이터)
    gcTime: 5 * 60 * 1000, // 5분
  });
};

export const useProgressByTypeQueries = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const userParams = userId ? { ...params, userId } : params;

  return useQueries({
    queries: [
      {
        queryKey: dashboardQueryKeys.conceptProgress(userParams),
        queryFn: () => dashboardApi.getConceptProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.problemProgress(userParams),
        queryFn: () => dashboardApi.getProblemProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.vocabProgress(userParams),
        queryFn: () => dashboardApi.getVocabProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    ],
  });
};

export const useBookmarksQuery = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const userParams = userId ? { ...params, userId } : params;

  return useQuery({
    queryKey: dashboardQueryKeys.bookmarks(userParams),
    queryFn: () => dashboardApi.getBookmarks(userParams),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useDiagnosticAnalysisQuery = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: dashboardQueryKeys.diagnosticAnalysis(user!.userId),
    queryFn: () => dashboardApi.getDiagnosticAnalysis(user!.userId),
    enabled: !!user?.userId, // userId가 있을 때만 쿼리 실행
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간
  });
};

// ============================================================================
// 통합 대시보드 쿼리 훅
// ============================================================================

export const useDashboardQueries = (params?: DashboardQueryParams) => {
  const userId = useAuthStore((state) => state.user?.userId);

  // 사용자별 파라미터 생성 (userId 포함)
  const userParams = userId ? { ...params, userId } : params;

  // 모든 대시보드 관련 쿼리를 병렬로 실행
  const queries = useQueries({
    queries: [
      {
        queryKey: dashboardQueryKeys.profile(),
        queryFn: dashboardApi.getProfile,
        enabled: !!userId, // 로그인된 사용자만
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.character(userParams),
        queryFn: () => dashboardApi.getMyCharacter(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.overallProgress(userParams),
        queryFn: () => dashboardApi.getOverallProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.activityStats(userParams),
        queryFn: () => dashboardApi.getActivityStats(userParams),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.conceptProgress(userParams),
        queryFn: () => dashboardApi.getConceptProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.problemProgress(userParams),
        queryFn: () => dashboardApi.getProblemProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.vocabProgress(userParams),
        queryFn: () => dashboardApi.getVocabProgress(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.bookmarks(userParams),
        queryFn: () => dashboardApi.getBookmarks(userParams),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },

      {
        queryKey: dashboardQueryKeys.diagnosticAnalysis(userId!),
        queryFn: () => dashboardApi.getDiagnosticAnalysis(userId!),
        enabled: !!userId,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        // 에러 발생 시 무시하고 계속 진행
        retry: false,
        throwOnError: false,
      },
    ],
  });

  // 결과를 구조화하여 반환
  const result = useMemo(() => {
    const [
      profileQuery,
      characterQuery,
      overallProgressQuery,
      activityStatsQuery,
      conceptProgressQuery,
      problemProgressQuery,
      vocabProgressQuery,
      bookmarksQuery,
      diagnosticAnalysisQuery,
    ] = queries;

    // 모든 쿼리의 로딩 상태 통합
    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);
    const isFetching = queries.some((query) => query.isFetching);

    // 에러가 있는 쿼리들 수집
    const errors = queries
      .filter((query) => query.isError)
      .map((query) => query.error);

    // 성공한 데이터들 구조화
    const data = {
      profile: profileQuery.data,
      character: characterQuery.data,
      overallProgress: overallProgressQuery.data,
      activityStats: activityStatsQuery.data,
      progressByType: {
        concepts: conceptProgressQuery.data,
        problems: problemProgressQuery.data,
        vocab: vocabProgressQuery.data,
      },
      bookmarks: bookmarksQuery.data,
      diagnosticAnalysis: diagnosticAnalysisQuery?.data,
    };

    // 개별 쿼리 상태도 함께 반환
    const queryStates = {
      profile: {
        isLoading: profileQuery.isLoading,
        isError: profileQuery.isError,
        error: profileQuery.error,
        isFetching: profileQuery.isFetching,
      },
      character: {
        isLoading: characterQuery.isLoading,
        isError: characterQuery.isError,
        error: characterQuery.error,
        isFetching: characterQuery.isFetching,
      },
      overallProgress: {
        isLoading: overallProgressQuery.isLoading,
        isError: overallProgressQuery.isError,
        error: overallProgressQuery.error,
        isFetching: overallProgressQuery.isFetching,
      },
      activityStats: {
        isLoading: activityStatsQuery.isLoading,
        isError: activityStatsQuery.isError,
        error: activityStatsQuery.error,
        isFetching: activityStatsQuery.isFetching,
      },
      progressByType: {
        isLoading: [
          conceptProgressQuery,
          problemProgressQuery,
          vocabProgressQuery,
        ].some((q) => q.isLoading),
        isError: [
          conceptProgressQuery,
          problemProgressQuery,
          vocabProgressQuery,
        ].some((q) => q.isError),
        errors: [conceptProgressQuery, problemProgressQuery, vocabProgressQuery]
          .filter((q) => q.isError)
          .map((q) => q.error),
        isFetching: [
          conceptProgressQuery,
          problemProgressQuery,
          vocabProgressQuery,
        ].some((q) => q.isFetching),
      },
      bookmarks: {
        isLoading: bookmarksQuery.isLoading,
        isError: bookmarksQuery.isError,
        error: bookmarksQuery.error,
        isFetching: bookmarksQuery.isFetching,
      },
      diagnosticAnalysis: {
        isLoading: diagnosticAnalysisQuery.isLoading,
        isError: diagnosticAnalysisQuery.isError,
        error: diagnosticAnalysisQuery.error,
        isFetching: diagnosticAnalysisQuery.isFetching,
      },
    };

    return {
      data,
      queryStates,
      isLoading,
      isError,
      isFetching,
      errors,
      // 편의 함수들
      hasAnyData: Object.values(data).some((value) => value !== undefined),
      isPartiallyLoaded:
        !isLoading && Object.values(data).some((value) => value !== undefined),
    };
  }, [queries]);

  return result;
};
