// 진단 테스트 타입

import { BaseEntity, ObjectId, UserId, GradeRange } from '../common/database';

// 진단 테스트 정보
export interface DiagnosticTest extends BaseEntity {
  testId: ObjectId;
  userId: UserId;
  gradeRange: GradeRange;
  selectedRuleSnapshot?: {
    perUnit: number;
    perLevel: number;
  };
  restartCount: number;
  shuffleSeed?: number;
  timeoutMinutes: number;
  startedAt: Date;
  endedAt?: Date;
  durationSec?: number;
  completed: boolean;
}

// 진단 테스트 시작 요청
export interface StartDiagnosticRequest {
  gradeRange: GradeRange;
}

// 진단 테스트 시작 응답
export interface StartDiagnosticResponse {
  testId: ObjectId;
  userId: UserId;
  gradeRange: GradeRange;
  startedAt: string;
  firstProblemId: ObjectId;
  totalProblems: number;
  isRestart: boolean;
  restartCount: number;
  shuffleSeed: number;
}

// 진단 테스트 상태 조회 응답
export interface DiagnosticStatusResponse {
  testId: ObjectId;
  userId: UserId;
  completed: boolean;
  answeredCount: number;
  remainingCount: number;
  currentProblemId?: ObjectId;
  startedAt: string;
  timeoutMinutes: number;
}

// 진단 테스트 완료 요청
export interface CompleteDiagnosticRequest {
  endedAt: string;
  completed: boolean;
}

// 진단 테스트 완료 응답
export interface CompleteDiagnosticResponse {
  testId: ObjectId;
  completed: boolean;
  durationSec: number;
  totalProblems: number;
  answeredProblems: number;
  score: number;
  correctCount: number;
  analysisRequested: boolean;
  estimatedAnalysisTime: string;
}

// 진단 테스트 재시작 응답
export interface RestartDiagnosticResponse {
  testId: ObjectId;
  restartCount: number;
  shuffleSeed: number;
  firstProblemId: ObjectId;
  totalProblems: number;
  message: string;
}

// 진단 테스트 타임아웃 체크 응답
export interface TimeoutCheckResponse {
  timedOut: boolean;
  remainingMinutes?: number;
  totalTimeoutMinutes: number;
  startedAt: string;
  message?: string;
  durationSec?: number;
}

// 진단 자격 확인 응답
export interface EligibilityResponse {
  eligible: boolean;
  reason?: string;
  existingTestId?: ObjectId;
}

// 문제 선정 규칙
export interface ProblemSelectionRule {
  perUnit: number;
  perCognitiveType?: Record<string, number>;
  perLevel?: Record<string, number>;
  seed?: number;
}
