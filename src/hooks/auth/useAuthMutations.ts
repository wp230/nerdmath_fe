import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import * as authApi from '@/services/core/auth.api';
import { authQueryKeys } from './queryKeys';
import type {
  LoginRequest,
  RegisterRequest,
  SendVerificationRequest,
  CheckVerificationRequest,
} from '@/types/auth/index';

// ============================================================================
// 로그인 훅
// ============================================================================

export const useLoginMutation = () => {
  const { login: loginStore, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      console.log('=== 로그인 요청 시작 ===');
      console.log('요청 데이터:', data);

      try {
        const result = await authApi.login(data);
        console.log('=== 로그인 API 응답 성공 ===');
        console.log('전체 응답:', result);
        console.log('응답 타입:', typeof result);
        console.log('응답 키들:', Object.keys(result));

        if (result.user) {
          console.log('사용자 정보:', result.user);
          console.log('이메일 인증 상태:', result.user.emailVerified);
          console.log(
            '이메일 인증 상태 타입:',
            typeof result.user.emailVerified
          );
        }

        return result;
      } catch (error) {
        console.log('=== 로그인 API 에러 ===');
        console.log('에러 전체:', error);
        throw error;
      }
    },
    onMutate: () => {
      console.log('=== 로그인 뮤테이션 시작 ===');
      setLoading(true);
    },
    onSuccess: (response) => {
      console.log('=== 로그인 뮤테이션 성공 ===');
      console.log('최종 응답:', response);

      loginStore(
        {
          accessToken: response.accessToken,
          refreshToken: '', // API에서 refreshToken 미제공
        },
        response.user
      );
      // 리다이렉트는 컴포넌트에서 처리하도록 변경
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
  const { setLoading } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      // 회원가입 완료 후 로그인 페이지로 이동
      console.log('회원가입 완료:', response.message);
      router.push('/login');
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

export const useSendVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: SendVerificationRequest) =>
      authApi.sendVerification(data),
    onError: (error) => {
      console.error('Send verification code failed:', error);
    },
  });
};

// ============================================================================
// 인증 코드 검증 훅
// ============================================================================

export const useCheckVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: CheckVerificationRequest) =>
      authApi.checkVerification(data),
    onError: (error) => {
      console.error('Check verification failed:', error);
    },
  });
};
