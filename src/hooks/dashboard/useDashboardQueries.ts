import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as dashboardApi from '@/services/dashboard';
import { dashboardQueryKeys } from './queryKeys';
import type { DashboardQueryParams } from '@/types/dashboard';

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
  return useQuery({
    queryKey: dashboardQueryKeys.character(params),
    queryFn: () => dashboardApi.getMyCharacter(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useOverallProgressQuery = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: dashboardQueryKeys.overallProgress(params),
    queryFn: () => dashboardApi.getOverallProgress(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useActivityStatsQuery = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: dashboardQueryKeys.activityStats(params),
    queryFn: () => dashboardApi.getActivityStats(params),
    staleTime: 2 * 60 * 1000, // 2분 (자주 업데이트되는 데이터)
    gcTime: 5 * 60 * 1000, // 5분
  });
};

export const useProgressByTypeQueries = (params?: DashboardQueryParams) => {
  return useQueries({
    queries: [
      {
        queryKey: dashboardQueryKeys.conceptProgress(params),
        queryFn: () => dashboardApi.getConceptProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.problemProgress(params),
        queryFn: () => dashboardApi.getProblemProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.vocabProgress(params),
        queryFn: () => dashboardApi.getVocabProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    ],
  });
};

export const useBookmarksQuery = (params?: DashboardQueryParams) => {
  return useQuery({
    queryKey: dashboardQueryKeys.bookmarks(params),
    queryFn: () => dashboardApi.getBookmarks(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useActiveLearningQuery = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.activeLearning(),
    queryFn: dashboardApi.getActiveLearning,
    staleTime: 1 * 60 * 1000, // 1분 (학습 상태는 자주 확인)
    gcTime: 2 * 60 * 1000, // 2분
  });
};

// ============================================================================
// 통합 대시보드 쿼리 훅
// ============================================================================

export const useDashboardQueries = (params?: DashboardQueryParams) => {
  // 모든 대시보드 관련 쿼리를 병렬로 실행
  const queries = useQueries({
    queries: [
      {
        queryKey: dashboardQueryKeys.profile(),
        queryFn: dashboardApi.getProfile,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.character(params),
        queryFn: () => dashboardApi.getMyCharacter(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.overallProgress(params),
        queryFn: () => dashboardApi.getOverallProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.activityStats(params),
        queryFn: () => dashboardApi.getActivityStats(params),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.conceptProgress(params),
        queryFn: () => dashboardApi.getConceptProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.problemProgress(params),
        queryFn: () => dashboardApi.getProblemProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.vocabProgress(params),
        queryFn: () => dashboardApi.getVocabProgress(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.bookmarks(params),
        queryFn: () => dashboardApi.getBookmarks(params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: dashboardQueryKeys.activeLearning(),
        queryFn: dashboardApi.getActiveLearning,
        staleTime: 1 * 60 * 1000,
        gcTime: 2 * 60 * 1000,
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
      activeLearningQuery,
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
      activeLearning: activeLearningQuery.data,
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
      activeLearning: {
        isLoading: activeLearningQuery.isLoading,
        isError: activeLearningQuery.isError,
        error: activeLearningQuery.error,
        isFetching: activeLearningQuery.isFetching,
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
