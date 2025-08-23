# API 명세서

## 목차
1. [진단 테스트 API](#진단-테스트-api)
2. [Units 및 Problems 조회 API](#units-및-problems-조회-api)
3. [문제 채점/해설 API](#문제-채점해설-api)
4. [API 사용 예시](#api-사용-예시)

---

## 진단 테스트 API

### 1-1. 진단 자격 확인 ✅
- **GET** `/v1/diagnostics/eligibility`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_elig_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200
```json
{
  "eligible": true,
  "reason": null,
  "existingTestId": null
}
```

#### Response 403 (자격 없음)
```json
{
  "eligible": false,
  "reason": "이미 진단 테스트를 완료했습니다",
  "existingTestId": "64fa0a111111111111111111"
}
```

---

### 1-2. 진단 시작 ✅
- **POST** `/v1/diagnostics/start`
- **Auth**: ✅ / **Idempotent**: ✅ / **Mode**: Sync
- **Headers**: 
  - `Authorization: Bearer <JWT>`
  - `Idempotency-Key: idem_diag_start_001`
  - `X-Request-Id: req_diag_start_001`
- **Query**: `userId=12345`
- **Body**:
```json
{
  "gradeRange": { "min": 1, "max": 3 }
}
```

#### Response 201
```json
{
  "testId": "64fa0a111111111111111111",
  "userId": 12345,
  "gradeRange": { "min": 1, max: 3 },
  "startedAt": "2025-07-10T12:00:00Z",
  "firstProblemId": "64fa0p111111111111111111",
  "totalProblems": 20
}
```

---

### 1-3. 진단 상태 조회 ✅
- **GET** `/v1/diagnostics/{testId}/status`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_diag_status_001`
- **Path**: `testId=64fa0a111111111111111111`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200
```json
{
  "testId": "64fa0a111111111111111111",
  "userId": 12345,
  "completed": false,
  "answeredCount": 7,
  "remainingCount": 13,
  "currentProblemId": "64fa0b111111111111111111",
  "startedAt": "2025-07-10T12:00:00Z",
  "lastActivityAt": "2025-07-10T12:15:00Z",
  "timeoutMinutes": 30
}
```

---

### 1-4. 답안 제출 ✅
- **POST** `/v1/diagnostics/{testId}/submit`
- **Auth**: ✅ / **Idempotent**: ✅ / **Mode**: Sync
- **Headers**:
  - `Idempotency-Key: idem_diag_submit_001`
  - `X-Request-Id: req_diag_submit_001`
- **Path**: `testId=64fa0a111111111111111111`
- **Query**: `userId=12345`
- **Body**:
```json
{
  "problemId": "64fa0p111111111111111111",
  "userAnswer": { "value": "3x + 2" },
  "durationSeconds": 42
}
```

#### Response 200
```json
{
  "answerId": "64ans11111111111111111111",
  "isCorrect": null,
  "nextProblemId": "64fa0q111111111111111111",
  "answeredCount": 8,
  "remainingCount": 12
}
```

---

### 1-5. 진단 테스트 타임아웃 체크 ✅
- **GET** `/v1/diagnostics/{testId}/timeout-check`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_timeout_001`
- **Path**: `testId=64fa0a111111111111111111`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200 (정상 진행 중)
```json
{
  "timedOut": false,
  "remainingMinutes": 26,
  "totalTimeoutMinutes": 30,
  "startedAt": "2025-08-21T04:09:51.612Z"
}
```

#### Response 200 (타임아웃 발생)
```json
{
  "timedOut": true,
  "message": "진단 테스트가 타임아웃되었습니다",
  "durationSec": 1800
}
```

---

## Units 및 Problems 조회 API

### 2-0. 대단원별 소단원 목록 조회 ✅
- **GET** `/v1/units`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_units_001`, *(선택)* `Accept-Language: ko-KR`
- **Query(예시)**: `?grade=1&chapter=1&cursor=unit_1&limit=20`
- **Body**: `{}`

#### Response 200
```json
{
  "items": [
    {
      "unitId": "64fa0a111111111111111111",
      "subject": "math",
      "title": { "ko": "정수와 유리수", "en": "Integers and Rational Numbers" },
      "grade": 1,
      "chapter": 1,
      "chapterTitle": "수와 연산",
      "orderInGrade": 3,
      "description": { "ko": "정수와 유리수의 정의를 다룸" },
      "status": "active",
      "createdAt": "2025-07-14T10:00:00Z"
    }
  ],
  "nextCursor": null
}
```

---

### 2-1. 문제 단건 조회(안전) ✅
- **GET** `/v1/problems/{problemId}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_problem_001`
- **Path**: `problemId=64fa0p111111111111111111`
- **Body**: `{}`

#### Response 200
```json
{
  "problemId": "64fa0p111111111111111111",
  "unitId": "64unit001111111111111111",
  "grade": 1,
  "chapter": 1,
  "context": { "source": "교과서", "for": ["diagnostic", "practice"] },
  "cognitiveType": "이해",
  "level": "중",
  "type": "객관식",
  "tags": ["함수", "그래프"],
  "content": {
    "stem": { "text": "삼각형의 넓이를 구하세요." },
    "choices": [
      { "key": "①", "text": "5cm²" },
      { "key": "②", "text": "6cm²" }
    ]
  },
  "imageUrl": "/images/problems/triangle_area.png",
  "createdAt": "2025-07-14T10:25:00Z",
  "updatedAt": "2025-07-14T10:25:00Z"
}
```

---

### 2-2. 소단원별 첫 번째 문제 조회 (문제 배열ID 포함 + 이어풀기 기능) ✅
- **GET** `/v1/units/{unitId}/first-problem`
- **Auth**: ✅ / **Idempotent**: ✅ / **Mode**: Sync
- **Headers**: `X-Request-Id: req_first_problem_001`
- **Path**: `unitId=unit_001`
- **Query**: `userId=12345` (이어풀기용, 선택사항)
- **Body**: `{}`

#### Response 200
```json
{
  "problem": {
    "problemId": "64fa0p111111111111111111",
    "unitId": "unit_001",
    "grade": 1,
    "chapter": 1,
    "context": { "source": "교과서", "year": 2024, "region": "서울" },
    "cognitiveType": "이해",
    "level": "중",
    "type": "객관식",
    "tags": ["덧셈", "기초"],
    "content": {
      "stem": { "text": "5 + 3 = ?" },
      "choices": [
        { "key": "①", "text": "7" },
        { "key": "②", "text": "8" },
        { "key": "③", "text": "9" },
        { "key": "④", "text": "10" }
      ]
    },
    "imageUrl": "/images/problems/problem_001.png",
    "createdAt": "2025-07-14T10:25:00Z",
    "updatedAt": "2025-07-14T10:25:00Z"
  },
  "problemIds": [
    "64fa0p111111111111111111",
    "64fa0p222222222222222222",
    "64fa0p333333333333333333",
    "64fa0p444444444444444444"
  ],
  "progress": {
    "completed": 0,
    "total": 4,
    "remaining": 4,
    "percentage": 0.0
  },
  "sortedBy": "cognitiveType",
  "sortOrder": ["이해", "적용", "응용"],
  "isFirstTime": true
}
```

---

### 2-3. 소단원 단건 조회 ✅
- **GET** `/v1/units/{unitId}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_unit_001`, *(선택)* `Accept-Language: ko-KR`
- **Path**: `unitId=64unit001111111111111111`
- **Body**: `{}`

#### Response 200
```json
{
  "unitId": "64unit001111111111111111",
  "subject": "math",
  "title": { "ko": "정수와 유리수", "en": "Integers and Rational Numbers" },
  "grade": 1,
  "chapter": 1,
  "chapterTitle": "수와 연산",
  "orderInGrade": 3,
  "description": { "ko": "정의와 성질을 다룸" },
  "status": "active"
}
```

---

## 문제 채점/해설 API

### 3-10. 채점 + 해설 API ✅
- **POST** `/v1/answers/check`
- **Auth**: ✅ / **Idempotent**: ✅ / **Mode**: Sync
- **Headers**:
  - `Idempotency-Key: idem_answer_check_001`
  - `X-Request-Id: req_answer_check_001`
- **Query(예시)**: `?stream=false`
- **Body**:
```json
{
  "mode": "practice",             // practice | vocab_test (diagnostic은 진행률 제외)
  "sessionId": "64fa0a111111111111111111",
  "unitId": "64unit001111111111111111",
  "problemId": "64fa0p111111111111111111",
  "userAnswer": { "answer": "6cm²" },
  "durationSeconds": 54
}
```

#### Response 200
```json
{
  "answerId": "64ans11111111111111111111",
  "isCorrect": true,
  "explanation": { "explanation": "밑변×높이÷2를 이용합니다." },
  "relatedConcepts": [{ "unitId": "64unit001111111111111111", "title": "정수와 유리수" }],
  "updatedProgress": {
    "problemProgress": 75,
    "status": "in_progress"
  },
  "xpGained": 15,
  "gamificationUpdate": {
    "level": 3,
    "xp": 165,
    "totalXp": 595,
    "nextLevelXp": 500,
    "leveledUp": false
  }
}
```

#### Status 값 정의
- `"completed"`: 100% 완료
- `"in_progress"`: 1~99% 진행중
- `"not_started"`: 0% 미시작

#### 참고사항
- `mode`가 `vocab_test`일 경우 `updatedProgress`의 `problemProgress` 대신 `vocabProgress`가 응답됩니다.
- `mode`가 `diagnostic`일 경우 `updatedProgress`는 응답에 포함되지 않습니다.

---

## API 사용 예시

### 진단 테스트 플로우
1. **진단 자격 확인** → `GET /v1/diagnostics/eligibility`
2. **진단 시작** → `POST /v1/diagnostics/start` → `firstProblemId` 획득
3. **첫 번째 문제 조회** → `GET /v1/problems/{firstProblemId}`
4. **답안 제출** → `POST /v1/diagnostics/{testId}/submit`
5. **진행률 확인** → `GET /v1/diagnostics/{testId}/status`
6. **타임아웃 체크** → `GET /v1/diagnostics/{testId}/timeout-check`

### 일반 학습 플로우
1. **단원 목록 조회** → `GET /v1/units`
2. **소단원별 첫 문제 조회** → `GET /v1/units/{unitId}/first-problem`
3. **문제 풀이** → `GET /v1/problems/{problemId}`
4. **답안 채점** → `POST /v1/answers/check`

---

## 에러 코드

### 공통 에러
- **400**: 잘못된 요청
- **401**: 인증 실패
- **403**: 접근 금지
- **404**: 찾을 수 없음
- **409**: 충돌
- **422**: 처리 불가
- **500**: 서버 오류

### 특별한 에러
- **403**: 진단 테스트 자격 없음 (이미 완료)
- **409**: 중복 요청 (Idempotency-Key 충돌)
- **422**: 요청 데이터 검증 실패

---

## 헤더 규칙

### 필수 헤더
- `X-Request-Id`: 요청 추적용 고유 ID
- `Authorization`: JWT 토큰 (Auth가 ✅인 경우)

### 선택 헤더
- `Idempotency-Key`: 멱등성 보장 (Idempotent가 ✅인 경우)
- `Accept-Language`: 다국어 지원 (ko-KR, en-US 등)
- `Content-Type`: 요청 본문 타입 (기본값: application/json)

---

## 개발 환경 설정

### Mock 데이터 사용
```typescript
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && 
                     !process.env.NEXT_PUBLIC_API_BASE_URL;
```

### API 기본 URL
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com/v1';
```

### 요청 ID 생성
```typescript
const generateRequestId = (prefix: string) => 
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
```

---

## 주의사항

1. **진단 테스트**: `mode: "diagnostic"`일 때는 진행률 정보가 응답에 포함되지 않습니다.
2. **멱등성**: `Idempotent: ✅`인 API는 동일한 요청을 여러 번 보내도 안전합니다.
3. **타임아웃**: 진단 테스트는 30분 제한이 있으며, 주기적으로 체크해야 합니다.
4. **언어 설정**: 다국어 지원이 필요한 API는 `Accept-Language` 헤더를 사용합니다.
