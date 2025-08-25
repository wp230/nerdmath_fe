# NerdMath - 수학 학습 플랫폼

AI 기반 진단 테스트로 개인 맞춤형 수학 학습을 경험할 수 있는 플랫폼입니다.

## 🚀 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가하세요:

```bash
# API 기본 URL (선택사항)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/v1

# 강제 Mock 모드 (개발용)
NEXT_PUBLIC_FORCE_MOCK=true

# 환경 설정
NEXT_PUBLIC_ENV=development
```

### Mock 서비스 사용

#### 방법 1: UI 토글 버튼 (권장)

- 우측 하단의 🔧 Mock 버튼을 클릭하여 Mock 모드를 ON/OFF
- Mock Mode가 ON이면 모든 서비스에서 Mock 데이터 사용
- Mock Mode가 OFF이면 실제 API 호출

#### 방법 2: 개발자 도구에서 직접 제어

```javascript
// Mock 모드 토글
window.toggleMockMode();

// Mock 모드 활성화
window.enableMockMode();

// Mock 모드 비활성화
window.disableMockMode();

// 현재 상태 확인
window.mockServiceManager.logStatus();
```

#### 방법 3: 환경 변수로 설정

```bash
# .env.local에 추가
NEXT_PUBLIC_FORCE_MOCK=true
```

### API 서비스 사용

실제 API를 사용하려면:

1. `.env.local`에서 `NEXT_PUBLIC_FORCE_MOCK` 제거 또는 `false`로 설정
2. `NEXT_PUBLIC_API_BASE_URL`에 실제 API 서버 URL 설정
3. Mock 모드 토글 버튼을 OFF로 설정

## 📁 프로젝트 구조

```
fe-new/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   ├── components/          # React 컴포넌트
│   ├── hooks/              # Custom React Hooks
│   ├── service/            # API 및 Mock 서비스
│   ├── stores/             # Zustand 상태 관리
│   └── types/              # TypeScript 타입 정의
├── public/                 # 정적 파일
└── package.json
```

## 🔧 주요 기능

### 1. 진단 테스트

- AI 기반 수학 실력 진단
- 개인 맞춤형 학습 계획 수립

### 2. 어휘 학습

- 수학 용어 체계적 학습
- 어원과 이미지 포함

### 3. 수학 학습

- 개념 이해부터 문제 풀이까지
- 단계별 체계적 학습

### 4. Mock 서비스 통합 관리

- 하나의 토글로 전체 시스템 Mock 모드 제어
- 개발/테스트 환경에서 쉽게 Mock 데이터 사용

## 🛠️ 개발 도구

### Mock 서비스 제어

- **토글 버튼**: 우측 하단에서 Mock 모드 ON/OFF
- **상태 표시**: 현재 Mock/API 모드 상태 확인
- **자동 저장**: 설정 변경 시 로컬 스토리지에 자동 저장

### 서비스 통합

모든 서비스가 `MockServiceManager`를 통해 중앙 집중식으로 Mock 모드를 관리합니다:

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

1. 우측 하단 🔧 Mock 버튼 클릭
2. Mock Mode가 ON으로 변경
3. 모든 서비스에서 Mock 데이터 사용

### 테스트 완료 후 API 모드 복원

1. 🔧 Mock 버튼 다시 클릭
2. Mock Mode가 OFF로 변경
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
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
