import { apiRequest } from '@/services/core/apiClient';
import type {
  UserProfile,
  MyCharacter,
  OverallProgress,
  ActivityStats,
  ProgressByType,
  BookmarkList,
  BookmarkToggleRequest,
  BookmarkToggleResponse,
  BookmarkReviewRequest,
  BookmarkReviewSession,
  ActiveLearning,
  DashboardQueryParams,
} from '@/types/dashboard';

// ============================================================================
// 사용자 프로필 API (12.4)
// ============================================================================

/**
 * 사용자 프로필 정보 조회
 */
export const getProfile = async (): Promise<UserProfile> => {
  const response = await apiRequest.get<UserProfile>('/auth/profile');
  return response.data;
};

// ============================================================================
// 캐릭터 관련 API (9.2)
// ============================================================================

/**
 * 내 캐릭터 정보 조회
 */
export const getMyCharacter = async (
  params?: DashboardQueryParams
): Promise<MyCharacter> => {
  const response = await apiRequest.get<MyCharacter>('/characters/my', {
    params,
  });
  return response.data;
};

// ============================================================================
// 학습 진행률 관련 API (8.1, 8.2)
// ============================================================================

/**
 * 전체 학습 진행률 조회
 */
export const getOverallProgress = async (
  params?: DashboardQueryParams
): Promise<OverallProgress> => {
  const response = await apiRequest.get<OverallProgress>('/progress/overall', {
    params,
  });
  return response.data;
};

/**
 * 개념 학습 진행률 목록 조회
 */
export const getConceptProgress = async (
  params?: DashboardQueryParams
): Promise<ProgressByType> => {
  const response = await apiRequest.get<ProgressByType>('/progress/concepts', {
    params,
  });
  return response.data;
};

/**
 * 문제 풀이 진행률 목록 조회
 */
export const getProblemProgress = async (
  params?: DashboardQueryParams
): Promise<ProgressByType> => {
  const response = await apiRequest.get<ProgressByType>('/progress/problems', {
    params,
  });
  return response.data;
};

/**
 * 어휘 학습 진행률 목록 조회
 */
export const getVocabProgress = async (
  params?: DashboardQueryParams
): Promise<ProgressByType> => {
  const response = await apiRequest.get<ProgressByType>('/progress/vocab', {
    params,
  });
  return response.data;
};

// ============================================================================
// 활동 통계 API (8.3)
// ============================================================================

/**
 * 사용자 활동 통계 조회
 */
export const getActivityStats = async (
  params?: DashboardQueryParams
): Promise<ActivityStats> => {
  const response = await apiRequest.get<ActivityStats>('/activity/stats', {
    params,
  });
  return response.data;
};

// ============================================================================
// 북마크 관련 API (7.2, 7.3)
// ============================================================================

/**
 * 북마크 목록 조회
 */
export const getBookmarks = async (
  params?: DashboardQueryParams
): Promise<BookmarkList> => {
  const response = await apiRequest.get<BookmarkList>('/bookmarks', {
    params,
  });
  return response.data;
};

/**
 * 북마크 토글 (추가/제거)
 */
export const toggleBookmark = async (
  data: BookmarkToggleRequest,
  params?: DashboardQueryParams
): Promise<BookmarkToggleResponse> => {
  const response = await apiRequest.post<BookmarkToggleResponse>(
    '/bookmarks/toggle',
    data,
    {
      params,
    }
  );
  return response.data;
};

/**
 * 북마크 복습 세션 시작
 */
export const startBookmarkReview = async (
  data: BookmarkReviewRequest,
  params?: DashboardQueryParams
): Promise<BookmarkReviewSession> => {
  const response = await apiRequest.post<BookmarkReviewSession>(
    '/bookmarks/review',
    data,
    {
      params,
    }
  );
  return response.data;
};

// ============================================================================
// 현재 학습 활동 확인 API (11.2)
// ============================================================================

/**
 * 활성 학습 세션 확인
 */
export const getActiveLearning = async (): Promise<ActiveLearning> => {
  const response = await apiRequest.get<ActiveLearning>('/learning/active');
  return response.data;
};

// ============================================================================
// 대시보드 통합 데이터 조회 (병렬 요청용)
// ============================================================================

/**
 * 대시보드에 필요한 모든 데이터를 병렬로 조회
 * 개별 API가 실패해도 다른 데이터는 정상 로드되도록 처리
 */
export const getDashboardData = async (params?: DashboardQueryParams) => {
  // Promise.allSettled를 사용하여 개별 실패를 허용
  const results = await Promise.allSettled([
    getProfile(),
    getMyCharacter(params),
    getOverallProgress(params),
    getActivityStats(params),
    getConceptProgress(params),
    getProblemProgress(params),
    getVocabProgress(params),
    getBookmarks(params),
    getActiveLearning(),
  ]);

  // 결과를 구조화하여 반환
  return {
    profile: results[0],
    character: results[1],
    overallProgress: results[2],
    activityStats: results[3],
    conceptProgress: results[4],
    problemProgress: results[5],
    vocabProgress: results[6],
    bookmarks: results[7],
    activeLearning: results[8],
  };
};
