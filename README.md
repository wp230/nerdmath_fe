# Math Learning System - Frontend

수학 학습 시스템의 프론트엔드 애플리케이션입니다.

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정 (선택사항)
백엔드 서버가 준비되면 `.env.local` 파일을 생성하고 다음을 추가하세요:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

**참고**: 환경 변수를 설정하지 않으면 개발 모드에서 모킹 데이터를 사용합니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── diagnostics/       # 진단 테스트 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   └── diagnostics/       # 진단 테스트 관련 컴포넌트
├── hooks/                 # 커스텀 훅
│   └── useDiagnostics.ts  # 진단 테스트 로직
├── lib/                   # 유틸리티 및 API 클라이언트
│   └── api.ts            # API 클라이언트 (모킹 데이터 포함)
├── types/                 # TypeScript 타입 정의
│   └── diagnostics.ts     # 진단 테스트 관련 타입
└── ...
```

## 🔧 주요 기능

### 진단 테스트 시스템
- **자격 확인**: 사용자의 진단 테스트 참여 자격 확인
- **테스트 설정**: 학년 범위, 문제 규칙 설정
- **진단 진행**: 실제 문제 풀이 및 답안 제출
- **결과 분석**: 진단 결과 및 학습 계획 제시

### API 클라이언트
- **모킹 데이터**: 백엔드 서버 없이도 프론트엔드 개발 가능
- **실제 API**: 백엔드 서버 준비 시 실제 API 호출로 전환
- **에러 처리**: 일관된 에러 처리 및 사용자 피드백

## 🎯 개발 가이드

### 모킹 데이터 사용
현재는 백엔드 서버가 없어도 모킹 데이터로 전체 플로우를 테스트할 수 있습니다:

1. 진단 자격 확인 → 자격 있음
2. 테스트 설정 → 학년 범위, 문제 규칙 선택
3. 진단 진행 → 모킹 문제 풀이
4. 결과 확인 → 진단 완료

### 실제 API로 전환
백엔드 서버가 준비되면:

1. `.env.local`에 `NEXT_PUBLIC_API_BASE_URL` 설정
2. 모킹 데이터 자동 비활성화
3. 실제 API 호출로 전환

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Fetch API + 모킹 데이터

## 📝 API 명세

### 진단 테스트 API
- `GET /diagnostics/eligibility` - 자격 확인
- `POST /diagnostics/start` - 진단 시작
- `GET /diagnostics/{testId}/status` - 상태 조회
- `POST /diagnostics/{testId}/submit` - 답안 제출
- `GET /diagnostics/{testId}/timeout-check` - 타임아웃 체크

### 문제 및 답안 API
- `GET /problems/{problemId}` - 문제 조회
- `POST /answers/check` - 답안 채점

## 🚧 개발 상태

- ✅ 프로젝트 설정
- ✅ 진단 테스트 UI 컴포넌트
- ✅ API 클라이언트 (모킹 데이터 포함)
- ✅ 커스텀 훅 및 상태 관리
- ✅ 라우팅 및 페이지 구조
- 🔄 백엔드 연동 (준비 중)
- ⏳ 추가 기능 개발

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성
3. 코드 작성 및 테스트
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
