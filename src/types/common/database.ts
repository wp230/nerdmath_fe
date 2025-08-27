// 공통 DB 필드 타입

// MongoDB ObjectId 타입
export type ObjectId = string;

// 공통 DB 필드
export interface BaseEntity {
  createdAt: Date;
  updatedAt?: Date;
}

// 사용자 ID 타입
export type UserId = number;

// 다국어 지원을 위한 타입
export interface LocalizedText {
  ko: string;
  en?: string;
}

// 날짜 범위 타입
export interface DateRange {
  min: Date;
  max: Date;
}

// 학년 범위 타입
export interface GradeRange {
  min: number;
  max: number;
}

// 상태 타입
export type Status = 'active' | 'inactive' | 'deleted' | 'pending';

// 성별 타입
export type Gender = 'male' | 'female';

// 진행 상태 타입
export type ProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'paused';
