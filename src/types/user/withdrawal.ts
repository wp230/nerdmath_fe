// 회원탈퇴 타입

import { BaseEntity, UserId } from '../common/database';

// 회원 탈퇴 정보
export interface UserWithdrawal extends BaseEntity {
  withdrawalId: number;
  userId: UserId;
  reason?: string;
  withdrawnAt: Date;
}

// 회원 탈퇴 요청
export interface WithdrawalRequest {
  userId: UserId;
  reason?: string;
}

// 회원 탈퇴 응답
export interface WithdrawalResponse {
  withdrawalId: number;
  userId: UserId;
  reason?: string;
  withdrawnAt: string;
  message: string;
}

// 탈퇴 사유 타입
export type WithdrawalReason =
  | '더 이상 사용하지 않음'
  | '서비스 불만족'
  | '개인정보 우려'
  | '학습 목표 달성'
  | '기타';
