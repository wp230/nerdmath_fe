// 법정대리인 타입

import { BaseEntity, UserId } from '../common/database';

// 법정대리인 정보
export interface GuardianInfo extends BaseEntity {
  guardianId: number;
  userId: UserId;
  name: string;
  phoneNumber: string;
  consent: boolean;
}

// 법정대리인 생성 요청
export interface CreateGuardianRequest {
  userId: UserId;
  name: string;
  phoneNumber: string;
  consent: boolean;
}

// 법정대리인 수정 요청
export interface UpdateGuardianRequest {
  name?: string;
  phoneNumber?: string;
  consent?: boolean;
}

// 법정대리인 정보 응답
export interface GuardianInfoResponse {
  guardianId: number;
  userId: UserId;
  name: string;
  phoneNumber: string;
  consent: boolean;
  createdAt: string;
}
