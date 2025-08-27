import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/common';

interface AuthState {
  // 상태
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;

  // 액션
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: User
  ) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setLoading: (isLoading: boolean) => void;
  updateUserProfile: (updates: Partial<User>) => void;
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
