# Types Directory

이 디렉토리는 프로젝트의 모든 TypeScript 타입 정의를 포함합니다.

## 📁 디렉토리 구조

```
types/
├── common/           # 공통 타입
│   ├── api.ts       # API 공통 응답, 에러 타입
│   ├── database.ts  # 공통 DB 필드 타입
│   ├── enums.ts     # 공통 열거형 타입
│   └── utils.ts     # 유틸리티 타입
├── user/            # 사용자 관련 타입
│   ├── auth.ts      # 인증 관련 타입
│   ├── profile.ts   # 사용자 프로필 타입
│   ├── guardian.ts  # 법정대리인 타입
│   └── withdrawal.ts # 회원탈퇴 타입
├── learning/        # 학습 콘텐츠 타입
│   ├── unit.ts      # 소단원 타입
│   └── problem.ts   # 문제 타입
├── diagnostic/      # 진단 테스트 타입
│   ├── test.ts      # 진단 테스트 타입
│   └── answer.ts    # 답안 제출 타입
├── examples/        # 타입 사용 예시
│   └── usage-examples.ts
├── index.ts         # 전체 타입 export
└── README.md        # 이 파일
```

## 🚀 사용법

### 1. 전체 타입 import

```typescript
import { User, Problem, DiagnosticTest } from '@/types';
```

### 2. 특정 카테고리만 import

```typescript
import { User, LoginRequest } from '@/types/user';
import { Unit, Problem } from '@/types/learning';
```

### 3. 공통 타입만 import

```typescript
import { ObjectId, UserId, Status } from '@/types/common';
```

## 🔧 핵심 타입

### 공통 타입

- `ObjectId`: MongoDB ObjectId (string)
- `UserId`: 사용자 ID (number)
- `LocalizedText`: 다국어 지원 텍스트
- `Status`: 상태 정보
- `Gender`: 성별 정보

### API 타입

- `ApiResponse<T>`: API 응답 기본 구조
- `ApiError`: API 에러 정보
- `PaginatedResponse<T>`: 페이지네이션 응답

### 사용자 타입

- `User`: 사용자 기본 정보
- `LoginRequest`: 로그인 요청
- `UserProfileResponse`: 사용자 프로필 응답

### 학습 타입

- `Unit`: 소단원 정보
- `Problem`: 문제 정보
- `ProblemContent`: 문제 콘텐츠 구조

### 진단 타입

- `DiagnosticTest`: 진단 테스트 정보
- `UserAnswer`: 사용자 답안
- `AnswerAttempt`: 답안 시도 기록

## 📝 열거형 (Enums)

### 과목 타입

```typescript
enum Subject {
  MATH = 'math',
  SCIENCE = 'science',
  ENGLISH = 'english',
  KOREAN = 'korean',
}
```

### 문제 유형

```typescript
enum ProblemType {
  OBJECTIVE = '객관식',
  SUBJECTIVE = '주관식',
  TRUE_FALSE = '참거짓',
}
```

### 문제 난이도

```typescript
enum ProblemLevel {
  EASY = '하',
  MEDIUM = '중',
  HARD = '상',
}
```

## 🛠️ 유틸리티 타입

### 조건부 타입

```typescript
type Conditional<T, U, V> = T extends U ? V : never;
```

### 중첩 객체 부분 타입

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### 특정 필드만 필수로

```typescript
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

## 📋 타입 확장 가이드

### 1. 새로운 타입 추가

1. 적절한 카테고리 디렉토리에 새 파일 생성
2. 타입 정의 작성
3. `index.ts`에 export 추가

### 2. 기존 타입 수정

1. 해당 타입 파일 수정
2. 변경사항이 다른 타입에 영향을 주는지 확인
3. 필요시 관련 타입도 함께 수정

### 3. 새로운 카테고리 추가

1. 새 디렉토리 생성
2. 타입 파일들 작성
3. `index.ts`에 export 추가

## 🔍 타입 체크

### 컴파일 타임 타입 체크

```typescript
// TypeScript 컴파일러가 자동으로 타입 체크
const user: User = {
  userId: 123,
  email: 'test@example.com',
  // ... 필수 필드들
};
```

### 런타임 타입 가드

```typescript
function isUser(obj: any): obj is User {
  return obj && typeof obj.userId === 'number' && typeof obj.email === 'string';
}
```

## 📚 추가 리소스

- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [TypeScript 유틸리티 타입](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [타입스크립트 핸드북](https://typescript-kr.github.io/)

## 🤝 기여 가이드

1. 새로운 타입을 추가할 때는 기존 네이밍 컨벤션을 따르세요
2. 모든 타입에 적절한 JSDoc 주석을 추가하세요
3. 타입 변경 시 관련된 모든 파일을 함께 수정하세요
4. 새로운 타입을 추가한 후 `examples/usage-examples.ts`에 사용 예시를 추가하세요
