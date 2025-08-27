import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import * as authApi from '@/services/core/auth.api';
import { authQueryKeys } from './queryKeys';
import type {
  LoginRequest,
  RegisterRequest,
  SendVerificationCodeRequest,
  VerifyCodeRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  CheckUsernameRequest,
  CheckEmailRequest,
} from '@/types/auth';

// ============================================================================
// 로그인 훅
// ============================================================================

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: loginStore, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      loginStore(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        response.user
      );
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// ============================================================================
// 로그아웃 훅
// ============================================================================

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: logoutStore, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      logoutStore();
      queryClient.clear(); // 모든 쿼리 캐시 클리어
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // 서버 로그아웃이 실패해도 클라이언트에서는 로그아웃 처리
      logoutStore();
      queryClient.clear();
      router.push('/login');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// ============================================================================
// 회원가입 훅
// ============================================================================

export const useRegisterMutation = () => {
  const router = useRouter();
  const { login: loginStore, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      loginStore(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        response.user
      );
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// ============================================================================
// 인증 코드 전송 훅
// ============================================================================

export const useSendVerificationCodeMutation = () => {
  return useMutation({
    mutationFn: (data: SendVerificationCodeRequest) =>
      authApi.sendVerificationCode(data),
    onError: (error) => {
      console.error('Send verification code failed:', error);
    },
  });
};

// ============================================================================
// 인증 코드 검증 훅
// ============================================================================

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: (data: VerifyCodeRequest) => authApi.verifyCode(data),
    onError: (error) => {
      console.error('Verify code failed:', error);
    },
  });
};

// ============================================================================
// 비밀번호 재설정 훅
// ============================================================================

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      console.error('Reset password failed:', error);
    },
  });
};

// ============================================================================
// 비밀번호 변경 훅
// ============================================================================

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onError: (error) => {
      console.error('Change password failed:', error);
    },
  });
};

// ============================================================================
// 프로필 업데이트 훅
// ============================================================================

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (response) => {
      setUser(response.user);
      // 현재 사용자 쿼리 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser(),
      });
    },
    onError: (error) => {
      console.error('Update profile failed:', error);
    },
  });
};

// ============================================================================
// 사용자명 중복 확인 훅
// ============================================================================

export const useCheckUsernameMutation = () => {
  return useMutation({
    mutationFn: (data: CheckUsernameRequest) => authApi.checkUsername(data),
    onError: (error) => {
      console.error('Check username failed:', error);
    },
  });
};

// ============================================================================
// 이메일 중복 확인 훅
// ============================================================================

export const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: (data: CheckEmailRequest) => authApi.checkEmail(data),
    onError: (error) => {
      console.error('Check email failed:', error);
    },
  });
};
