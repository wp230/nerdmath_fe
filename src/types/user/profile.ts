// 사용자 프로필 타입

import { BaseEntity, UserId, Gender } from '../common/database';

// 사용자 기본 정보
export interface User extends BaseEntity {
  userId: UserId;
  email: string;
  password: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  nickname: string;
  gender: Gender;
  emailVerified: boolean;
  isActive: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing?: boolean;
}

// 사용자 생성 요청
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  phoneNumber: string;
  nickname: string;
  gender: Gender;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing?: boolean;
}

// 사용자 정보 수정 요청
export interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  nickname?: string;
  gender?: Gender;
  agreeMarketing?: boolean;
}

// 사용자 프로필 조회 응답
export interface UserProfileResponse {
  userId: UserId;
  email: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  nickname: string;
  gender: Gender;
  emailVerified: boolean;
  isActive: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  createdAt: string;
}

// 사용자 정보 요약
export interface UserSummary {
  userId: UserId;
  name: string;
  nickname: string;
  emailVerified: boolean;
  isActive: boolean;
}

// 사용자 검색 필터
export interface UserSearchFilter {
  email?: string;
  name?: string;
  nickname?: string;
  gender?: Gender;
  isActive?: boolean;
  emailVerified?: boolean;
}
