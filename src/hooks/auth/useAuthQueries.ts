import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import * as authApi from '@/services/core/auth.api';
import { authQueryKeys } from './queryKeys';

// ============================================================================
// 현재 사용자 정보 조회 훅
// ============================================================================

export const useCurrentUserQuery = () => {
  const { isLoggedIn, user, setUser } = useAuthStore();

  const query = useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: authApi.getProfile,
    enabled: isLoggedIn && !!user, // 로그인 상태이고 유저 정보가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시된 데이터 사용
    gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
  });

  // 성공 시 사용자 정보 업데이트 (ProfileResponse를 LoginUser로 변환)
  useEffect(() => {
    if (query.isSuccess && query.data) {
      const loginUser = {
        userId: query.data.userId,
        email: query.data.email,
        name: query.data.name,
        nickname: query.data.nickname,
        emailVerified: query.data.emailVerified,
      };
      setUser(loginUser);
    }
  }, [query.isSuccess, query.data, setUser]);

  // 에러 시 로깅
  useEffect(() => {
    if (query.isError) {
      console.error('Failed to fetch current user:', query.error);
    }
  }, [query.isError, query.error]);

  return query;
};
