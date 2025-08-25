# NerdMath - AI 기반 수학 학습 플랫폼

AI 기반 진단 테스트로 개인 맞춤형 수학 학습을 경험할 수 있는 Next.js 기반 웹 플랫폼입니다.

## ✨ 주요 특징

- 🧠 **AI 기반 진단**: 개인 맞춤형 수학 실력 진단 및 학습 계획
- 📚 **체계적 학습**: 개념 이해부터 문제 풀이까지 단계별 학습
- 🗣️ **어휘 학습**: 수학 용어의 체계적 학습 및 어원 이해
- 🔧 **통합 Mock 시스템**: 개발/테스트를 위한 중앙 집중식 Mock 서비스 관리
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 학습 경험

## 🚀 빠른 시작

### 1. 프로젝트 클론 및 설치

```bash
# 저장소 클론
git clone [repository-url]
cd rcp/fe-new

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가하세요:

```bash
# API 기본 URL (선택사항)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/v1

# 강제 Mock 모드 (개발용)
NEXT_PUBLIC_FORCE_MOCK=true

# 환경 설정
NEXT_PUBLIC_ENV=development
```

### 3. 개발 서버 실행

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

## 🔧 Mock 서비스 사용법

### 방법 1: UI 토글 버튼 (권장)

- 우측 하단의 🔧 **Mock** 버튼을 클릭하여 Mock 모드를 ON/OFF
- Mock Mode가 **ON**이면 모든 서비스에서 Mock 데이터 사용
- Mock Mode가 **OFF**이면 실제 API 호출

### 방법 2: 개발자 도구에서 직접 제어

```javascript
// Mock 모드 토글
window.toggleMockMode();

// Mock 모드 활성화
window.enableMockMode();

// Mock 모드 비활성화
window.disableMockMode();

// 현재 상태 확인
window.mockServiceManager.logStatus();

// Math Unit Mock 데이터 강제 로드
window.forceLoadMathUnitData();
```

### 방법 3: 환경 변수로 설정

```bash
# .env.local에 추가
NEXT_PUBLIC_FORCE_MOCK=true
```

## 📁 프로젝트 구조

```
fe-new/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── dashboard/          # 대시보드 페이지
│   │   ├── diagnostics/        # 진단 테스트 페이지
│   │   ├── learning/           # 학습 페이지
│   │   ├── math/               # 수학 학습 페이지
│   │   ├── voca/               # 어휘 학습 페이지
│   │   └── layout.tsx          # 루트 레이아웃
│   ├── components/             # React 컴포넌트
│   │   ├── diagnostics/        # 진단 관련 컴포넌트
│   │   ├── learning/           # 학습 관련 컴포넌트
│   │   ├── math/               # 수학 관련 컴포넌트
│   │   ├── voca/               # 어휘 관련 컴포넌트
│   │   └── dev/                # 개발 도구 컴포넌트
│   ├── hooks/                  # Custom React Hooks
│   │   ├── learning/           # 학습 관련 훅
│   │   ├── math/               # 수학 관련 훅
│   │   └── voca/               # 어휘 관련 훅
│   ├── service/                # API 및 Mock 서비스
│   │   ├── learning/           # 학습 서비스
│   │   ├── math/               # 수학 서비스
│   │   ├── voca/               # 어휘 서비스
│   │   └── mockServiceManager.ts # Mock 서비스 중앙 관리
│   ├── stores/                 # Zustand 상태 관리
│   ├── types/                  # TypeScript 타입 정의
│   └── lib/                    # 유틸리티 함수
├── public/                     # 정적 파일 (폰트, 이미지 등)
├── package.json
└── README.md
```

## 🛠️ 기술 스택

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Mock System**: Custom Mock Service Manager
- **Build Tool**: Turbopack (개발), Webpack (프로덕션)

## 🔧 주요 기능

### 1. 진단 테스트 (Diagnostics)

- AI 기반 수학 실력 진단
- 개인 맞춤형 학습 계획 수립
- 실시간 진행률 추적

### 2. 어휘 학습 (Vocabulary)

- 수학 용어 체계적 학습
- 어원과 이미지 포함
- 단계별 어휘 테스트

### 3. 수학 학습 (Math Learning)

- 개념 이해부터 문제 풀이까지
- 단계별 체계적 학습
- 진행률 및 성취도 추적

### 4. Mock 서비스 통합 관리

- 하나의 토글로 전체 시스템 Mock 모드 제어
- 개발/테스트 환경에서 쉽게 Mock 데이터 사용
- 중앙 집중식 Mock 데이터 관리

## 🎯 Mock 서비스 아키텍처

### MockServiceManager

- **중앙 제어**: 모든 Mock 서비스의 통합 관리
- **동적 전환**: 런타임에 Mock/API 모드 전환
- **자동 저장**: 설정 변경 시 로컬 스토리지에 자동 저장

### 지원 서비스

- **Voca 서비스**: 어휘 관련 Mock 데이터
- **Math 서비스**: 수학 문제 및 진행률 Mock 데이터
- **Learning 서비스**: 학습 콘텐츠 Mock 데이터
- **Diagnostics 서비스**: 진단 테스트 Mock 데이터

## 📝 사용 예시

### 개발 환경에서 Mock 데이터 사용

```bash
# .env.local
NEXT_PUBLIC_FORCE_MOCK=true
NEXT_PUBLIC_ENV=development
```

### 테스트 직전 Mock 모드 활성화

1. 우측 하단 🔧 **Mock** 버튼 클릭
2. Mock Mode가 **ON**으로 변경
3. 모든 서비스에서 Mock 데이터 사용

### 테스트 완료 후 API 모드 복원

1. 🔧 **Mock** 버튼 다시 클릭
2. Mock Mode가 **OFF**로 변경
3. 실제 API 호출로 복원

## 🚀 배포

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 🔍 문제 해결

### Mock 모드가 작동하지 않는 경우

1. **환경 변수 확인**: `.env.local` 파일이 올바르게 설정되었는지 확인
2. **브라우저 캐시 클리어**: `Ctrl + F5`로 강제 새로고침
3. **개발 서버 재시작**: `npm run dev` 중단 후 재시작
4. **콘솔 확인**: 브라우저 개발자 도구에서 에러 메시지 확인

### Math Unit 데이터 로드 실패

```javascript
// 브라우저 콘솔에서 실행
window.forceLoadMathUnitData();
window.isMathUnitDataLoaded();
```

### Mock 서비스 상태 확인

```javascript
// Mock 서비스 상태 확인
window.mockServiceManager.logStatus();

// 현재 Mock 모드 확인
console.log('Mock Mode:', window.mockServiceManager.isMockEnabled());
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해 주세요.

---

**NerdMath** - AI와 함께하는 개인 맞춤형 수학 학습의 새로운 경험을 시작하세요! 🚀
