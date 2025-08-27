import { apiRequest } from './apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  SocialLoginRequest,
  SocialLoginResponse,
  CheckUsernameRequest,
  CheckUsernameResponse,
  CheckEmailRequest,
  CheckEmailResponse,
} from '@/types/auth';

// ============================================================================
// 로그인 관련 API
// ============================================================================

/**
 * 사용자 로그인
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiRequest.post<LoginResponse>('/auth/login', data);
  return response.data;
};

/**
 * 사용자 로그아웃
 */
export const logout = async (): Promise<void> => {
  await apiRequest.post('/auth/logout');
};

/**
 * 토큰 새로고침
 */
export const refreshToken = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const response = await apiRequest.post<RefreshTokenResponse>(
    '/auth/refresh',
    data
  );
  return response.data;
};

// ============================================================================
// 회원가입 관련 API
// ============================================================================

/**
 * 사용자 회원가입
 */
export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await apiRequest.post<RegisterResponse>(
    '/auth/register',
    data
  );
  return response.data;
};

/**
 * 인증 코드 전송
 */
export const sendVerificationCode = async (
  data: SendVerificationCodeRequest
): Promise<SendVerificationCodeResponse> => {
  const response = await apiRequest.post<SendVerificationCodeResponse>(
    '/auth/send-verification-code',
    data
  );
  return response.data;
};

/**
 * 인증 코드 검증
 */
export const verifyCode = async (
  data: VerifyCodeRequest
): Promise<VerifyCodeResponse> => {
  const response = await apiRequest.post<VerifyCodeResponse>(
    '/auth/verify-code',
    data
  );
  return response.data;
};

// ============================================================================
// 계정 검증 관련 API
// ============================================================================

/**
 * 사용자명 중복 확인
 */
export const checkUsername = async (
  data: CheckUsernameRequest
): Promise<CheckUsernameResponse> => {
  const response = await apiRequest.post<CheckUsernameResponse>(
    '/auth/check-username',
    data
  );
  return response.data;
};

/**
 * 이메일 중복 확인
 */
export const checkEmail = async (
  data: CheckEmailRequest
): Promise<CheckEmailResponse> => {
  const response = await apiRequest.post<CheckEmailResponse>(
    '/auth/check-email',
    data
  );
  return response.data;
};

// ============================================================================
// 비밀번호 관련 API
// ============================================================================

/**
 * 비밀번호 재설정
 */
export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await apiRequest.post<ResetPasswordResponse>(
    '/auth/reset-password',
    data
  );
  return response.data;
};

/**
 * 비밀번호 변경
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await apiRequest.patch<ChangePasswordResponse>(
    '/auth/change-password',
    data
  );
  return response.data;
};

// ============================================================================
// 프로필 관련 API
// ============================================================================

/**
 * 프로필 업데이트
 */
export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiRequest.patch<UpdateProfileResponse>(
    '/auth/profile',
    data
  );
  return response.data;
};

/**
 * 현재 사용자 정보 조회
 */
export const getCurrentUser = async () => {
  const response = await apiRequest.get('/auth/me');
  return response.data;
};

// ============================================================================
// 소셜 로그인 관련 API (향후 확장용)
// ============================================================================

/**
 * 소셜 로그인
 */
export const socialLogin = async (
  data: SocialLoginRequest
): Promise<SocialLoginResponse> => {
  const response = await apiRequest.post<SocialLoginResponse>(
    '/auth/social-login',
    data
  );
  return response.data;
};

/**
 * 소셜 계정 연결
 */
export const linkSocialAccount = async (
  data: SocialLoginRequest
): Promise<void> => {
  await apiRequest.post('/auth/link-social', data);
};

/**
 * 소셜 계정 연결 해제
 */
export const unlinkSocialAccount = async (provider: string): Promise<void> => {
  await apiRequest.delete(`/auth/unlink-social/${provider}`);
};
