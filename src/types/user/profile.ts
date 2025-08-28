// 사용자 프로필 타입

import { BaseEntity, UserId, Gender } from '../common/database';

// 사용자 기본 정보 (테이블 정의서 기준)
export interface User extends BaseEntity {
  userId: UserId;
  email: string;
  password: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  nickname: string;
  gender: Gender;
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
}

// 사용자 정보 수정 요청
export interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  nickname?: string;
  gender?: Gender;
}

// 사용자 프로필 조회 응답 (API 응답 기준)
export interface UserProfileResponse {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  birthDate: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  emailVerified: number;
  createdAt: string;
}

// 사용자 정보 요약
export interface UserSummary {
  userId: UserId;
  name: string;
  nickname: string;
  emailVerified: boolean;
}

// 사용자 검색 필터
export interface UserSearchFilter {
  email?: string;
  name?: string;
  nickname?: string;
  gender?: Gender;
  emailVerified?: boolean;
}
