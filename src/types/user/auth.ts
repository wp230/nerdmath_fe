// 인증 관련 타입

import { BaseEntity, UserId } from '../common/database';

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: UserId;
    email: string;
    name: string;
    nickname: string;
  };
}

// 로그아웃 요청
export interface LogoutRequest {
  userId: UserId;
}

// 토큰 정보
export interface RefreshToken extends BaseEntity {
  authId: number;
  userId: UserId;
  token: string;
  expiresAt: Date;
  isRevoked: boolean;
}

// 이메일 인증
export interface EmailVerification extends BaseEntity {
  verificationId: number;
  userId?: UserId;
  email: string;
  code: number;
  expiresAt: Date;
  isUsed: boolean;
}

// 이메일 인증 요청
export interface SendVerificationRequest {
  email: string;
}

// 이메일 인증 확인
export interface CheckVerificationRequest {
  email: string;
  code: number;
}

// 비밀번호 재설정
export interface PasswordReset extends BaseEntity {
  resetId: number;
  userId: UserId;
  code: number;
  expiresAt: Date;
  used: boolean;
}

// 비밀번호 재설정 요청
export interface RequestPasswordResetRequest {
  email: string;
}

// 비밀번호 재설정 확인
export interface ConfirmPasswordResetRequest {
  email: string;
  code: number;
  newPassword: string;
}

// JWT 페이로드
export interface JwtPayload {
  userId: UserId;
  email: string;
  iat?: number;
  exp?: number;
}
