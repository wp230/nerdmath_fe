# API Documentation

> **주의**: GET/DELETE는 바디가 없지만, 보기 편하게 “Body: {}”를 모두 표기합니다.
> **시간**: 모든 시간 정보는 ISO 8601 (UTC) 형식입니다.
> **Idempotency**: 필요한 경우, 멱등성 키 예시를 포함합니다.

---

# 1. 공통 (Common)

- **Base URL**: `https://api.example.com/v1`
- **Authentication**: `Authorization: Bearer <JWT>`
- **에러 포맷 (Error Format)**

  ```json
  {
    "code": "STRING",
    "message": "STRING",
    "details": [],
    "traceId": "req_12345"
  }
  ```

- **상태 코드 (Status Codes)**: 200, 201, 202, 204, 400, 401, 403, 404, 409, 422, 500
- **멱등성 (Idempotency)**: 쓰기 요청 시, 같은 `Idempotency-Key`와 같은 Body는 이전 2xx 응답을 재현합니다. 키는 같지만 Body가 다를 경우 409 Conflict 에러가 발생합니다.

---

# 2. 진단 테스트 (Diagnostic Test)

### 2.1. 진단 자격 확인 (Check Eligibility)

- **Endpoint**: `GET /v1/diagnostics/eligibility`
- **Description**: 사용자가 진단 테스트를 받을 자격이 있는지 확인합니다.
- **Auth**: ✅
- **Query**: `userId`
- **Response 200 (자격 있음)**

  ```json
  {
    "eligible": true,
    "reason": null,
    "existingTestId": null
  }
  ```

- **Response 403 (자격 없음)**

  ```json
  {
    "eligible": false,
    "reason": "이미 진단 테스트를 완료했습니다",
    "existingTestId": "64fa0a111111111111111111"
  }
  ```

### 2.2. 진단 시작 (Start Test)

- **Endpoint**: `POST /v1/diagnostics/start`
- **Description**: 새로운 진단 테스트를 시작합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Headers**: `Idempotency-Key`
- **Query**: `userId`
- **Body**:

  ```json
  {
    "gradeRange": { "min": 1, "max": 3 }
  }
  ```

- **Response 201**

  ```json
  {
    "testId": "64fa0a111111111111111111",
    "userId": 12345,
    "gradeRange": { "min": 1, "max": 3 },
    "startedAt": "2025-07-10T12:00:00Z",
    "firstProblemId": "64fa0p111111111111111111",
    "totalProblems": 20,
    "isRestart": false,
    "restartCount": 0,
    "shuffleSeed": 123456
  }
  ```

### 2.3. 진단 상태 조회 (Get Status)

- **Endpoint**: `GET /v1/diagnostics/{testId}/status`
- **Description**: 진행 중인 진단 테스트의 상태를 조회합니다.
- **Auth**: ✅
- **Path**: `testId`
- **Query**: `userId`
- **Response 200**

  ```json
  {
    "testId": "64fa0a111111111111111111",
    "userId": 12345,
    "completed": false,
    "answeredCount": 7,
    "remainingCount": 13,
    "currentProblemId": "64fa0b111111111111111111",
    "startedAt": "2025-07-10T12:00:00Z",
    "timeoutMinutes": 60
  }
  ```

### 2.4. 답안 제출 (Submit Answer)

- **Endpoint**: `POST /v1/diagnostics/{testId}/submit`
- **Description**: 문제에 대한 답안을 제출합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Path**: `testId`
- **Query**: `userId`
- **Body**:

  ```json
  {
    "problemId": "64fa0p111111111111111111",
    "userAnswer": { "value": "3x + 2" },
    "durationSeconds": 42
  }
  ```

- **Response 200**

  ```json
  {
    "answerId": "64ans11111111111111111111",
    "isCorrect": null,
    "nextProblemId": "64fa0q111111111111111111",
    "answeredCount": 8,
    "remainingCount": 12
  }
  ```

### 2.5. 진단 완료 (Complete Test)

- **Endpoint**: `POST /v1/diagnostics/:testId/complete`
- **Description**: 진단 테스트를 완료 처리합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Query**: `userId`
- **Body**:

  ```json
  {
    "endedAt": "2025-07-10T13:00:00Z",
    "completed": true
  }
  ```

- **Response 200**

  ```json
  {
    "testId": "64fa0a111111111111111111",
    "completed": true,
    "durationSec": 3600,
    "totalProblems": 20,
    "answeredProblems": 20,
    "score": 85,
    "correctCount": 17,
    "analysisRequested": true,
    "estimatedAnalysisTime": "5-10분"
  }
  ```

### 2.6. 진단 테스트 재시작 (Restart Test)

- **Endpoint**: `POST /v1/diagnostics/:testId/restart`
- **Description**: 기존 진단 테스트를 초기화하고 재시작합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Query**: `userId`
- **Response 200**

  ```json
  {
    "testId": "64fa0a111111111111111111",
    "restartCount": 1,
    "shuffleSeed": 123456,
    "firstProblemId": "64fa0p111111111111111111",
    "totalProblems": 20,
    "message": "진단 테스트가 재시작되었습니다"
  }
  ```

### 2.7. 진단 테스트 타임아웃 체크 (Check Timeout)

- **Endpoint**: `GET /v1/diagnostics/{testId}/timeout-check`
- **Description**: 테스트 시간 초과 여부를 확인합니다.
- **Auth**: ✅
- **Path**: `testId`
- **Query**: `userId`
- **Response 200 (진행 중)**

  ```json
  {
    "timedOut": false,
    "remainingMinutes": 26,
    "totalTimeoutMinutes": 60,
    "startedAt": "2025-08-21T04:09:51.612Z"
  }
  ```

- **Response 200 (타임아웃)**

  ```json
  {
    "timedOut": true,
    "message": "진단 테스트가 타임아웃되었습니다",
    "durationSec": 3600
  }
  ```

### 2.8. 진단 분석 결과 조회 (Get Analysis Result)

- **Endpoint**: `GET /v1/diagnostics/:userId/analysis`
- **Description**: 사용자의 진단 분석 결과를 조회합니다.
- **Auth**: ❌
- **Path**: `userId`
- **Response 200 (분석 완료)**

  ```json
  {
    "analysisId": "64fa0a111111111111111111",
    "testId": "68a013e4fe733a1c891816f3",
    "userId": 12345,
    "aiComment": "함수 단원의 오답률이 높습니다...",
    "class": "pre-nerd",
    "recommendedPath": [
      {
        "unitId": "64fbc1111111111111111111",
        "unitTitle": "정수와 유리수",
        "priority": 1,
        "reason": "오답률 80%로 가장 취약한 단원"
      }
    ],
    "generatedAt": "2025-07-10T12:00:00Z"
  }
  ```

- **Response 202 (분석 중)**

  ```json
  {
    "status": "analyzing",
    "message": "분석 중입니다. 잠시만 기다려주세요.",
    "estimatedCompletionTime": "2025-07-10T12:05:00Z"
  }
  ```

---

# 3. 단원 및 문제 (Units & Problems)

### 3.1. 소단원 목록 조회 (Get Unit List)

- **Endpoint**: `GET /v1/units`
- **Description**: 조건에 맞는 소단원 목록을 조회합니다.
- **Auth**: ✅
- **Query**: `grade`, `chapter`, `cursor`, `limit`
- **Response 200**

  ```json
  {
    "items": [
      {
        "unitId": "64fa0a111111111111111111",
        "subject": "math",
        "title": { "ko": "정수와 유리수", "en": "..." },
        "grade": 1,
        "chapter": 1,
        "chapterTitle": "수와 연산",
        "orderInGrade": 3,
        "description": { "ko": "..." },
        "status": "active",
        "createdAt": "2025-07-14T10:00:00Z"
      }
    ],
    "nextCursor": null
  }
  ```

### 3.2. 문제 단건 조회 (Get Single Problem)

- **Endpoint**: `GET /v1/problems/{problemId}`
- **Description**: 특정 문제의 상세 정보를 조회합니다.
- **Auth**: ✅
- **Path**: `problemId`
- **Response 200**

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

### 3.3. 소단원별 첫 문제 조회 (Get First Problem of Unit)

- **Endpoint**: `GET /v1/units/{unitId}/first-problem`
- **Description**: 소단원의 첫 번째 문제 또는 이어 풀 문제를 조회합니다.
- **Auth**: ✅
- **Path**: `unitId`
- **Query**: `userId` (선택, 이어풀기용)
- **Response 200 (처음 풀 때 / 이어 풀 때 / 완료했을 때)**: `problem` 객체, `problemIds` 배열, `progress` 객체를 포함합니다. `problem`은 완료 시 `null`이 됩니다.

  ```json
  {
    "problem": {
      "problemId": "64fa0p111111111111111111",
      "...": "..."
    },
    "problemIds": ["64fa0p111111111111111111", "64fa0p222222222222222222"],
    "progress": {
      "completed": 0,
      "total": 4,
      "remaining": 4,
      "percentage": 0.0
    },
    "isFirstTime": true
  }
  ```

### 3.4. 소단원 단건 조회 (Get Single Unit)

- **Endpoint**: `GET /v1/units/{unitId}`
- **Description**: 특정 소단원의 상세 정보를 조회합니다.
- **Auth**: ✅
- **Path**: `unitId`
- **Response 200**

  ```json
  {
    "unitId": "64unit001111111111111111",
    "subject": "math",
    "title": { "ko": "정수와 유리수", "en": "..." },
    "grade": 1,
    "chapter": 1,
    "chapterTitle": "수와 연산",
    "orderInGrade": 3,
    "description": { "ko": "..." },
    "status": "active"
  }
  ```

---

# 4. 채점 및 해설 (Scoring & Explanation)

### 4.1. 문제 채점 및 해설 조회 (Check Answer)

- **Endpoint**: `POST /v1/answers/check`
- **Description**: 사용자의 답안을 채점하고, 해설 및 학습 진행 상황을 반환합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Headers**: `Idempotency-Key`
- **Body**:

  ```json
  {
    "mode": "practice",
    "sessionId": "64fa0a111111111111111111",
    "unitId": "64unit001111111111111111",
    "problemId": "64fa0p111111111111111111",
    "userAnswer": { "answer": "6cm²" },
    "durationSeconds": 54
  }
  ```

- **Response 200**

  ```json
  {
    "answerId": "64ans11111111111111111111",
    "isCorrect": true,
    "explanation": { "explanation": "..." },
    "relatedConcepts": [{ "unitId": "...", "title": "..." }],
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

---

# 5. 개념 학습 (Concept Learning)

### 5.1. 소단원별 개념 조회 (Get Concepts for Unit)

- **Endpoint**: `GET /v1/concepts/{unitId}/concept`
- **Description**: 특정 소단원의 개념 학습 콘텐츠를 조회합니다.
- **Auth**: ✅
- **Path**: `unitId`
- **Response 200**: 다양한 타입의 `blocks` 배열을 포함합니다.

  ```json
  {
    "conceptId": "68con11111111111111111111",
    "unitId": "68a013e4fe733a1c891816f3",
    "blocks": [
      {
        "type": "realExample",
        "title": "실생활에서 찾는 예시",
        "text": "...",
        "imageUrl": "...",
        "examples": ["..."]
      },
      {
        "type": "explanation",
        "title": "수학 개념 설명",
        "text": "...",
        "latex": "...",
        "imageUrl": "...",
        "steps": ["..."]
      },
      {
        "type": "practiceProblems",
        "title": "직접 풀어보기",
        "text": "...",
        "problems": [
          {
            "id": 1,
            "type": "math",
            "question": "...",
            "answer": "...",
            "explanation": "..."
          }
        ]
      }
    ],
    "createdAt": "2025-07-14T10:10:00Z"
  }
  ```

### 5.2. 개념 학습 완료 (Complete Concept Learning)

- **Endpoint**: `POST /v1/concepts/{unitId}/concept/complete`
- **Description**: 개념 학습을 완료 처리하고 진행률을 업데이트합니다.
- **Auth**: ✅, **Idempotent**: ✅
- **Path**: `unitId`
- **Body**:

  ```json
  {
    "learningTimeId": "64fa0c111111111111111111"
  }
  ```

- **Response 200**

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
      "...": "..."
    }
  }
  ```

---

# 6. 어휘 (Vocabulary)

### 6.1. 단원별 어휘 조회 (Get Vocab by Unit)

- **Endpoint**: `GET /v1/voca/unit/{unitId}`
- **Description**: 특정 단원의 어휘 목록을 조회합니다.
- **Auth**: ✅
- **Path**: `unitId`
- **Response 200**

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
      }
    ]
  }
  ```

### 6.2. 빈출 어휘 조회 (Get Common Vocab)

- **Endpoint**: `GET /v1/voca/common/{type}`
- **Description**: 빈출 어휘(숙어/단어) 목록을 조회합니다.
- **Auth**: ✅
- **Path**: `type` (e.g., `sat_act`)
- **Response 200**

  ```json
  {
    "type": "sat_act",
    "vocabularies": [
      {
        "vocaId": "64v3333333333333333333333",
        "word": "solve for",
        "meaning": "~에 대해 풀다",
        "etymology": "...",
        "imageUrl": "..."
      }
    ]
  }
  ```

### 6.3. 어휘 테스트 생성 (Create Vocab Test)

- **Endpoint**: `GET /v1/voca/test`
- **Description**: 특정 단원의 어휘 테스트 문제 세트를 생성합니다.
- **Auth**: ✅
- **Query**: `unitId`
- **Response 200**

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
          "explanation": "...",
          "questionType": "word_to_meaning"
        }
      ]
    },
    "generatedAt": "2025-07-14T10:20:00Z"
  }
  ```

### 6.4. 복습 어휘 조회 (Get Review Vocab)

- **Endpoint**:
  - `GET /v1/voca/review/unit/{unitId}` (단원별)
  - `GET /v1/voca/review/common/{type}` (빈출 어휘별)
- **Description**: 사용자가 틀렸던 어휘 목록을 복습용으로 조회합니다.
- **Auth**: ✅
- **Path**: `unitId` or `type`
- **Query**: `userId`
- **Response 200**

  ```json
  {
    "unitId": "64unit001111111111111111",
    "userId": 12345,
    "incorrectVocabularies": [
      {
        "vocaId": "64v1111111111111111111111",
        "word": "angle",
        "meaning": "각도",
        "...": "..."
      }
    ]
  }
  ```

---

# 7. 즐겨찾기 (Bookmarks)

### 7.1. 북마크 토글 (Toggle Bookmark)

- **Endpoint**: `POST /v1/bookmarks/toggle`
- **Description**: 문제에 대한 북마크를 추가하거나 해제합니다.
- **Auth**: ✅
- **Query**: `userId`
- **Body**:

  ```json
  {
    "problemId": "64fa0b111111111111111111"
  }
  ```

- **Response 200**

  ```json
  {
    "bookmarkId": "64book111111111111111111",
    "problemId": "64fa0b111111111111111111",
    "bookmarked": true,
    "message": "북마크가 추가되었습니다"
  }
  ```

### 7.2. 북마크 목록 조회 (Get Bookmark List)

- **Endpoint**: `GET /v1/bookmarks`
- **Description**: 사용자의 북마크 목록을 조회합니다.
- **Auth**: ✅
- **Query**: `userId`, `unitId`, `startDate`, `endDate`
- **Response 200**

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

### 7.3. 북마크 복습 시작 (Start Bookmark Review)

- **Endpoint**: `POST /v1/bookmarks/review`
- **Description**: 북마크한 문제들로 복습 세션을 시작합니다.
- **Auth**: ✅
- **Query**: `userId`
- **Body**:

  ```json
  {
    "unitId": "64unit001111111111111111",
    "mode": "set"
  }
  ```

- **Response 201/200**: `mode`에 따라 응답이 다릅니다.

  ```json
  {
    "setId": "64set111111111111111111",
    "problemIds": ["...", "..."],
    "totalProblems": 15,
    "mode": "review"
  }
  ```

### 7.4. 북마크 상태 확인 (Check Bookmark Status)

- **Endpoint**: `GET /v1/bookmarks/{problemId}/status`
- **Description**: 특정 문제의 북마크 상태를 확인합니다.
- **Auth**: ✅
- **Path**: `problemId`
- **Query**: `userId`
- **Response 200**

  ```json
  {
    "problemId": "64fa0b111111111111111111",
    "bookmarked": true,
    "bookmarkedAt": "2025-07-15T10:30:00Z"
  }
  ```

---

# 8. 학습 진행률 및 통계 (Progress & Stats)

### 8.1. 전체 진행률 조회 (Get Overall Progress)

- **Endpoint**: `GET /v1/progress/overall`
- **Description**: 사용자의 전체 학습 진행률을 조회합니다.
- **Auth**: ✅, **Query**: `userId`
- **Response 200**

  ```json
  {
    "totalConceptProgress": 65.98,
    "totalProblemProgress": 45.36,
    "totalVocabProgress": 52.04,
    "completedAllUnitsRatio": 35.05
  }
  ```

### 8.2. 유형별 진행률 목록 조회 (Get Progress by Type)

- **Endpoints**:
  - `GET /v1/progress/concepts` (개념)
  - `GET /v1/progress/problems` (문제)
  - `GET /v1/progress/vocab` (어휘)
- **Description**: 각 학습 유형별로 소단원의 진행률 목록을 조회합니다.
- **Auth**: ✅, **Query**: `userId`
- **Response 200**

  ```json
  {
    "units": [
      {
        "unitId": "64unit001111111111111111",
        "unitTitle": "소단원 제목",
        "conceptProgress": 100,
        "status": "completed"
      }
    ]
  }
  ```

### 8.3. 활동 통계 조회 (Get Activity Stats)

- **Endpoint**: `GET /v1/activity/stats`
- **Description**: 사용자의 일일 및 전체 학습 활동 통계를 조회합니다.
- **Auth**: ✅, **Query**: `userId`, `date` (선택)
- **Response 200**

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

# 9. 게이미피케이션 (Gamification)

### 9.1. 기본 캐릭터 목록 조회 (Get Default Characters)

- **Endpoint**: `GET /v1/characters/default`
- **Auth**: ❌, **Query**: `gender`
- **Response 200**

  ```json
  {
    "characters": [
      {
        "characterId": "char_default_male_lv1",
        "name": "기본 캐릭터(남)",
        "imageUrl": "...",
        "gender": "male",
        "level": 1
      }
    ]
  }
  ```

### 9.2. 사용자 캐릭터 정보 조회 (Get My Character)

- **Endpoint**: `GET /v1/characters/my`
- **Auth**: ✅, **Query**: `userId`
- **Response 200**

  ```json
  {
    "gamificationState": {
      "gamifiId": "...",
      "userId": 12345,
      "level": 3,
      "xp": 150
    },
    "equippedCharacter": {
      "characterId": "char_default_male_lv3",
      "name": "기본 캐릭터(남) Lv.3",
      "imageUrl": "..."
    }
  }
  ```

### 9.3. XP 및 레벨업 이력 조회 (Get XP/Level History)

- **Endpoints**:
  - `GET /v1/gamification/xp-history`
  - `GET /v1/gamification/level-history`
- **Auth**: ✅, **Query**: `userId`
- **Response 200 (XP History)**

  ```json
  {
    "transactions": [
      {
        "transactionId": "...",
        "amount": 10,
        "reason": "problem_solved",
        "at": "2025-07-14T11:00:00Z"
      }
    ],
    "pagination": { "...": "..." }
  }
  ```

---

# 10. 학습 활동 기록 (Learning Activity Log)

### 11.1. 학습 활동 시작 (Start Learning Activity)

- **Endpoint**: `POST /v1/learning/start`
- **Auth**: ✅
- **Body**:

  ```json
  {
    "activityType": "concept_learning",
    "contentId": "507f1f77bcf86cd799439011",
    "sessionId": "session_123"
  }
  ```

- **Response 201**

  ```json
  {
    "learningTimeId": "507f1f77bcf86cd799439011",
    "startedAt": "2025-01-14T10:30:00.000Z",
    "activityType": "concept_learning",
    "contentId": "507f1f77bcf86cd799439011"
  }
  ```

### 11.2. 현재 학습 활동 확인 (Check Active Learning)

- **Endpoint**: `GET /v1/learning/active`
- **Auth**: ✅
- **Response 200**: `activeSession` 객체를 포함하며, 활성 세션이 없으면 `null`입니다.

  ```json
  {
    "activeSession": {
      "learningTimeId": "507f1f77bcf86cd799439011",
      "activityType": "concept_learning",
      "startedAt": "2025-01-14T10:30:00.000Z",
      "elapsedSeconds": 1800
    }
  }
  ```

---

# 11. 회원 관리 (User Management)

### 12.1. 이메일 인증 코드 발송/확인

- **Endpoints**:
  - `POST /v1/auth/send-verification`
  - `POST /v1/auth/check-verification`
- **Auth**: ❌
- **Description**: 회원가입을 위한 이메일 인증 코드를 발송하고 확인합니다.

### 12.2. 회원가입 (Register)

- **Endpoint**: `POST /v1/auth/register`
- **Auth**: ❌
- **Description**: 이메일 인증 후 사용자 정보를 등록합니다.
- **Body**: `email`, `password`, `name`, `birthDate`, `phoneNumber`, `nickname`, `gender`

### 12.3. 로그인/로그아웃 (Login/Logout)

- **Endpoints**:
  - `POST /v1/auth/login` (Auth: ❌)
  - `POST /v1/auth/logout` (Auth: ✅)
- **Description**: 로그인을 통해 `accessToken`을 발급받거나, 로그아웃 처리합니다.

### 12.4. 사용자 정보 조회 (Get Profile)

- **Endpoint**: `GET /v1/auth/profile`
- **Auth**: ✅
- **Description**: 현재 로그인된 사용자의 상세 정보를 조회합니다.

---

# 12. 챗봇 시스템 (AI Tutor)

### 13.1. 챗봇 세션 시작

- **POST /v1/chatbot/sessions**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers:
  - `Authorization: Bearer <JWT>`
  - `Idempotency-Key: idem_chat_session_001`
  - `X-Request-Id: req_chat_session_001`
- Query: —
- **Body**

```json
{
  "context": {
    "type": "concept", // concept | problem | vocabulary | general
    "contentId": "64fa0a111111111111111111", // unitId, problemId, vocaId 등
    "unitId": "64unit001111111111111111", // 현재 학습 중인 단원
    "userClass": "pre-nerd" // pre-nerd | nerd
  },
  "initialMessage": "이차함수에서 꼭짓점을 구하는 방법을 설명해주세요"
}
```

- **Response 201**

```json
{
  "sessionId": "64chat111111111111111111",
  "context": {
    "type": "concept",
    "contentId": "64fa0a111111111111111111",
    "unitId": "64unit001111111111111111",
    "userClass": "pre-nerd"
  },
  "aiResponse": {
    "message": "이차함수의 꼭짓점을 구하는 방법을 설명드리겠습니다.\n\n**표준형으로 변환하는 방법:**\ny = ax² + bx + c를 y = a(x-h)² + k 형태로 바꾸면\n꼭짓점의 좌표는 (h, k)가 됩니다.",
    "latex": "y = a(x-h)^2 + k",
    "relatedConcepts": ["완전제곱식", "이차함수의 그래프"],
    "suggestedQuestions": [
      "완전제곱식은 어떻게 만드나요?",
      "예제 문제를 풀어볼 수 있을까요?",
      "영어로는 꼭짓점을 뭐라고 하나요?"
    ]
  },
  "createdAt": "2025-08-22T10:00:00Z"
}
```

- Errors: 400, 401, 422, 500

---

### 13.2. 챗봇 메시지 전송

- **POST /v1/chatbot/sessions/{sessionId}/messages**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers:
  - `Authorization: Bearer <JWT>`
  - `Idempotency-Key: idem_chat_msg_001`
  - `X-Request-Id: req_chat_msg_001`
- **Path**: `sessionId=64chat111111111111111111`
- **Body**

```json
{
  "message": "예제 문제를 풀어볼 수 있을까요?",
  "messageType": "text", // text | image | problem_request
  "attachments": [] // 이미지나 문제 ID 등
}
```

- **Response 200**

```json
{
  "messageId": "64msg111111111111111111",
  "userMessage": {
    "message": "예제 문제를 풀어볼 수 있을까요?",
    "messageType": "text",
    "timestamp": "2025-08-22T10:05:00Z"
  },
  "aiResponse": {
    "message": "네! 예제 문제를 함께 풀어보겠습니다.\n\n**문제:** y = x² - 4x + 7의 꼭짓점을 구해보세요.\n\n**단계별 풀이:**\n1) 완전제곱식으로 변환합니다\n2) y = x² - 4x + 4 - 4 + 7\n3) y = (x - 2)² + 3\n\n따라서 꼭짓점은 (2, 3)입니다.",
    "latex": "y = (x - 2)^2 + 3",
    "problemExample": {
      "question": "y = x² - 4x + 7의 꼭짓점을 구하세요",
      "solution": "y = (x - 2)² + 3이므로 꼭짓점은 (2, 3)",
      "englishTerms": [
        { "korean": "꼭짓점", "english": "vertex" },
        { "korean": "완전제곱식", "english": "perfect square" }
      ]
    },
    "suggestedQuestions": [
      "다른 문제도 풀어볼까요?",
      "이차함수의 최댓값은 어떻게 구하나요?",
      "그래프로 표현하면 어떻게 되나요?"
    ],
    "xpAwarded": 5
  }
}
```
