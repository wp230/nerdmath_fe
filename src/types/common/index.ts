// ============================================================================
// 공통 API 응답 타입
// ============================================================================

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details: unknown[];
  traceId: string;
}

// ============================================================================
// 공통 엔터티 타입
// ============================================================================

// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  profileImage?: string;
  level: number;
  xp: number;
  createdAt: string;
  updatedAt: string;
}

// 사용자 프로필 타입
export interface UserProfile extends User {
  totalStudyTime: number;
  studyStreak: number;
  achievements: Achievement[];
  statistics: UserStatistics;
}

// 사용자 통계 타입
export interface UserStatistics {
  totalProblemsCompleted: number;
  totalUnitsCompleted: number;
  averageAccuracy: number;
  favoriteSubject: string;
}

// 성취 타입
export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
}

// 학습 단위(Unit) 타입
export interface Unit {
  id: string;
  name: string;
  description: string;
  majorId: string;
  minorId: string;
  order: number;
  totalProblems: number;
  estimatedTime: number; // 분 단위
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  prerequisites: string[]; // 선수 단원 ID 배열
  status: UnitStatus;
  progress?: UnitProgress;
}

export interface UnitProgress {
  completedProblems: number;
  accuracy: number;
  timeSpent: number; // 초 단위
  lastAccessedAt: string;
  isCompleted: boolean;
}

export type UnitStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';

// 문제(Problem) 타입
export interface Problem {
  id: string;
  unitId: string;
  type: ProblemType;
  title: string;
  content: string;
  options?: ProblemOption[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedTime: number; // 초 단위
  tags: string[];
  metadata?: ProblemMetadata;
}

export type ProblemType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'SHORT_ANSWER'
  | 'ESSAY'
  | 'MATH_EXPRESSION'
  | 'DRAG_AND_DROP';

export interface ProblemOption {
  id: string;
  text: string;
  isCorrect?: boolean; // 정답 확인용 (클라이언트에서는 보통 숨김)
}

export interface ProblemMetadata {
  hasImage: boolean;
  hasVideo: boolean;
  mathContent: boolean;
  interactiveElements: string[];
}

// 문제 해답 타입
export interface ProblemAnswer {
  problemId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  timeSpent: number; // 초 단위
  submittedAt: string;
  attempts: number;
}

// ============================================================================
// 학습 관련 타입
// ============================================================================

// 학습 세션 타입
export interface StudySession {
  id: string;
  userId: string;
  unitId: string;
  startedAt: string;
  endedAt?: string;
  totalTime: number; // 초 단위
  problemsAttempted: number;
  problemsCorrect: number;
  accuracy: number;
  xpEarned: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
}

// 진단 테스트 타입
export interface DiagnosticTest {
  id: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  totalQuestions: number;
  answeredQuestions: number;
  score: number;
  accuracy: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  results?: DiagnosticResult[];
}

export interface DiagnosticResult {
  subject: string;
  score: number;
  accuracy: number;
  strengths: string[];
  weaknesses: string[];
  recommendedUnits: string[];
}

// ============================================================================
// UI 관련 타입
// ============================================================================

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// 필터 타입
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// 정렬 타입
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// ============================================================================
// 유틸리티 타입
// ============================================================================

// ID 타입
export type ID = string;

// 날짜 타입 (ISO 8601 형식)
export type ISODateString = string;

// 선택적 필드를 가진 타입 생성 유틸리티
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 필수 필드를 가진 타입 생성 유틸리티
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;

// 깊은 부분 타입
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
