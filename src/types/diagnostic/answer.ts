// 답안 제출 타입

import { BaseEntity, ObjectId, UserId } from '../common/database';

// 사용자 답안
export interface UserAnswer {
  value: string | number;
  unit?: string;
  explanation?: string;
}

// 답안 제출 요청
export interface SubmitAnswerRequest {
  problemId: ObjectId;
  userAnswer: UserAnswer;
  durationSeconds: number;
}

// 답안 제출 응답
export interface SubmitAnswerResponse {
  answerId: ObjectId;
  isCorrect: boolean | null;
  nextProblemId?: ObjectId;
  answeredCount: number;
  remainingCount: number;
}

// 답안 시도 기록
export interface AnswerAttempt extends BaseEntity {
  answerId: ObjectId;
  userId: UserId;
  problemId: ObjectId;
  mode: 'diagnostic' | 'practice' | 'review';
  setId?: ObjectId;
  unitId: ObjectId;
  userAnswer: UserAnswer;
  isCorrect: boolean;
  vocaId?: ObjectId;
  scoredAt: Date;
  explanationShown?: boolean;
  problemOrderIndex?: number;
  idempotencyKey?: string;
}

// 답안 채점 결과
export interface AnswerScoringResult {
  answerId: ObjectId;
  isCorrect: boolean;
  score?: number;
  feedback?: string;
  correctAnswer?: string;
  explanation?: string;
}

// 답안 통계
export interface AnswerStatistics {
  totalAttempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  averageTime: number;
}

// 답안 히스토리
export interface AnswerHistory {
  answerId: ObjectId;
  problemId: ObjectId;
  userAnswer: UserAnswer;
  isCorrect: boolean;
  scoredAt: string;
  durationSeconds: number;
}
