// 전체 타입 export

// 공통 타입
export * from './common/api';
export * from './common/database';
export * from './common/enums';
export * from './common/utils';

// 사용자 관련 타입
export * from './user/auth';
export * from './user/profile';
export * from './user/guardian';
export * from './user/withdrawal';

// 학습 콘텐츠 타입
export * from './learning/unit';
export * from './learning/problem';

// 진단 테스트 타입
export * from './diagnostic/test';
export * from './diagnostic/answer';

// 타입 별칭
export type {
  // 공통
  ObjectId,
  UserId,
  LocalizedText,
  GradeRange,
  Status,
  Gender,
  ProgressStatus,

  // API
  ApiResponse,
  ApiError,
  PaginatedResponse,
  IdempotencyKey,
  HttpStatusCode,

  // 사용자
  User,
  LoginRequest,
  LoginResponse,
  UserProfileResponse,

  // 학습
  Unit,
  Problem,
  ProblemContent,
  ProblemExplanation,

  // 진단
  DiagnosticTest,
  StartDiagnosticRequest,
  StartDiagnosticResponse,
  UserAnswer,
  AnswerAttempt,
} from './index';
