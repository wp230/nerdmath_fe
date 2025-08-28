import type { User } from '@/types/common';

// ============================================================================
// 전체 진행률 관련 타입 (API 8.1)
// ============================================================================

export interface OverallProgress {
  totalConceptProgress: number;
  totalProblemProgress: number;
  totalVocabProgress: number;
  completedAllUnitsRatio: number;
}

// ============================================================================
// 유형별 진행률 관련 타입 (API 8.2)
// ============================================================================

export interface UnitProgress {
  unitId: string;
  unitTitle: string;
  conceptProgress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface ProgressByType {
  units: UnitProgress[];
}

// ============================================================================
// 활동 통계 관련 타입 (API 8.3)
// ============================================================================

export interface ActivityStats {
  todaySolved: number;
  studyDurationMin: number;
  totalProblems: number;
  totalStudyMinutes: number;
  attendanceCount: number;
  date: string;
}

// ============================================================================
// 캐릭터 및 게이미피케이션 관련 타입 (API 9.2)
// ============================================================================

export interface GamificationState {
  gamifiId: string;
  userId: number;
  level: number;
  xp: number;
}

export interface Character {
  characterId: string;
  name: string;
  imageUrl: string;
  gender?: 'male' | 'female';
  level?: number;
}

export interface MyCharacter {
  gamificationState: GamificationState;
  equippedCharacter: Character;
}

// ============================================================================
// 사용자 프로필 관련 타입 (API 12.4)
// ============================================================================

export interface UserProfile extends User {
  // 추가 프로필 정보들
  name?: string;
  birthDate?: string;
  phoneNumber?: string;
  gender?: 'male' | 'female';
  joinedAt?: string;
}

// ============================================================================
// 북마크 관련 타입 (API 7.2, 7.3)
// ============================================================================

export interface Bookmark {
  bookmarkId: string;
  problemId: string;
  unitId: string;
  unitTitle: string;
  problemTitle: string;
  bookmarkedAt: string;
}

export interface BookmarkList {
  bookmarks: Bookmark[];
  totalCount: number;
}

export interface BookmarkReviewSession {
  setId: string;
  problemIds: string[];
  totalProblems: number;
  mode: 'review';
}

// ============================================================================
// 대시보드 통합 데이터 타입
// ============================================================================

export interface DashboardData {
  profile: UserProfile;
  character: MyCharacter;
  overallProgress: OverallProgress;
  activityStats: ActivityStats;
  progressByType: {
    concepts: ProgressByType;
    problems: ProgressByType;
    vocab: ProgressByType;
  };
  bookmarks: BookmarkList;
}

// ============================================================================
// 대시보드 위젯별 상태 타입
// ============================================================================

export interface DashboardWidgetState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

export interface DashboardState {
  profile: DashboardWidgetState;
  character: DashboardWidgetState;
  overallProgress: DashboardWidgetState;
  activityStats: DashboardWidgetState;
  progressByType: DashboardWidgetState;
  bookmarks: DashboardWidgetState;
}

// ============================================================================
// 북마크 액션 관련 타입
// ============================================================================

export interface BookmarkToggleRequest {
  problemId: string;
}

export interface BookmarkToggleResponse {
  bookmarkId: string;
  problemId: string;
  bookmarked: boolean;
  message: string;
}

export interface BookmarkReviewRequest {
  unitId?: string;
  mode: 'set';
}

// ============================================================================
// 진단 분석 결과 관련 타입 (API 2.8)
// ============================================================================

export interface RecommendedPath {
  unitId: string;
  unitTitle: string;
  priority: number;
  reason: string;
}

export interface DiagnosticAnalysis {
  analysisId: string;
  testId: string;
  userId: number;
  aiComment: string;
  class: string;
  recommendedPath: RecommendedPath[];
  generatedAt: string;
}

// ============================================================================
// 대시보드 요청 파라미터 타입
// ============================================================================

export interface DashboardQueryParams {
  userId?: number;
  date?: string;
  unitId?: string;
  startDate?: string;
  endDate?: string;
}
