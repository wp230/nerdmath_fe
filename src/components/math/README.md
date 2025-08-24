### **~~2-0. 대단원별 소단원 목록 조회~~ ✅**

- **GET /v1/units**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_units_001`, _(선택)_ `Accept-Language: ko-KR`
- **Path**: `{}`
- **Query(예시)**: `?grade=1&chapter=1&cursor=unit_1&limit=20`
- **Body**: `{}`
- **Response 200**
  ```json
  {
    "items": [
      {
        "unitId": "64fa0a111111111111111111",
        "subject": "math",
        "title": {
          "ko": "정수와 유리수",
          "en": "Integers and Rational Numbers"
        },
        "grade": 1,
        "chapter": 1,
        "chapterTitle": "수와 연산",
        "orderInGrade": 3,
        "description": { "ko": "정수와 유리수의 정의를 다룸" },
        "status": "active",
        "createdAt": "2025-07-14T10:00:00Z"
      },
      {
        "unitId": "64fa0a222222222222222222",
        "subject": "math",
        "title": { "ko": "덧셈과 뺄셈", "en": "Addition and Subtraction" },
        "grade": 1,
        "chapter": 1,
        "chapterTitle": "수와 연산",
        "orderInGrade": 4,
        "description": { "ko": "기본 연산을 학습" },
        "status": "active",
        "createdAt": "2025-07-14T10:05:00Z"
      }
    ],
    "nextCursor": null
  }
  ```
- **Errors**: 404, 500

---

### 2-1. 문제 단건 조회(안전) **✅**

- **GET /v1/problems/{problemId}**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_problem_001`
- **Path**: `problemId=64fa0p111111111111111111`
- **Body**: `{}`
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
- Errors: 404, 500

---

## **2-2. 소단원별 첫 번째 문제 조회 (문제 배열ID 포함 + 이어풀기 기능) ✅ (신규)**

- **GET /v1/units/{unitId}/first-problem**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers: `X-Request-Id: req_first_problem_001`
- **Path**: `unitId=unit_001`
- **Query**: `userId=12345` (이어풀기용, 선택사항)
- **Body**: `{}`
- **Response 200**
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
- **Response 200 (이어풀기인 경우)**
  ```json
  {
    "problem": {
      "problemId": "64fa0p222222222222222222",
      "unitId": "unit_001",
      "grade": 1,
      "chapter": 1,
      "context": { "source": "교과서", "year": 2024, "region": "서울" },
      "cognitiveType": "적용",
      "level": "중",
      "type": "객관식",
      "tags": ["덧셈", "응용"],
      "content": {
        "stem": { "text": "5 + 3 + 2 = ?" },
        "choices": [
          { "key": "①", "text": "8" },
          { "key": "②", "text": "9" },
          { "key": "③", "text": "10" },
          { "key": "④", "text": "11" }
        ]
      },
      "imageUrl": "/images/problems/problem_002.png",
      "createdAt": "2025-07-14T10:26:00Z",
      "updatedAt": "2025-07-14T10:26:00Z"
    },
    "problemIds": [
      "64fa0p111111111111111111",
      "64fa0p222222222222222222",
      "64fa0p333333333333333333",
      "64fa0p444444444444444444"
    ],
    "progress": {
      "completed": 1,
      "total": 4,
      "remaining": 3,
      "percentage": 25.0
    },
    "sortedBy": "cognitiveType",
    "sortOrder": ["이해", "적용", "응용"],
    "isFirstTime": false
  }
  ```
- **Response 200 (완료된 경우)**
  ```json
  {
    "problem": null,
    "problemIds": [
      "64fa0p111111111111111111",
      "64fa0p222222222222222222",
      "64fa0p333333333333333333",
      "64fa0p444444444444444444"
    ],
    "progress": {
      "completed": 4,
      "total": 4,
      "remaining": 0,
      "percentage": 100.0
    },
    "sortedBy": "cognitiveType",
    "sortOrder": ["이해", "적용", "응용"],
    "isFirstTime": false,
    "message": "모든 문제를 완료했습니다!"
  }
  ```
- **Errors**: 400, 404, 500

---

### 2-3. 소단원 단건 조회 **✅**

- **GET /v1/units/{unitId}**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_unit_001`, _(선택)_ `Accept-Language: ko-KR`
- **Path**: `unitId=64unit001111111111111111`
- **Body**: `{}`
- **Response 200**
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
- Errors: 404, 500

## 3-10. 채점 + 해설 API

- **POST /v1/answers/check**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers:
  - `Idempotency-Key: idem_answer_check_001`
  - `X-Request-Id: req_answer_check_001`
- Query(예시): `?stream=false`
- **Body**
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
- **Response 200**
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

**참고**:

- `mode`가 `vocab_test`일 경우 `updatedProgress`의 `problemProgress` 대신 `vocabProgress`가 응답됩니다.
- `mode`가 `diagnostic`일 경우 `updatedProgress`는 응답에 포함되지 않습니다.
- Errors: 404, 409, 422, 500

---

### **Status 값 정의**

- `"completed"`: 100% 완료
- `"in_progress"`: 1~99% 진행중
- `"not_started"`: 0% 미시작

### **4-1. 소단원별 개념 조회 ✅**

- **GET /v1/units/{unitId}/concept**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_unit_concept_001`
- **Path**: `unitId=68a013e4fe733a1c891816f3`
- **Body**: `{}`
- **Response 200**
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
        "examples": [
          "예시 1: 쇼핑할 때 할인 계산",
          "예시 2: 요리할 때 비율 계산"
        ]
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
