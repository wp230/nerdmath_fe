// 타입 사용 예시
// 구현용 절대 아님 !!!!

import {
  // 공통 타입
  ObjectId,
  UserId,
  LocalizedText,
  GradeRange,
  Status,
  Gender,
  ProgressStatus,

  // API 타입
  ApiResponse,
  ApiError,
  PaginatedResponse,
  IdempotencyKey,
  HttpStatusCode,

  // 사용자 타입
  User,
  LoginRequest,
  LoginResponse,
  UserProfileResponse,

  // 학습 타입
  Unit,
  Problem,
  ProblemContent,
  ProblemExplanation,

  // 진단 타입
  DiagnosticTest,
  StartDiagnosticRequest,
  StartDiagnosticResponse,
  UserAnswer,
  AnswerAttempt,

  // 열거형
  Subject,
  ProblemType,
  ProblemLevel,
  CognitiveType,
  ActivityType,
  XpReason,
  ChatbotContextType,
  UserClass,
} from '../index';

// 1. API 응답 타입 사용 예시
const apiResponse: ApiResponse<UserProfileResponse> = {
  success: true,
  data: {
    userId: 12345,
    email: 'test@example.com',
    name: '홍길동',
    birthDate: '2010-05-18',
    phoneNumber: '010-1234-5678',
    nickname: 'mathKing',
    gender: 'male',
    emailVerified: true,
    isActive: true,
    agreeTerms: true,
    agreePrivacy: true,
    agreeMarketing: false,
    createdAt: '2025-07-10T12:00:00Z',
  },
};

// 2. 사용자 생성 예시
const createUserRequest: LoginRequest = {
  email: 'newuser@example.com',
  password: 'securePassword123!',
};

// 3. 진단 테스트 시작 예시
const startDiagnosticRequest: StartDiagnosticRequest = {
  gradeRange: {
    min: 1,
    max: 3,
  },
};

// 4. 문제 콘텐츠 생성 예시
const problemContent: ProblemContent = {
  stem: {
    text: '삼각형의 넓이를 구하세요.',
    imageUrl: '/images/problems/triangle.png',
  },
  choices: [
    { key: '①', text: '5cm²' },
    { key: '②', text: '6cm²' },
    { key: '③', text: '7cm²' },
    { key: '④', text: '8cm²' },
  ],
};

// 5. 답안 제출 예시
const userAnswer: UserAnswer = {
  value: '6cm²',
  unit: 'cm²',
};

// 6. 다국어 텍스트 예시
const localizedTitle: LocalizedText = {
  ko: '정수와 유리수',
  en: 'Integers and Rational Numbers',
};

// 7. 열거형 사용 예시
const problemType: ProblemType = ProblemType.OBJECTIVE;
const cognitiveType: CognitiveType = CognitiveType.UNDERSTANDING;
const userClass: UserClass = UserClass.PRE_NERD;

// 8. 페이지네이션 응답 예시
const paginatedUnits: PaginatedResponse<Unit> = {
  items: [
    {
      unitId: '64fa0a111111111111111111',
      subject: Subject.MATH,
      title: localizedTitle,
      grade: 1,
      chapter: 1,
      chapterTitle: '수와 연산',
      orderInGrade: 3,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  nextCursor: 'next_page_cursor',
  totalCount: 50,
};

// 9. 유틸리티 타입 사용 예시
type PartialUser = Partial<User>;
type RequiredUserFields = Required<Pick<User, 'email' | 'password'>>;

// 10. 조건부 타입 사용 예시
type ApiResponseData<T> = T extends ApiResponse<infer U> ? U : never;
type UserProfileData = ApiResponseData<typeof apiResponse>; // UserProfileResponse

console.log('타입 사용 예시가 성공적으로 로드되었습니다!');
