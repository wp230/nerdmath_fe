# API 명세서

## 목차

1. [진단 테스트 API](#진단-테스트-api)
2. [Units 및 Problems 조회 API](#units-및-problems-조회-api)
3. [문제 채점/해설 API](#문제-채점해설-api)
4. [소단원 별 Concept 조회](#소단원-별-concept-조회)
5. [Voca 조회](#voca-조회)
6. [즐겨찾기](#즐겨찾기)
7. [학습 진행률 및 대시보드](#학습-진행률-및-대시보드)
8. [게이미피케이션](#게이미피케이션)
9. [AI 도우미 API (FastAPI 서버)](#ai-도우미-api-fastapi-서버)
10. [API 사용 예시](#api-사용-예시)

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
  "gradeRange": { "min": 1, "max": 3 },
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
- **Headers**: `X-Request-Id: req_units_001`, _(선택)_ `Accept-Language: ko-KR`
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
- **Headers**: `X-Request-Id: req_unit_001`, _(선택)_ `Accept-Language: ko-KR`
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
  "mode": "practice", // practice | vocab_test (diagnostic은 진행률 제외)
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
  "relatedConcepts": [
    { "unitId": "64unit001111111111111111", "title": "정수와 유리수" }
  ],
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

## 소단원 별 Concept 조회

### 4-1. 소단원별 개념 조회 ✅

- **GET** `/v1/units/{unitId}/concept`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_unit_concept_001`
- **Path**: `unitId=68a013e4fe733a1c891816f3`
- **Body**: `{}`

#### Response 200

```json
{
  "conceptId": "68con11111111111111111111",
  "unitId": "68a013e4fe733a1c891816f3",
  "blocks": [
    {
      "type": "realExample",
      "title": "실생활에서 찾는 예시",
      "text": "우리 주변에서 이 개념이 어떻게 쓰이는지 알아봅시다...",
      "imageUrl": "/images/concepts/real_example_1.png",
      "examples": ["예시 1: 쇼핑할 때 할인 계산", "예시 2: 요리할 때 비율 계산"]
    },
    {
      "type": "internationalExample",
      "title": "세계 각국의 수학 교육",
      "text": "다른 나라에서는 이 개념을 어떻게 가르칠까요?",
      "imageUrl": "/images/concepts/international_1.png",
      "countries": [
        {
          "country": "일본",
          "example": "일본에서는..."
        },
        {
          "country": "미국",
          "example": "미국에서는..."
        }
      ]
    },
    {
      "type": "relation",
      "title": "개념과 실생활의 연결",
      "text": "이 수학 개념이 실제로 어떻게 우리 생활과 연결되는지...",
      "imageUrl": "/images/concepts/relation_1.png",
      "connections": ["연결점 1: ...", "연결점 2: ..."]
    },
    {
      "type": "explanation",
      "title": "수학 개념 설명",
      "text": "이제 수학적으로 정확히 설명해보겠습니다...",
      "latex": "\\\\frac{a}{b} + \\\\frac{c}{d} = \\\\frac{ad + bc}{bd}",
      "imageUrl": "/images/concepts/math_explanation_1.png",
      "steps": ["1단계: ...", "2단계: ..."]
    },
    {
      "type": "practiceProblems",
      "title": "직접 풀어보기",
      "text": "이제 배운 내용을 직접 풀어봅시다",
      "problems": [
        {
          "id": 1,
          "type": "math",
          "question": "1/2 + 1/3 = ?",
          "answer": "5/6",
          "explanation": "공통분모를 찾아서 더하면 됩니다",
          "hint": "분모를 같게 만들어보세요"
        },
        {
          "id": 2,
          "type": "vocab",
          "question": "분수의 위쪽 숫자를 영어로 뭐라고 할까요?",
          "answer": "numerator",
          "explanation": "분자(numerator)는 분수에서 위쪽에 있는 숫자입니다",
          "hint": "n으로 시작하는 단어예요"
        },
        {
          "id": 3,
          "type": "math",
          "question": "2/5 × 3/4 = ?",
          "answer": "6/20",
          "explanation": "분자는 분자끼리, 분모는 분모끼리 곱하면 됩니다",
          "hint": "곱셈은 분자×분자, 분모×분모"
        }
      ]
    }
  ],
  "createdAt": "2025-07-14T10:10:00Z"
}
```

- Errors: 404, 500

---

## Voca 조회

### 5-1. 단원별 어휘 배열 조회

- **GET** `/v1/vocab/unit/{unitId}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_vocab_unit_001`
- **Path**: `unitId=64unit001111111111111111`
- **Body**: `{}`

#### Response 200

```json
{
  "unitId": "64unit001111111111111111",
  "category": "math_term",
  "vocabularies": [
    {
      "vocaId": "64v1111111111111111111111",
      "word": "angle",
      "meaning": "각도",
      "etymology": "angulus: 라틴어 모서리",
      "imageUrl": "/images/vocab/angle.png",
      "createdAt": "2025-07-14T10:15:00Z"
    },
    {
      "vocaId": "64v2222222222222222222222",
      "word": "triangle",
      "meaning": "삼각형",
      "etymology": "tri: 3 + angle: 각",
      "imageUrl": "/images/vocab/triangle.png",
      "createdAt": "2025-07-14T10:16:00Z"
    }
  ]
}
```

- Errors: 404, 500

---

### 5-2. 빈출 숙어/단어 배열 조회

- **GET** `/v1/vocab/common/{type}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_vocab_common_001`
- **Path**: `type=sat_act`
- **Body**: `{}`

#### Response 200

```json
{
  "type": "sat_act",
  "vocabularies": [
    {
      "vocaId": "64v3333333333333333333333",
      "word": "solve for",
      "meaning": "~에 대해 풀다",
      "etymology": "solve: 해결하다 + for: ~에 대해",
      "imageUrl": "/images/vocab/solve_for.png",
      "createdAt": "2025-07-14T10:17:00Z"
    },
    {
      "vocaId": "64v4444444444444444444444",
      "word": "given that",
      "meaning": "~가 주어졌을 때",
      "etymology": "given: 주어진 + that: ~라는 것",
      "imageUrl": "/images/vocab/given_that.png",
      "createdAt": "2025-07-14T10:18:00Z"
    }
  ]
}
```

- Errors: 404, 500

---

### 5-3. 어휘 테스트 생성

- **GET** `/v1/vocab/test`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_vocab_test_001`
- **Query**: `unitId=64unit001111111111111111&testSize=10`
- **Body**: `{}`

#### Response 200

```json
{
  "testSet": {
    "unitId": "64unit001111111111111111",
    "testSize": 10,
    "problems": [
      {
        "problemId": "64p1111111111111111111111",
        "vocaId": "64v1111111111111111111111",
        "question": "angle의 뜻을 쓰세요",
        "correctAnswer": "각도",
        "explanation": "angulus: 라틴어 모서리",
        "questionType": "word_to_meaning"
      },
      {
        "problemId": "64p2222222222222222222222",
        "vocaId": "64v2222222222222222222222",
        "question": "삼각형을 영어로 쓰세요",
        "correctAnswer": "triangle",
        "explanation": "tri: 3 + angle: 각",
        "questionType": "meaning_to_word"
      }
    ]
  },
  "generatedAt": "2025-07-14T10:20:00Z"
}
```

- Errors: 400, 404, 500

---

### 5-4. 소단원별 복습 어휘 조회

- **GET** `/v1/vocab/review/unit/{unitId}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_vocab_review_unit_001`
- **Path**: `unitId=64unit001111111111111111`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "unitId": "64unit001111111111111111",
  "category": "math_term",
  "userId": 12345,
  "incorrectVocabularies": [
    {
      "vocaId": "64v1111111111111111111111",
      "word": "angle",
      "meaning": "각도",
      "etymology": "angulus: 라틴어 모서리",
      "imageUrl": "/images/vocab/angle.png",
      "totalAttempts": 3,
      "correctAttempts": 1,
      "accuracy": 0.33,
      "lastAttempted": "2025-07-14T10:25:00Z"
    }
  ]
}
```

- Errors: 404, 500

---

### 5-5. 빈출 숙어/단어 복습 어휘 조회

- **GET** `/v1/vocab/review/common/{type}`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_vocab_review_common_001`
- **Path**: `type=sat_act`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "type": "sat_act",
  "userId": 12345,
  "incorrectVocabularies": [
    {
      "vocaId": "64v3333333333333333333333",
      "word": "solve for",
      "meaning": "~에 대해 풀다",
      "etymology": "solve: 해결하다 + for: ~에 대해",
      "imageUrl": "/images/vocab/solve_for.png",
      "totalAttempts": 2,
      "correctAttempts": 0,
      "accuracy": 0.0,
      "lastAttempted": "2025-07-14T10:26:00Z"
    }
  ]
}
```

- Errors: 404, 500

---

## 즐겨찾기

### 6-1. 북마크 토글

- **POST** `/v1/bookmarks/toggle`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_bookmark_toggle_001`
- **Query**: `userId=12345`
- **Body**:

```json
{
  "problemId": "64fa0b111111111111111111"
}
```

#### Response 200

```json
{
  "bookmarkId": "64book111111111111111111",
  "problemId": "64fa0b111111111111111111",
  "bookmarked": true,
  "message": "북마크가 추가되었습니다"
}
```

#### Response 200 (해제)

```json
{
  "bookmarkId": "64book111111111111111111",
  "problemId": "64fa0b111111111111111111",
  "bookmarked": false,
  "message": "북마크가 해제되었습니다"
}
```

- Errors: 400, 404, 500

---

### 6-2. 북마크 목록 조회

- **GET** `/v1/bookmarks`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_bookmark_list_001`
- **Query**: `userId=12345&unitId=64unit001111111111111111&startDate=2025-07-01&endDate=2025-07-31`
- **Body**: `{}`

#### Response 200

```json
{
  "bookmarks": [
    {
      "bookmarkId": "64book111111111111111111",
      "problemId": "64fa0b111111111111111111",
      "unitId": "64unit001111111111111111",
      "unitTitle": "함수의 기초",
      "problemTitle": "함수값 구하기",
      "bookmarkedAt": "2025-07-15T10:30:00Z"
    }
  ],
  "totalCount": 25
}
```

- Errors: 400, 500

---

### 6-3. 북마크한 문제로 복습 시작

- **POST** `/v1/bookmarks/review`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_bookmark_review_001`
- **Query**: `userId=12345`
- **Body**:

```json
{
  "unitId": "64unit001111111111111111",
  "mode": "set"
}
```

#### Response 201 (문제 세트 모드)

```json
{
  "setId": "64set111111111111111111",
  "problemIds": ["64fa0b111111111111111111", "64fa0c222222222222222222"],
  "totalProblems": 15,
  "mode": "review"
}
```

#### Response 200 (개별 문제 모드)

```json
{
  "problemIds": ["64fa0b111111111111111111", "64fa0c222222222222222222"],
  "totalProblems": 15,
  "mode": "individual"
}
```

- Errors: 400, 404, 500

---

### 6-4. 북마크 상태 확인

- **GET** `/v1/bookmarks/{problemId}/status`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_bookmark_status_001`
- **Path**: `problemId=64fa0b111111111111111111`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "problemId": "64fa0b111111111111111111",
  "bookmarked": true,
  "bookmarkedAt": "2025-07-15T10:30:00Z"
}
```

- Errors: 404, 500

---

## 학습 진행률 및 대시보드

### 7-1. 전체 진행률 조회

- **GET** `/v1/progress/overall`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_progress_overall_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "totalConceptProgress": 35,
  "totalProblemProgress": 42,
  "totalVocabProgress": 28,
  "completedAllUnitsRatio": 5.2
}
```

- Errors: 400, 500

---

### 7-2. 개념 진행률 목록 조회

- **GET** `/v1/progress/concepts`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_progress_concepts_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "units": [
    {
      "unitId": "64unit001111111111111111",
      "unitTitle": "소단원 제목",
      "conceptProgress": 100,
      "status": "completed"
    },
    {
      "unitId": "64unit002222222222222222",
      "unitTitle": "다른 소단원",
      "conceptProgress": 0,
      "status": "not_started"
    }
  ]
}
```

- Errors: 400, 500

---

### 7-3. 문제 진행률 목록 조회

- **GET** `/v1/progress/problems`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_progress_problems_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "units": [
    {
      "unitId": "64unit001111111111111111",
      "unitTitle": "소단원 제목",
      "problemProgress": 75,
      "status": "in_progress"
    },
    {
      "unitId": "64unit002222222222222222",
      "unitTitle": "다른 소단원",
      "problemProgress": 0,
      "status": "not_started"
    }
  ]
}
```

- Errors: 400, 500

---

### 7-4. 어휘 진행률 목록 조회

- **GET** `/v1/progress/vocab`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_progress_vocab_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "units": [
    {
      "unitId": "64unit001111111111111111",
      "unitTitle": "소단원 제목",
      "vocabProgress": 60,
      "status": "in_progress"
    },
    {
      "unitId": "64unit002222222222222222",
      "unitTitle": "다른 소단원",
      "vocabProgress": 0,
      "status": "not_started"
    }
  ],
  "frequentVocab": {
    "unitId": "frequent_vocab",
    "unitTitle": "빈출 어휘",
    "vocabProgress": 80,
    "status": "in_progress"
  }
}
```

- Errors: 400, 500

---

### 7-5. 활동 통계 조회

- **GET** `/v1/activity/stats`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Query**: `date=2025-07-14` (선택)
- **Body**: `{}`

#### Response 200

```json
{
  "todaySolved": 12,
  "studyDurationMin": 45,
  "totalProblems": 254,
  "totalStudyMinutes": 980,
  "attendanceCount": 22,
  "date": "2025-07-14"
}
```

---

### 7-6. 개념 학습 완료 API

- **POST** `/v1/units/{unitId}/concept/complete`
- **Auth**: ✅ / **Idempotent**: ✅ / **Mode**: Sync
- **Headers**:
  - `Authorization: Bearer <JWT>`
  - `Idempotency-Key: idem_concept_complete_001`
  - `X-Request-Id: req_concept_complete_001`
- **Path**: `unitId=64fa0a111111111111111111`
- **Body**:

```json
{
  "learningTimeId": "64fa0c111111111111111111"
}
```

#### Response 200

```json
{
  "unitId": "64fa0a111111111111111111",
  "conceptProgress": 100,
  "message": "개념 학습이 완료되었습니다",
  "updatedProgress": {
    "conceptProgress": 100,
    "status": "completed"
  },
  "xpGained": 20,
  "gamificationUpdate": {
    "level": 3,
    "xp": 150,
    "totalXp": 580,
    "nextLevelXp": 500,
    "leveledUp": false
  }
}
```

- Errors: 400, 404, 500

---

## 게이미피케이션

### 8-1. 기본 캐릭터 목록 조회

- **GET** `/v1/characters/default`
- **Auth**: ❌ / **Idempotent**: — / **Mode**: Sync
- **Query**: `gender=male` (male | female)
- **Body**: `{}`

#### Response 200

```json
{
  "characters": [
    {
      "characterId": "char_default_male_lv1",
      "name": "기본 캐릭터(남)",
      "imageUrl": "/images/characters/default_male_lv1.png",
      "gender": "male",
      "level": 1,
      "description": "기본 남학생 캐릭터",
      "isDefault": true,
      "isActive": true
    },
    {
      "characterId": "char_default_male_lv2",
      "name": "기본 캐릭터(남) Lv.2",
      "imageUrl": "/images/characters/default_male_lv2.png",
      "gender": "male",
      "level": 2,
      "description": "레벨업된 남학생 캐릭터",
      "isDefault": true,
      "isActive": true
    }
  ]
}
```

---

### 8-2. 사용자 캐릭터 정보 조회

- **GET** `/v1/characters/my`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_character_my_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "gamificationState": {
    "gamifiId": "64fa0a111111111111111111",
    "userId": 12345,
    "level": 3,
    "xp": 150,
    "totalXp": 580,
    "nextLevelXp": 500,
    "equippedCharacterId": "char_default_male_lv3",
    "lastLeveledUpAt": "2025-07-14T10:59:00Z"
  },
  "equippedCharacter": {
    "characterId": "char_default_male_lv3",
    "name": "기본 캐릭터(남) Lv.3",
    "imageUrl": "/images/characters/default_male_lv3.png",
    "gender": "male",
    "level": 3,
    "description": "레벨업된 남학생 캐릭터"
  }
}
```

---

### 8-3. XP 획득 이력 조회

- **GET** `/v1/gamification/xp-history`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_xp_history_001`
- **Query**: `userId=12345&limit=20&page=1`
- **Body**: `{}`

#### Response 200

```json
{
  "transactions": [
    {
      "transactionId": "64fa0a111111111111111111",
      "amount": 10,
      "reason": "problem_solved",
      "reasonRef": "answerId:64fa0a111111111111111111",
      "at": "2025-07-14T11:00:00Z"
    },
    {
      "transactionId": "64fa0a111111111111111112",
      "amount": 20,
      "reason": "concept_completed",
      "reasonRef": "unitId:64fa0a111111111111111111",
      "at": "2025-07-14T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### 8-4. 레벨업 이력 조회

- **GET** `/v1/gamification/level-history`
- **Auth**: ✅ / **Idempotent**: — / **Mode**: Sync
- **Headers**: `X-Request-Id: req_level_history_001`
- **Query**: `userId=12345`
- **Body**: `{}`

#### Response 200

```json
{
  "levelHistory": [
    {
      "level": 3,
      "leveledUpAt": "2025-07-14T10:59:00Z",
      "xpAtLevelUp": 500
    },
    {
      "level": 2,
      "leveledUpAt": "2025-07-14T09:30:00Z",
      "xpAtLevelUp": 250
    }
  ]
}
```

---

### XP 지급 규칙

| 활동              | XP  | 조건                                     |
| ----------------- | --- | ---------------------------------------- |
| concept_completed | 20  | 개념 학습 완료한 소단원 개념 학습 완료시 |
| problem_solved    | 10  | 문제 풀이 하나당 (오답)                  |
| problem_solved    | 15  | 문제 풀이 하나당 (정답)                  |
| vocab_solved      | 3   | 어휘 문제 하나당 (오답)                  |
| vocab_solved      | 5   | 어휘 문제 하나당 (정답)                  |
| unit_completed    | 10  | 단원 전체 완료 (보너스)                  |
| streak_bonus      | 10  | 연속 정답 보너스                         |

### 레벨업 기준 (필요 XP = 50 + (레벨 - 1) × 25 + (레벨 - 1) × (레벨 - 2) × 25)

| 레벨   | 필요 XP | 누적 XP | 증가량 |
| ------ | ------- | ------- | ------ |
| 1 → 2  | 50      | 50      | -      |
| 2 → 3  | 100     | 150     | +50    |
| 3 → 4  | 175     | 325     | +75    |
| 4 → 5  | 275     | 600     | +100   |
| 5 → 6  | 400     | 1000    | +125   |
| 6 → 7  | 550     | 1550    | +150   |
| 7 → 8  | 725     | 2275    | +175   |
| 8 → 9  | 925     | 3200    | +200   |
| 9 → 10 | 1150    | 4350    | +225   |

---

## AI 도우미 API (FastAPI 서버)

### 9-1. 통합 문제 풀이 API

- **POST** `/api/solve_with_problem`
- **Auth**: ❌ / **Idempotent**: ❌ / **Mode**: Sync
- **Headers**: `Content-Type: application/json`
- **Description**: 문제 ID를 받아 MongoDB에서 문제를 조회하고 AI가 단계별로 풀이합니다.

#### Request Body

```json
{
  "problem_id": "problem_001",
  "question": "이 문제를 풀어주세요",
  "session_id": "user_session_123"
}
```

#### Response 200

```json
{
  "problem": {
    "problem_id": "problem_001",
    "content": {
      "question": "5 + 3 = ?",
      "options": ["7", "8", "9", "10"],
      "correctAnswer": "8",
      "explanation": "5에 3을 더하면 8입니다."
    },
    "grade": 1,
    "level": "easy",
    "tags": ["덧셈", "기초"]
  },
  "ai_solution": {
    "mode": "solve",
    "steps": [
      {
        "idx": 1,
        "latex": "5 + 3",
        "explain": "문제를 확인합니다. 5에 3을 더하는 식입니다."
      },
      {
        "idx": 2,
        "latex": "8",
        "explain": "5에 3을 더하면 8이 됩니다."
      }
    ],
    "latex_blocks": ["5 + 3 = 8"],
    "one_line_summary": "5 + 3의 결과는 8입니다.",
    "confidence": 0.9
  },
  "status": "success"
}
```

---

### 9-2. 통합 개념 설명 API

- **POST** `/api/concept_with_problem`
- **Auth**: ❌ / **Idempotent**: ❌ / **Mode**: Sync
- **Headers**: `Content-Type: application/json`
- **Description**: 문제와 관련된 수학 개념을 AI가 설명합니다.

#### Request Body

```json
{
  "problem_id": "problem_001",
  "concept_name": "덧셈의 기본 개념",
  "session_id": "user_session_123"
}
```

#### Response 200

```json
{
  "problem": {
    "problem_id": "problem_001",
    "content": {
      "question": "5 + 3 = ?",
      "options": ["7", "8", "9", "10"]
    }
  },
  "ai_concept": {
    "mode": "concept",
    "concept_name": "덧셈",
    "explanation": "덧셈은 두 수를 합하여 더 큰 수를 만드는 연산입니다...",
    "examples": ["2 + 3 = 5", "10 + 7 = 17"],
    "related_concepts": ["뺄셈", "자릿수"],
    "confidence": 0.95
  },
  "status": "success"
}
```

---

### 9-3. 기존 AI API (개별 호출)

#### POST `/api/ai/solve`

- **Auth**: ✅ (X-Service-Token: test-token)
- **Description**: 문제 텍스트를 직접 전달하여 AI가 풀이합니다.

#### POST `/api/ai/concept`

- **Auth**: ✅ (X-Service-Token: test-token)
- **Description**: 개념명을 전달하여 AI가 설명합니다.

#### POST `/api/ai/rag_recommend`

- **Auth**: ✅ (X-Service-Token: test-token)
- **Description**: 문제 텍스트를 전달하여 AI가 관련 자료를 추천합니다.

---

### 9-4. AI API 오류 응답

#### 400 Bad Request

```json
{
  "error": "problem_id가 필요합니다."
}
```

#### 404 Not Found

```json
{
  "error": "문제 ID problem_001을 찾을 수 없습니다."
}
```

#### 500 Internal Server Error

```json
{
  "error": "문제 풀이 중 오류: OpenAI API 호출 실패",
  "traceback": "Traceback (most recent call last)..."
}
```

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
const USE_MOCK_DATA =
  process.env.NODE_ENV === 'development' &&
  !process.env.NEXT_PUBLIC_API_BASE_URL;
```

### API 기본 URL

```typescript
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com/v1';
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
