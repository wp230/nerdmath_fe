'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// React Query 클라이언트 생성
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 5분간 캐시 유지
        staleTime: 5 * 60 * 1000,
        // 30분 후 가비지 컬렉션
        gcTime: 30 * 60 * 1000,
        // 에러 재시도 설정
        retry: (failureCount, error: any) => {
          // 401, 403 에러는 재시도하지 않음
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            return false;
          }
          // 최대 2번까지만 재시도
          return failureCount < 2;
        },
        // 윈도우 포커스 시 자동 refetch 비활성화
        refetchOnWindowFocus: false,
      },
      mutations: {
        // 에러 재시도 설정
        retry: (failureCount, error: any) => {
          // 4xx 에러는 재시도하지 않음
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          // 최대 1번까지만 재시도
          return failureCount < 1;
        },
      },
    },
  });
};

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  // 클라이언트를 상태로 관리하여 SSR 호환성 확보
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 React Query DevTools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
};

export default Providers;
