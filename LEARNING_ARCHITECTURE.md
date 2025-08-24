# 학습 기능 아키텍처 문서

## 구현 완료 상태

### ✅ 1단계: 단원 선택 기능 (완료)

- [x] 하드코딩된 `hooks/math_Unit.ts` 데이터로 대단원별 소단원 목록 표시
- [x] 사용자가 학습할 단원 선택 (grade, chapter, unitId)
- [x] 선택된 단원 정보를 Zustand store에 저장
- [x] "개념 학습하기" 버튼 클릭 시 개념 학습 단계로 이동 준비

### 🔄 2단계: 개념 학습 기능 (구조만 준비)

- [ ] GET /v1/units/{unitId}/concept → 개념 콘텐츠 조회
- [ ] POST /v1/units/{unitId}/concept/complete → 개념 학습 완료 (XP 20점)
- [ ] 개념 완료 후 문제 풀이로 자동 진행

### 🔄 3단계: 문제 풀이 기능 (구조만 준비)

- [ ] GET /v1/units/{unitId}/first-problem?userId=12345 → 첫 문제 조회
- [ ] POST /v1/answers/check → 채점 + 해설 (정답 15 XP, 오답 10 XP)
- [ ] GET /v1/problems/{problemId} → 다음 문제 조회
- [ ] 완료 시 단원 보너스 10 XP

## 디렉토리 구조

```
fe-new/
├── src/
│   ├── app/
│   │   ├── math/
│   │   │   ├── page.tsx                    # 메인 수학 페이지 (대단원 목록)
│   │   │   └── [id]/
│   │   │       └── page.tsx                # 단원 선택 페이지
│   │   └── learning/
│   │       └── [unitId]/
│   │           └── page.tsx                # 학습 페이지 (향후 구현)
│   ├── components/
│   │   └── learning/
│   │       ├── UnitCard.tsx                # 단원 정보 카드
│   │       ├── GradeSelector.tsx           # 학년 선택
│   │       ├── ChapterList.tsx             # 소단원 목록
│   │       ├── LearningStartButton.tsx     # 학습 시작 버튼
│   │       ├── UnitSelectionContainer.tsx  # 단원 선택 통합 컨테이너
│   │       └── README.md                   # 컴포넌트 설명서
│   ├── hooks/
│   │   ├── math_Unit.ts                    # 단원 데이터 (기존)
│   │   └── useLearning.ts                  # 학습 관련 커스텀 훅
│   ├── service/
│   │   └── learningService.ts              # 학습 서비스 레이어
│   ├── stores/
│   │   └── learningStore.ts                # 학습 상태 관리 (Zustand)
│   └── types/
│       └── learning.ts                     # 학습 관련 타입 정의
└── LEARNING_ARCHITECTURE.md                 # 이 파일
```

## 주요 코드 구조

### 1. 타입 정의 (`types/learning.ts`)

```typescript
// 핵심 타입들
interface Unit, Chapter, SelectedUnit
interface LearningProgress, LearningStage
interface XPSystem
```

### 2. 상태 관리 (`stores/learningStore.ts`)

```typescript
// Zustand 스토어
- selectedUnit: 선택된 단원 정보
- currentStage: 현재 학습 단계
- progress: 학습 진행 상태
- xpSystem: XP 시스템 설정
- totalXP: 총 획득 XP
```

### 3. 서비스 레이어 (`service/learningService.ts`)

```typescript
// LearningService 클래스
- getUnits(), getChapters(), getUnitGradeInfo()
- createSelectedUnit(), calculateProgress()
- Mock API 함수들 (향후 실제 API로 대체)
```

### 4. 커스텀 훅 (`hooks/useLearning.ts`)

```typescript
// useUnitSelection: 단원 선택 로직
// useLearningProgress: 진행 상태 관리
// useLearningRecommendation: 추천 시스템
```

### 5. UI 컴포넌트들

```typescript
// UnitCard: 단원 정보 표시
// GradeSelector: 학년 선택
// ChapterList: 소단원 목록
// LearningStartButton: 학습 시작
// UnitSelectionContainer: 통합 컨테이너
```

## 라우팅 구조

### 현재 구현된 라우팅

- `/math` - 메인 수학 페이지 (대단원 목록)
- `/math/[unitId]` - 단원 선택 페이지 (소단원 선택)
- `/learning/[unitId]` - 학습 페이지 (기본 구조만, 향후 확장)

### 향후 확장 예정 라우팅

- `/learning/[unitId]/concept` - 개념 학습 (2단계)
- `/learning/[unitId]/problems` - 문제 풀이 (3단계)

## 확장 가능한 구조 설계

### 1. 책임 분리

- **UI 컴포넌트**: 순수한 프레젠테이션 로직
- **커스텀 훅**: 비즈니스 로직 및 상태 관리
- **서비스 레이어**: API 호출 및 데이터 처리
- **스토어**: 전역 상태 관리

### 2. 향후 API 연동 대비

- 모든 API 호출은 `service` 폴더에 집중
- Mock 함수들을 실제 API 호출로 쉽게 교체 가능
- React Query 설정 준비 (현재는 로컬 데이터만 사용)

### 3. 컴포넌트 확장성

- 각 기능별로 독립적인 컴포넌트 설계
- 재사용 가능한 UI 컴포넌트 구조
- Props 인터페이스를 통한 유연한 구성

## 다음 단계 구현 계획

### 2단계: 개념 학습 기능

1. `ConceptViewer` 컴포넌트 생성
2. 개념 콘텐츠 표시 UI 구현
3. 학습 완료 체크 및 XP 지급
4. 자동 문제 풀이 진행

### 3단계: 문제 풀이 기능

1. `ProblemViewer` 컴포넌트 생성
2. 문제 표시 및 답안 입력 UI
3. 채점 시스템 및 해설 표시
4. XP 시스템 완성

### 통합 및 완성

1. 전체 학습 플로우 연결
2. 진행률 추적 및 이어하기
3. Gamification 시스템 완성
4. 성능 최적화 및 테스트

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **상태 관리**: Zustand
- **타입 시스템**: TypeScript
- **스타일링**: Tailwind CSS
- **향후 추가 예정**: React Query, React Hook Form
