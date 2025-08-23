// 진단 테스트 관련 타입 정의

// 1. 진단 자격 확인
export interface DiagnosticEligibilityRequest {
  userId: number;
}

export interface DiagnosticEligibilityResponse {
  eligible: boolean;
  reason: string | null;
  existingTestId: string | null;
}

// 2. 진단 시작
export interface DiagnosticStartRequest {
  gradeRange: {
    min: number;
    max: number;
  };
}

export interface DiagnosticStartResponse {
  testId: string;
  userId: number;
  gradeRange: {
    min: number;
    max: number;
  };
  startedAt: string;
  firstProblemId: string;
  totalProblems: number;
}

// 3. 진단 상태 조회
export interface DiagnosticStatusResponse {
  testId: string;
  userId: number;
  completed: boolean;
  answeredCount: number;
  remainingCount: number;
  currentProblemId: string;
  startedAt: string;
  lastActivityAt: string;
  timeoutMinutes: number;
}

// 4. 답안 제출
export interface DiagnosticSubmitRequest {
  problemId: string;
  userAnswer: {
    value: string;
  };
  durationSeconds: number;
}

export interface DiagnosticSubmitResponse {
  answerId: string;
  isCorrect: boolean | null;
  nextProblemId: string;
  answeredCount: number;
  remainingCount: number;
}

// 5. 타임아웃 체크
export interface DiagnosticTimeoutResponse {
  timedOut: boolean;
  remainingMinutes?: number;
  totalTimeoutMinutes?: number;
  startedAt?: string;
  message?: string;
  durationSec?: number;
}

// 6. 문제 조회
export interface ProblemContent {
  stem: {
    text: string;
  };
  choices?: Array<{
    key: string;
    text: string;
  }>;
}

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
  content: ProblemContent;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 7. 공통 에러 응답
export interface ApiErrorResponse {
  code: string;
  message: string;
  details: any[];
  traceId: string;
}

// 8. 진단 테스트 상태 열거형
export enum DiagnosticStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  TIMED_OUT = 'timed_out'
}

// 9. 진단 테스트 모드
export enum DiagnosticMode {
  DIAGNOSTIC = 'diagnostic',
  PRACTICE = 'practice',
  VOCAB_TEST = 'vocab_test'
}
