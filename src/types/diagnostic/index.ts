// 2.1. 진단 자격 확인 (Check Eligibility)
export interface EligibilityResponse {
  eligible: boolean;
  reason: string | null;
  existingTestId: string | null;
}

// 2.2. 진단 시작 (Start Test)
export interface GradeRange {
  min: number;
  max: number;
}

export interface StartTestPayload {
  gradeRange: GradeRange;
}

export interface StartTestResponse {
  testId: string;
  userId: number;
  gradeRange: GradeRange;
  startedAt: string;
  firstProblemId: string;
  totalProblems: number;
  isRestart: boolean;
  restartCount: number;
  shuffleSeed: number;
}

// 2.3. 진단 상태 조회 (Get Status)
export interface TestStatusResponse {
  testId: string;
  userId: number;
  completed: boolean;
  answeredCount: number;
  remainingCount: number;
  currentProblemId: string;
  startedAt: string;
  timeoutMinutes: number;
}

// 3.2. 문제 단건 조회 (Get Single Problem)
export interface ProblemChoice {
  key: string;
  text: string;
}

export interface ProblemContent {
  stem: {
    text: string;
  };
  choices: ProblemChoice[];
}

export interface ProblemResponse {
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
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// 2.4. 답안 제출 (Submit Answer)
export interface SubmitAnswerPayload {
  problemId: string;
  userAnswer: {
    value: string; // 예시에서는 value지만, 객관식의 경우 key가 될 수 있음. 유연하게 처리 필요.
  };
  durationSeconds: number;
}

export interface SubmitAnswerResponse {
  answerId: string;
  isCorrect: boolean | null;
  nextProblemId: string | null;
  answeredCount: number;
  remainingCount: number;
}

// 2.5. 진단 완료 (Complete Test)
export interface CompleteTestPayload {
  endedAt: string;
  completed: boolean;
}

export interface CompleteTestResponse {
  testId: string;
  completed: boolean;
  durationSec: number;
  totalProblems: number;
  answeredProblems: number;
  score: number;
  correctCount: number;
  analysisRequested: boolean;
  estimatedAnalysisTime: string;
}

// 2.6. 진단 테스트 재시작 (Restart Test)
export interface RestartTestResponse {
  testId: string;
  restartCount: number;
  shuffleSeed: number;
  firstProblemId: string;
  totalProblems: number;
  message: string;
}

// 2.7. 진단 테스트 타임아웃 체크 (Check Timeout)
export interface TimeoutCheckResponse {
  timedOut: boolean;
  remainingMinutes?: number;
  totalTimeoutMinutes?: number;
  startedAt?: string;
  message?: string;
  durationSec?: number;
}

// 2.8. 진단 분석 결과 조회 (Get Analysis Result)
export interface RecommendedPath {
  unitId: string;
  unitTitle: string;
  priority: number;
  reason: string;
}

export interface AnalysisResultResponse {
  analysisId: string;
  testId: string;
  userId: number;
  aiComment: string;
  class: string;
  recommendedPath: RecommendedPath[];
  generatedAt: string;
}

export interface AnalysisInProgressResponse {
  status: string;
  message: string;
  estimatedCompletionTime: string;
}

// 진단 테스트 UI 상태 타입들
export interface DiagnosticUIState {
  isLoading: boolean;
  error: string | null;
  showModal: boolean;
  modalType: 'error' | 'completion' | 'timeout' | null;
}

// 학년 범위 선택을 위한 타입
export interface GradeOption {
  grade: number;
  label: string;
  description: string;
}

// 문제별 답안 시간 추적을 위한 타입
export interface ProblemTimer {
  problemId: string;
  startTime: number;
  endTime?: number;
  durationSeconds?: number;
}

// 세션 저장을 위한 타입
export interface DiagnosticSession {
  testId: string;
  gradeRange: GradeRange;
  startedAt: string;
  timeoutMinutes: number;
  totalProblems: number;
  currentProblemId: string | null;
  answeredCount: number;
  remainingCount: number;
  completed: boolean;
  shuffleSeed?: number | null;
  persistedAt: string;
}
