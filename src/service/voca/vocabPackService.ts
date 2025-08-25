import axios from 'axios';
import { VocabPackResponse, VocabReviewResponse } from '@/types/voca';

// 환경별 API 설정
const getApiConfig = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const env = process.env.NEXT_PUBLIC_ENV || 'development';

  if (!baseUrl && env === 'production') {
    throw new Error('Production 환경에서 API_BASE_URL이 설정되지 않았습니다.');
  }

  return {
    baseURL: baseUrl || 'https://api.example.com/v1',
    timeout: 10000, // 10초
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

// API 헤더 생성 함수
const createHeaders = (requestId: string) => ({
  'X-Request-Id': requestId,
  'Content-Type': 'application/json',
});

// 요청 ID 생성 함수
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Axios 인스턴스 생성
const apiClient = axios.create(getApiConfig());

// 요청 인터셉터 (로깅용)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Response Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('API Network Error:', error.message);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export class VocabPackService {
  // 5-1: 단원별 어휘 조회
  async getUnitVocab(unitId: string): Promise<VocabPackResponse> {
    const requestId = generateRequestId('req_vocab_unit');

    try {
      const response = await apiClient.get(`/vocab/unit/${unitId}`, {
        headers: createHeaders(requestId),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unit vocab:', error);
      throw error;
    }
  }

  // 5-2: 빈출 어휘 조회
  async getCommonVocab(type: string): Promise<VocabPackResponse> {
    const requestId = generateRequestId('req_vocab_common');

    try {
      const response = await apiClient.get(`/vocab/common/${type}`, {
        headers: createHeaders(requestId),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch common vocab:', error);
      throw error;
    }
  }

  // 5-4: 단원별 복습 어휘
  async getUnitReviewVocab(
    unitId: string,
    userId: number
  ): Promise<VocabReviewResponse> {
    const requestId = generateRequestId('req_vocab_review_unit');

    try {
      const response = await apiClient.get(`/vocab/review/unit/${unitId}`, {
        headers: createHeaders(requestId),
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unit review vocab:', error);
      throw error;
    }
  }

  // 5-5: 빈출 어휘 복습
  async getCommonReviewVocab(
    type: string,
    userId: number
  ): Promise<VocabReviewResponse> {
    const requestId = generateRequestId('req_vocab_review_common');

    try {
      const response = await apiClient.get(`/vocab/review/common/${type}`, {
        headers: createHeaders(requestId),
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch common review vocab:', error);
      throw error;
    }
  }

  // 모든 어휘팩 조회 (통합)
  async getAllVocabPacks(userId: number = 12345): Promise<VocabPackResponse[]> {
    try {
      // 실제 구현에서는 서버에서 통합된 API를 제공하거나
      // 여러 API를 병렬로 호출하여 결과를 합치는 방식 사용
      const [unitVocab, satActVocab] = await Promise.all([
        this.getUnitVocab('unit-001'), // Mock 데이터와 일치하는 unitId 사용
        this.getCommonVocab('sat_act'),
      ]);

      return [unitVocab, satActVocab];
    } catch (error) {
      console.error('Failed to fetch all vocab packs:', error);
      throw error;
    }
  }
}
