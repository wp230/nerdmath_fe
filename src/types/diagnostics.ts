// 진단 테스트 관련 타입 정의

export interface GradeRange {
  min: number;
  max: number;
}

export interface DiagnosticEligibility {
  eligible: boolean;
  reason: string | null;
  existingTestId: string | null;
}

export interface DiagnosticStartRequest {
  gradeRange: GradeRange;
}

export interface DiagnosticStartResponse {
  testId: string;
  userId: number;
  gradeRange: GradeRange;
  startedAt: string;
  firstProblemId: string;
  totalProblems: number;
}

export interface DiagnosticStatus {
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

export interface AnswerSubmitRequest {
  problemId: string;
  userAnswer: { value: string };
  durationSeconds: number;
}

export interface AnswerSubmitResponse {
  answerId: string;
  isCorrect: boolean | null;
  nextProblemId: string | null;
  answeredCount: number;
  remainingCount: number;
}

export interface TimeoutCheckResponse {
  timedOut: boolean;
  remainingMinutes?: number;
  totalTimeoutMinutes?: number;
  startedAt?: string;
  message?: string;
  durationSec?: number;
}

export interface Problem {
  id: string;
  content: string;
  type: string;
  options?: string[];
}

export interface DiagnosticTest {
  testId: string;
  userId: number;
  gradeRange: GradeRange;
  startedAt: string;
  currentProblemId: string;
  totalProblems: number;
  answeredCount: number;
  remainingCount: number;
  completed: boolean;
  timeoutMinutes: number;
}

export interface DiagnosticResult {
  testId: string;
  userId: number;
  totalProblems: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  completedAt: string;
  durationMinutes: number;
}
