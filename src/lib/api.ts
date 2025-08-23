// API 기본 설정 및 클라이언트
import { 
  DiagnosticStartRequest,
  DiagnosticStartResponse,
  DiagnosticStatusResponse,
  DiagnosticSubmitRequest,
  DiagnosticSubmitResponse,
  DiagnosticTimeoutResponse,
  Problem,
  ApiErrorResponse 
} from '@/types/diagnostics';
import { mockDiagnosticsData, mockProblemsData } from '@/mock';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com/v1';

// 개발 환경에서 모킹 데이터 사용 여부
const USE_MOCK_DATA = process.env.NODE_ENV === 'development'; // 강제로 모킹 데이터 사용

// 공통 헤더 생성 함수
const createHeaders = (options: {
  auth?: boolean;
  idempotencyKey?: string;
  requestId?: string;
  contentType?: string;
} = {}) => {
  const headers: Record<string, string> = {};

  if (options.auth) {
    // TODO: JWT 토큰을 실제로 가져오는 로직 구현
    headers['Authorization'] = 'Bearer <JWT_TOKEN>';
  }

  if (options.idempotencyKey) {
    headers['Idempotency-Key'] = options.idempotencyKey;
  }

  if (options.requestId) {
    headers['X-Request-Id'] = options.requestId;
  }

  if (options.contentType) {
    headers['Content-Type'] = options.contentType;
  }

  return headers;
};

// 고유 ID 생성 함수
const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// 지연 시뮬레이션 (실제 API 호출과 비슷하게)
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

// API 클라이언트
export const apiClient = {
  // 진단 테스트 API
  diagnostics: {
    // 1-1. 진단 자격 확인
    checkEligibility: async (userId: number): Promise<any> => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();
        return mockDiagnosticsData.eligibility;
      }

      const requestId = generateId('req_elig');
      const response = await fetch(`${API_BASE_URL}/v1/diagnostics/eligibility?userId=${userId}`, {
        method: 'GET',
        headers: createHeaders({ requestId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },

    // 1-2. 진단 시작
    start: async (userId: number, data: DiagnosticStartRequest): Promise<DiagnosticStartResponse> => {
      console.log('🌐 API Client - diagnostics.start 호출됨');
      console.log('👤 userId:', userId);
      console.log('📊 요청 데이터:', data);
      
      if (USE_MOCK_DATA) {
        console.log('🎭 모킹 데이터 사용');
        await simulateApiDelay();
        // userId를 동적으로 설정
        const response = {
          ...mockDiagnosticsData.start,
          userId
        };
        console.log('🎭 모킹 응답:', response);
        return response;
      }

      const requestId = generateId('req_diag_start');
      const idempotencyKey = generateId('idem_diag_start');
      
      const response = await fetch(`${API_BASE_URL}/v1/diagnostics/start?userId=${userId}`, {
        method: 'POST',
        headers: createHeaders({
          auth: true,
          idempotencyKey,
          requestId,
          contentType: 'application/json'
        }),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },

    // 1-3. 진단 상태 조회
    getStatus: async (testId: string, userId: number): Promise<DiagnosticStatusResponse> => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();
        return {
          ...mockDiagnosticsData.status,
          testId,
          userId
        };
      }

      const requestId = generateId('req_diag_status');
      
      const response = await fetch(`${API_BASE_URL}/v1/diagnostics/${testId}/status?userId=${userId}`, {
        method: 'GET',
        headers: createHeaders({ auth: true, requestId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },

    // 1-4. 답안 제출
    submit: async (testId: string, userId: number, data: DiagnosticSubmitRequest): Promise<DiagnosticSubmitResponse> => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();
        return mockDiagnosticsData.submit;
      }

      const requestId = generateId('req_diag_submit');
      const idempotencyKey = generateId('idem_diag_submit');
      
      const response = await fetch(`${API_BASE_URL}/v1/diagnostics/${testId}/submit?userId=${userId}`, {
        method: 'POST',
        headers: createHeaders({
          auth: true,
          idempotencyKey,
          requestId,
          contentType: 'application/json'
        }),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },

    // 1-5. 타임아웃 체크
    checkTimeout: async (testId: string, userId: number): Promise<DiagnosticTimeoutResponse> => {
      if (USE_MOCK_DATA) {
        await simulateApiDelay();
        return mockDiagnosticsData.timeout;
      }

      const requestId = generateId('req_timeout');
      
      const response = await fetch(`${API_BASE_URL}/v1/diagnostics/${testId}/timeout-check?userId=${userId}`, {
        method: 'GET',
        headers: createHeaders({ auth: true, requestId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    }
  },

  // 문제 조회 API
  problems: {
    // 2-1. 문제 단건 조회(안전)
    getProblem: async (problemId: string): Promise<Problem> => {
      if (USE_MOCK_DATA) {
        console.log('🎭 모킹 데이터 - 문제 조회:', problemId);
        await simulateApiDelay();
        
        // 문제 ID로 문제 찾기
        const problem = mockProblemsData[problemId];
        if (!problem) {
          throw new Error(`문제를 찾을 수 없습니다: ${problemId}`);
        }
        
        console.log('🎭 찾은 문제:', problem);
        return problem;
      }

      const requestId = generateId('req_problem');
      
      const response = await fetch(`${API_BASE_URL}/v1/problems/${problemId}`, {
        method: 'GET',
        headers: createHeaders({ auth: true, requestId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    }
  },

  // 소단원별 문제 API
  units: {
    // 2-2. 소단원별 첫 번째 문제 조회 (문제 배열ID 포함 + 이어풀기 기능)
    getFirstProblem: async (unitId: string, userId?: number): Promise<any> => {
      if (USE_MOCK_DATA) {
        console.log('🎭 모킹 데이터 - 소단원 첫 문제 조회:', unitId);
        await simulateApiDelay();
        
        // 모킹 데이터 사용
        const response = mockDiagnosticsData.unitFirstProblem;
        
        console.log('🎭 소단원 첫 문제 응답:', response);
        return response;
      }

      const requestId = generateId('req_first_problem');
      const queryParams = userId ? `?userId=${userId}` : '';
      
      const response = await fetch(`${API_BASE_URL}/v1/units/${unitId}/first-problem${queryParams}`, {
        method: 'GET',
        headers: createHeaders({ auth: true, requestId })
      });
 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  }
};

// 에러 처리 유틸리티
export const handleApiError = (error: any): ApiErrorResponse => {
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      details: [],
      traceId: generateId('error')
    };
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: '알 수 없는 오류가 발생했습니다',
    details: [],
    traceId: generateId('error')
  };
};