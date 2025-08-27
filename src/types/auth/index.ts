import type { User } from '@/types/common';

// ============================================================================
// 로그인 관련 타입
// ============================================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 토큰 만료 시간 (초)
}

// ============================================================================
// 회원가입 관련 타입
// ============================================================================

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  verificationCode: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================================================
// 이메일 인증 관련 타입
// ============================================================================

export interface SendVerificationCodeRequest {
  email: string;
  type: 'REGISTER' | 'PASSWORD_RESET';
}

export interface SendVerificationCodeResponse {
  success: boolean;
  message: string;
  expiresIn: number; // 인증코드 만료 시간 (초)
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
  type: 'REGISTER' | 'PASSWORD_RESET';
}

export interface VerifyCodeResponse {
  isValid: boolean;
  message: string;
}

// ============================================================================
// 토큰 관련 타입
// ============================================================================

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================================================
// 비밀번호 재설정 관련 타입
// ============================================================================

export interface ResetPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// 프로필 업데이트 관련 타입
// ============================================================================

export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: string;
}

export interface UpdateProfileResponse {
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// 소셜 로그인 관련 타입 (향후 확장용)
// ============================================================================

export interface SocialLoginRequest {
  provider: 'GOOGLE' | 'KAKAO' | 'NAVER';
  accessToken: string;
}

export interface SocialLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  isNewUser: boolean; // 신규 가입 여부
}

// ============================================================================
// 계정 검증 관련 타입
// ============================================================================

export interface CheckUsernameRequest {
  username: string;
}

export interface CheckUsernameResponse {
  isAvailable: boolean;
  message: string;
}

export interface CheckEmailRequest {
  email: string;
}

export interface CheckEmailResponse {
  isAvailable: boolean;
  message: string;
}

// ============================================================================
// 에러 관련 타입
// ============================================================================

export interface AuthError {
  code: string;
  message: string;
  field?: string; // 특정 필드와 관련된 에러인 경우
}

// ============================================================================
// 폼 검증 관련 타입
// ============================================================================

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  verificationCode: string;
}

export interface ResetPasswordFormData {
  email: string;
  verificationCode: string;
  newPassword: string;
  newPasswordConfirm: string;
}

// ============================================================================
// 검증 규칙 타입
// ============================================================================

export interface ValidationRules {
  username: {
    minLength: number;
    maxLength: number;
    pattern: RegExp;
  };
  password: {
    minLength: number;
    maxLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  email: {
    pattern: RegExp;
  };
  nickname: {
    minLength: number;
    maxLength: number;
  };
}

// 기본 검증 규칙
export const defaultValidationRules: ValidationRules = {
  username: {
    minLength: 4,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 50,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  nickname: {
    minLength: 2,
    maxLength: 20,
  },
};
