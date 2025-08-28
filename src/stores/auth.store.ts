import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginUser } from '@/types/auth';

interface AuthState {
  // 상태
  isLoggedIn: boolean;
  user: LoginUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;

  // 액션
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: LoginUser
  ) => void;
  logout: () => void;
  setUser: (user: LoginUser) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setLoading: (isLoading: boolean) => void;
  updateUserProfile: (updates: Partial<LoginUser>) => void;
  // 토큰 복원 및 상태 동기화
  hydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isLoggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      // 로그인
      login: (tokens, user) => {
        set({
          isLoggedIn: true,
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isLoading: false,
        });

        // localStorage에도 토큰 저장 (apiClient에서 사용)
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        }
      },

      // 로그아웃
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoading: false,
        });

        // localStorage에서 토큰 제거
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      },

      // 사용자 정보 설정
      setUser: (user) => {
        set({ user });
      },

      // 토큰 설정
      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });

        // localStorage에도 업데이트
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        }
      },

      // 로딩 상태 설정
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // 사용자 프로필 부분 업데이트
      updateUserProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...updates,
            },
          });
        }
      },

      // 토큰 복원 및 상태 동기화
      hydrateAuth: () => {
        if (typeof window === 'undefined') return;

        const storedToken = localStorage.getItem('accessToken');
        const currentState = get();

        // localStorage에 토큰이 있지만 상태에는 로그인되지 않은 경우
        if (storedToken && !currentState.isLoggedIn) {
          // 토큰이 있으면 로그인 상태로 설정 (persist에서 user 정보는 복원됨)
          set({
            isLoggedIn: true,
            accessToken: storedToken,
          });
        }
        // localStorage에 토큰이 없지만 상태는 로그인된 경우
        else if (!storedToken && currentState.isLoggedIn) {
          // 로그아웃 처리
          set({
            isLoggedIn: false,
            user: null,
            accessToken: null,
            refreshToken: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        // persist할 필드들만 선택
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// 편의 함수들
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useHydrateAuth = () => useAuthStore((state) => state.hydrateAuth);
