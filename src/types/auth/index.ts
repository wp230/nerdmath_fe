// ============================================================================
// 사용자 타입 (로그인용)
// ============================================================================

export interface LoginUser {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  emailVerified: number; // 0: 미인증, 1: 인증완료
}

// ============================================================================
// 로그인 관련 타입
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: LoginUser;
}

// ============================================================================
// 회원가입 관련 타입
// ============================================================================

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string; // YYYY-MM-DD 형식
  phoneNumber: string;
  nickname: string;
  gender: 'male' | 'female';
}

export interface RegisterResponse {
  userId: number;
  email: string;
  message: string;
}

// ============================================================================
// 이메일 인증 관련 타입
// ============================================================================

export interface SendVerificationRequest {
  email: string;
}

export interface SendVerificationResponse {
  message: string;
  email: string;
  expiresIn: string;
}

export interface CheckVerificationRequest {
  email: string;
  code: string;
}

export interface CheckVerificationResponse {
  emailVerified?: boolean; // 대문자 버전 (실제 응답)
  message: string;
}

// ============================================================================
// 프로필 조회 관련 타입
// ============================================================================

export interface ProfileResponse {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  birthDate: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  emailVerified: number; // 0: 미인증, 1: 인증완료
  createdAt: string;
}

// ============================================================================
// 로그아웃 관련 타입
// ============================================================================

export interface LogoutResponse {
  message: string;
}

// ============================================================================
// 폼 검증 관련 타입
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  nickname: string;
  gender: 'male' | 'female' | '';
  verificationCode: string;
}

// ============================================================================
// 에러 관련 타입
// ============================================================================

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

// ============================================================================
// 검증 규칙 타입
// ============================================================================

export interface ValidationRules {
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
  name: {
    minLength: number;
    maxLength: number;
  };
  nickname: {
    minLength: number;
    maxLength: number;
  };
  phoneNumber: {
    pattern: RegExp;
  };
}

// 기본 검증 규칙
export const defaultValidationRules: ValidationRules = {
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
  name: {
    minLength: 2,
    maxLength: 20,
  },
  nickname: {
    minLength: 2,
    maxLength: 30,
  },
  phoneNumber: {
    pattern: /^010-\d{4}-\d{4}$/,
  },
};
