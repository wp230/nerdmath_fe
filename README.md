# 수학 진단 테스트 시스템

Next.js 14와 React 18을 기반으로 한 개인 맞춤형 수학 학습 진단 시스템입니다.

## 🚀 주요 기능

### 진단 테스트 기능

- **자격 확인**: 사용자의 진단 테스트 참여 자격 확인
- **학년 선택**: 중학교 1-3학년 범위 선택
- **문제 풀이**: 20문제 진단 테스트 진행
- **타임아웃 관리**: 30분 제한 시간 및 경고 시스템
- **결과 분석**: 상세한 진단 결과 및 성취도 표시

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18
- **상태관리**: Zustand
- **서버 통신**: React Query (TanStack Query)
- **HTTP 클라이언트**: Axios
- **스타일링**: Tailwind CSS
- **언어**: TypeScript

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── diagnostics/        # 진단 테스트 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/             # React 컴포넌트
│   └── diagnostics/       # 진단 테스트 관련 컴포넌트
│       ├── DiagnosticsContainer.tsx  # 메인 컨테이너
│       ├── GradeSelection.tsx        # 학년 선택
│       ├── ProblemSolver.tsx         # 문제 풀이
│       ├── TestResult.tsx            # 테스트 결과
│       └── TimeoutChecker.tsx        # 타임아웃 체크
├── hooks/                  # React Query 훅
│   └── useDiagnostics.ts  # 진단 테스트 관련 훅
├── service/                # API 서비스 레이어
│   └── diagnosticsService.ts  # 진단 테스트 API
├── stores/                 # Zustand 스토어
│   └── diagnosticsStore.ts    # 진단 테스트 상태 관리
└── types/                  # TypeScript 타입 정의
    └── diagnostics.ts      # 진단 테스트 관련 타입
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API 설정
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# 환경 설정
NODE_ENV=development

# Mock 모드 활성화 (개발 환경에서만)
NEXT_PUBLIC_USE_MOCK=true
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 브라우저에서 확인

http://localhost:3000/diagnostics 접속

## 📋 API 명세

### 진단 테스트 자격 확인

- **GET** `/v1/diagnostics/eligibility?userId=12345`
- 사용자의 진단 테스트 참여 자격 확인

### 진단 테스트 시작

- **POST** `/v1/diagnostics/start?userId=12345`
- 학년 범위 설정 후 테스트 시작

### 답안 제출

- **POST** `/v1/diagnostics/{testId}/submit?userId=12345`
- 사용자 답안 제출 및 다음 문제 정보 반환

### 타임아웃 체크

- **GET** `/v1/diagnostics/{testId}/timeout-check?userId=12345`
- 30분 제한 시간 체크

## 🎯 구현 특징

### 1. 책임 분리

- **UI 컴포넌트**: 순수한 프레젠테이션 로직
- **컨테이너**: 비즈니스 로직 및 상태 관리
- **훅**: React Query를 통한 데이터 페칭
- **서비스**: API 호출 로직
- **스토어**: 전역 상태 관리

### 2. 개발/운영 환경 분리

- 개발 환경: Mock 데이터 사용
- 운영 환경: 실제 API 호출
- 환경 변수로 자동 전환

### 3. 사용자 경험

- 로딩 상태 표시
- 에러 처리 및 복구
- 진행률 표시
- 타임아웃 경고
- 반응형 디자인

## 🔄 상태 관리 흐름

1. **자격 확인** → `useDiagnosticEligibility`
2. **학년 선택** → `useStartDiagnosticTest`
3. **문제 풀이** → `useSubmitAnswer`
4. **타임아웃 체크** → `useTimeoutCheck`
5. **결과 표시** → Zustand 스토어 상태 기반

## 🧪 테스트 방법

### Mock 모드 (개발 환경)

- 실제 API 없이도 기능 테스트 가능
- 랜덤 데이터로 다양한 시나리오 시뮬레이션
- React Query DevTools로 쿼리 상태 확인

### 실제 API 연동

- 환경 변수에서 Mock 모드 비활성화
- 실제 백엔드 API 엔드포인트 설정
- JWT 토큰 인증 설정

## 🚨 주의사항

- 개발 환경에서는 Mock 데이터가 사용됩니다
- 실제 운영 환경에서는 Mock 모드를 비활성화해야 합니다
- JWT 토큰은 localStorage에 저장되므로 보안에 주의하세요
- 타임아웃은 30분으로 설정되어 있습니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
