import axios from 'axios';
import {
  DiagnosticEligibility,
  DiagnosticStartRequest,
  DiagnosticStartResponse,
  DiagnosticStatus,
  AnswerSubmitRequest,
  AnswerSubmitResponse,
  TimeoutCheckResponse,
} from '@/types/diagnostics';

// API 기본 설정
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 공통 헤더 추가
apiClient.interceptors.request.use((config) => {
  // JWT 토큰이 있다면 추가
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Request ID 생성 (실제로는 UUID 라이브러리 사용 권장)
  config.headers['X-Request-Id'] =
    `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return config;
});

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 진단 테스트 자격 확인
export const checkDiagnosticEligibility = async (
  userId: number
): Promise<DiagnosticEligibility> => {
  const response = await apiClient.get(
    `/v1/diagnostics/eligibility?userId=${userId}`
  );
  return response.data;
};

// 진단 테스트 시작
export const startDiagnosticTest = async (
  userId: number,
  data: DiagnosticStartRequest
): Promise<DiagnosticStartResponse> => {
  const idempotencyKey = `idem_diag_start_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const response = await apiClient.post(
    `/v1/diagnostics/start?userId=${userId}`,
    data,
    {
      headers: {
        'Idempotency-Key': idempotencyKey,
      },
    }
  );

  return response.data;
};

// 진단 테스트 상태 조회
export const getDiagnosticStatus = async (
  testId: string,
  userId: number
): Promise<DiagnosticStatus> => {
  const response = await apiClient.get(
    `/v1/diagnostics/${testId}/status?userId=${userId}`
  );
  return response.data;
};

// 답안 제출
export const submitAnswer = async (
  testId: string,
  userId: number,
  data: AnswerSubmitRequest
): Promise<AnswerSubmitResponse> => {
  const idempotencyKey = `idem_diag_submit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const response = await apiClient.post(
    `/v1/diagnostics/${testId}/submit?userId=${userId}`,
    data,
    {
      headers: {
        'Idempotency-Key': idempotencyKey,
      },
    }
  );

  return response.data;
};

// 타임아웃 체크
export const checkTimeout = async (
  testId: string,
  userId: number
): Promise<TimeoutCheckResponse> => {
  const response = await apiClient.get(
    `/v1/diagnostics/${testId}/timeout-check?userId=${userId}`
  );
  return response.data;
};

// Mock 데이터 (개발 환경용)
export const mockDiagnosticService = {
  checkEligibility: async (userId: number): Promise<DiagnosticEligibility> => {
    // Mock: 항상 자격 있음
    return {
      eligible: true,
      reason: null,
      existingTestId: null,
    };
  },

  startTest: async (
    userId: number,
    data: DiagnosticStartRequest
  ): Promise<DiagnosticStartResponse> => {
    // Mock: 테스트 시작 응답
    return {
      testId: `mock_test_${Date.now()}`,
      userId,
      gradeRange: data.gradeRange,
      startedAt: new Date().toISOString(),
      firstProblemId: `mock_problem_1`,
      totalProblems: 20,
    };
  },

  getStatus: async (
    testId: string,
    userId: number
  ): Promise<DiagnosticStatus> => {
    // Mock: 테스트 상태
    return {
      testId,
      userId,
      completed: false,
      answeredCount: 5,
      remainingCount: 15,
      currentProblemId: `mock_problem_6`,
      startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10분 전 시작
      lastActivityAt: new Date().toISOString(),
      timeoutMinutes: 30,
    };
  },

  submitAnswer: async (
    testId: string,
    userId: number,
    data: AnswerSubmitRequest
  ): Promise<AnswerSubmitResponse> => {
    // 현재 문제 번호 추출
    const currentProblemNum = parseInt(
      data.problemId.replace('mock_problem_', '')
    );

    // 20번 문제가 마지막 문제
    const isLastProblem = currentProblemNum === 20;

    return {
      answerId: `mock_answer_${Date.now()}`,
      isCorrect: Math.random() > 0.5, // 랜덤 정답 여부
      nextProblemId: isLastProblem
        ? null
        : `mock_problem_${currentProblemNum + 1}`,
      answeredCount: currentProblemNum, // ✅ 현재 문제 번호 (풀은 문제 수)
      remainingCount: 20 - currentProblemNum, // ✅ 남은 문제 수
    };
  },

  checkTimeout: async (
    testId: string,
    userId: number
  ): Promise<TimeoutCheckResponse> => {
    // Mock: 타임아웃 체크
    return {
      timedOut: false,
      remainingMinutes: 20,
      totalTimeoutMinutes: 30,
      startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    };
  },
};
