// API 공통 응답 및 에러 타입

// API 응답 기본 구조
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

// API 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: any[];
  traceId?: string;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  totalCount?: number;
}

// API 요청 헤더 타입
export interface ApiHeaders {
  Authorization?: string;
  'Idempotency-Key'?: string;
  'X-Request-Id'?: string;
  'Content-Type'?: string;
}

// 멱등성 키 타입
export type IdempotencyKey = string;

// HTTP 상태 코드
export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 500;
