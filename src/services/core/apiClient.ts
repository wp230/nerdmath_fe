import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// API 응답 타입 정의
export interface ApiError {
  code: string;
  message: string;
  details: unknown[];
  traceId: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
}

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Authorization 헤더 추가
apiClient.interceptors.request.use(
  (config) => {
    // 토큰 가져오기 (localStorage, cookie, 또는 store에서)
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 공통 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // 401 Unauthorized 처리
    if (error.response?.status === 401) {
      // 토큰 제거 및 로그아웃 처리
      removeAuthToken();

      // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // 에러 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

// 토큰 관리 유틸리티 함수들
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  // localStorage에서 토큰 가져오기
  return localStorage.getItem('accessToken');
}

function removeAuthToken(): void {
  if (typeof window === 'undefined') return;

  // localStorage에서 토큰 제거
  localStorage.removeItem('accessToken');
}

// 토큰 설정 함수 (로그인 시 사용)
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem('accessToken', token);
}

// API 요청 래퍼 함수들
export const apiRequest = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.post<T>(url, data, config),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.put<T>(url, data, config),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.patch<T>(url, data, config),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};

export default apiClient;
