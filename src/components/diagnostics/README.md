# 진단 테스트 컴포넌트 문서

## 개요
진단 테스트 시스템의 핵심 컴포넌트들을 관리하는 폴더입니다. 각 컴포넌트는 진단 테스트의 특정 단계를 담당하며, 상태 관리와 API 통신을 통해 완전한 진단 테스트 플로우를 제공합니다.

## 컴포넌트 구조

```
@diagnostics/
├── DiagnosticEligibility.tsx    # 진단 자격 확인
├── DiagnosticSetup.tsx          # 진단 테스트 설정
├── DiagnosticTest.tsx           # 진단 테스트 진행
└── README.md                    # 이 문서
```

## 1. DiagnosticEligibility.tsx

### 책임
- 사용자의 진단 테스트 진행 자격 확인
- 진단 테스트 소개 및 안내 정보 제공
- 자격 확인 버튼 클릭 시 상위 컴포넌트에 결과 전달

### Props
```typescript
interface DiagnosticEligibilityProps {
  onCheck: () => Promise<void>;    // 자격 확인 실행 함수
  loading: boolean;                // API 로딩 상태
  error: string | null;            // 에러 메시지
}
```

### 상태
```typescript
const [isChecking, setIsChecking] = useState(false); // 로컬 로딩 상태
```

### 주요 기능
- 진단 테스트 설명 및 특징 안내
- 자격 확인 버튼 클릭 시 `onCheck` 콜백 실행
- 로딩 상태 및 에러 메시지 표시

### 사용 예시
```tsx
<DiagnosticEligibility 
  onCheck={handleEligibilityCheck}
  loading={loading}
  error={error}
/>
```

---

## 2. DiagnosticSetup.tsx

### 책임
- 진단 테스트 설정 정보 수집
- 학년 범위 설정
- 설정 완료 시 진단 테스트 시작 요청

### Props
```typescript
interface DiagnosticSetupProps {
  onStart: (data: DiagnosticStartRequest) => Promise<void>; // 테스트 시작 함수
  loading: boolean;                                          // API 로딩 상태
  error: string | null;                                      // 에러 메시지
}
```

### 상태
```typescript
const [selectedGrade, setSelectedGrade] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);
```

### 주요 기능
- **학년 선택**: 1, 2, 3학년 중에서 하나 선택 (라디오 버튼)
- **학년 범위 자동 설정**: 선택된 학년을 최대값으로 하여 1학년부터 시작
  - 1학년 선택 → `{ min: 1, max: 1 }` (1학년만)
  - 2학년 선택 → `{ min: 1, max: 2 }` (1~2학년)
  - 3학년 선택 → `{ min: 1, max: 3 }` (1~3학년)
- **테스트 범위 표시**: 선택된 학년에 따른 범위 정보 표시
- **폼 제출**: 설정 완료 시 `onStart` 콜백으로 데이터 전달

### 사용 예시
```tsx
<DiagnosticSetup 
  onStart={handleTestStart}
  loading={loading}
  error={error}
/>
```

---

## 3. DiagnosticTest.tsx

### 책임
- 진단 테스트 문제 표시 및 답안 수집
- 답안 제출 및 다음 문제 자동 로드
- 타이머 관리 및 타임아웃 처리
- 진행 상황 실시간 업데이트

### Props
```typescript
interface DiagnosticTestProps {
  testData: DiagnosticStartResponse;           // 테스트 시작 응답 데이터
  userId: number;                              // 사용자 ID
  onComplete: () => void;                      // 테스트 완료 콜백
  onTimeout: () => void;                       // 타임아웃 콜백
}
```

### 상태
```typescript
const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
const [userAnswer, setUserAnswer] = useState('');
const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30분
const [isSubmitting, setIsSubmitting] = useState(false);
const [currentProblemId, setCurrentProblemId] = useState(testData.firstProblemId);
const [answeredCount, setAnsweredCount] = useState(0);
const [remainingCount, setRemainingCount] = useState(testData.totalProblems);
```

### 주요 기능

#### 문제 관리
- **문제 로드**: `loadProblem()` 함수로 API에서 문제 데이터 가져오기
- **문제 표시**: 문제 내용, 이미지, 선택지 등 완전한 문제 정보 표시
- **문제 유형 감지**: 객관식/주관식 자동 감지 및 적절한 UI 제공

#### 답안 처리
- **답안 수집**: 객관식 선택 또는 주관식 텍스트 입력
- **답안 제출**: `submitAnswer()` API 호출
- **자동 진행**: 답안 제출 후 다음 문제 자동 로드

#### 타이머 관리
- **30분 제한**: 진단 테스트 시간 제한 관리
- **실시간 업데이트**: 1초마다 남은 시간 표시
- **타임아웃 처리**: 시간 만료 시 `onTimeout` 콜백 실행

#### 진행 상황
- **진행률 표시**: 현재 문제 번호 / 전체 문제 수
- **답변 완료 수**: 완료된 문제 수 실시간 업데이트
- **남은 문제 수**: 남은 문제 수 실시간 업데이트

### 사용 예시
```tsx
<DiagnosticTest 
  testData={testData}
  userId={userId}
  onComplete={handleTestComplete}
  onTimeout={handleTestTimeout}
/>
```

---

## 상태 관리 흐름

### 1. 진단 자격 확인 단계
```
DiagnosticEligibility → onCheck → 상위 컴포넌트 → API 호출 → 결과에 따라 다음 단계 결정
```

### 2. 진단 테스트 설정 단계
```
DiagnosticSetup → 폼 입력 → onStart → 상위 컴포넌트 → API 호출 → 테스트 시작
```

### 3. 진단 테스트 진행 단계
```
DiagnosticTest → 문제 로드 → 답안 입력 → 답안 제출 → 다음 문제 로드 → 반복
```

### 4. 상태 업데이트 흐름
```
API 응답 → 상태 업데이트 → UI 리렌더링 → 사용자 상호작용 → 다음 API 호출
```

---

## API 통신

### 사용되는 API 엔드포인트
1. **진단 자격 확인**: `GET /v1/diagnostics/eligibility`
2. **진단 시작**: `POST /v1/diagnostics/start`
3. **문제 조회**: `GET /v1/problems/{problemId}`
4. **답안 제출**: `POST /v1/diagnostics/{testId}/submit`
5. **타임아웃 체크**: `GET /v1/diagnostics/{testId}/timeout-check`

### 에러 처리
- 각 컴포넌트는 `error` prop을 통해 에러 메시지 표시
- API 호출 실패 시 적절한 에러 메시지 표시
- 사용자 친화적인 에러 처리 및 복구 옵션 제공

---

## 스타일링

### 디자인 시스템
- **색상**: Blue 계열 (primary: blue-600, hover: blue-700)
- **그림자**: shadow-md, shadow-lg
- **둥근 모서리**: rounded-lg, rounded-md
- **반응형**: Tailwind CSS 클래스를 활용한 모바일 친화적 디자인

### 공통 UI 패턴
- **카드 레이아웃**: 각 단계별 컴포넌트는 카드 형태로 표시
- **로딩 상태**: 버튼 비활성화 및 로딩 텍스트 표시
- **에러 표시**: 빨간색 배경의 에러 메시지 박스
- **진행 표시**: 단계별 진행 상황을 점으로 표시

---

## 테스트 및 디버깅

### 개발 환경
- 모킹 데이터를 통한 API 응답 시뮬레이션
- 실제 API 호출과 동일한 응답 구조
- 네트워크 지연 시뮬레이션 (300~1000ms)

### 디버깅 포인트
- `console.log`를 통한 상태 변화 추적
- React DevTools를 통한 컴포넌트 상태 확인
- Network 탭을 통한 API 호출 모니터링

---

## 향후 개선 사항

### 기능 개선
- [ ] 학년 범위 확장 (4~6학년 지원)
- [ ] 문제 이미지 캐싱 및 최적화
- [ ] 답안 임시 저장 기능
- [ ] 문제 건너뛰기 기능
- [ ] 답안 수정 기능

### 성능 개선
- [ ] 컴포넌트 메모이제이션
- [ ] API 응답 캐싱
- [ ] 지연 로딩 구현

### 사용자 경험
- [ ] 키보드 단축키 지원
- [ ] 접근성 개선 (ARIA 라벨 등)
- [ ] 다국어 지원
- [ ] 다크 모드 지원
