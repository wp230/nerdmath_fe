// ============================================================================
// Problem 관련 타입 정의
// ============================================================================

// 문제 기본 타입
export interface Problem {
  problemId: string;
  unitId: string;
  grade: number;
  chapter: number;
  context: {
    source: string;
    for: string[];
  };
  cognitiveType: string;
  level: string;
  type: string;
  tags: string[];
  content: {
    stem: { text: string };
    choices: Array<{ key: string; text: string }>;
  };
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 진행률 타입
export interface Progress {
  completed: number;
  total: number;
  remaining: number;
  percentage: number;
}

// 문제 세션 타입
export interface ProblemSession {
  unitId: string;
  chapterId: string; // URL에서 받지만 실제론 사용 안함
  problemIds: string[];
  currentIndex: number;
  progress: Progress;
  isFirstTime: boolean;
  startedAt: string;
}

// 답안 상태 타입
export interface AnswerState {
  selectedAnswer: string | number | null;
  isSubmitted: boolean;
  result: AnswerResult | null;
}

// 답안 결과 타입  
export interface AnswerResult {
  answerId: string;
  isCorrect: boolean;
  explanation: { explanation: string };
  updatedProgress: {
    problemProgress: number;
    status: string;
  };
  xpGained: number;
  gamificationUpdate: {
    level: number;
    xp: number;
    totalXp: number;
    nextLevelXp: number;
    leveledUp: boolean;
  };
}

// API 요청/응답 타입
export interface FirstProblemResponse {
  problem: Problem | null; // null이면 완료
  problemIds: string[];
  progress: Progress;
  isFirstTime: boolean;
}

export interface CheckAnswerRequest {
  mode: 'practice';
  sessionId: string;
  unitId: string;
  problemId: string;
  userAnswer: { answer: string };
  durationSeconds: number;
}

export interface CheckAnswerResponse {
  answerId: string;
  isCorrect: boolean;
  explanation: { explanation: string };
  relatedConcepts: Array<{ unitId: string; title: string }>;
  updatedProgress: {
    problemProgress: number;
    status: string;
  };
  xpGained: number;
  gamificationUpdate: {
    level: number;
    xp: number;
    totalXp: number;
    nextLevelXp: number;
    leveledUp: boolean;
  };
}

// 북마크 관련 타입
export interface BookmarkRequest {
  problemId: string;
}

export interface BookmarkResponse {
  bookmarkId: string;
  problemId: string;
  bookmarked: boolean;
  message: string;
}

// 세션 지속성을 위한 타입
export interface PersistentProblemSession {
  unitId: string;
  chapterId: string;
  currentIndex: number;
  problemIds: string[];
  progress: Progress;
  startedAt: string;
  persistedAt: string;
}
