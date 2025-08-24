### 1-1. 진단 자격 확인

- **GET /v1/diagnostics/eligibility**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_elig_001`
- **Query**: `userId=12345`
- **Body**: `{}`
- **Response 200**

```json
{
  "eligible": true,
  "reason": null,
  "existingTestId": null
}
```

- **Response 403** (자격 없음)

```json
{
  "eligible": false,
  "reason": "이미 진단 테스트를 완료했습니다",
  "existingTestId": "64fa0a111111111111111111"
}
```

### 1-2. 진단 시작

- **POST /v1/diagnostics/start**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers:
  - `Authorization: Bearer <JWT>`
  - `Idempotency-Key: idem_diag_start_001`
  - `X-Request-Id: req_diag_start_001`
- **Query**: `userId=12345`
- **Body**

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
  "totalProblems": 20
}
```

- Errors: 403(자격없음), 409, 422, 500

### 1-3. 진단 상태 조회

- **GET /v1/diagnostics/{testId}/status**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_diag_status_001`
- **Path**: `testId=64fa0a111111111111111111`
- **Query**: `userId=12345`
- **Body**: `{}`
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
  "lastActivityAt": "2025-07-10T12:15:00Z",
  "timeoutMinutes": 30
}
```

### 1-4. 답안 제출

- **POST /v1/diagnostics/{testId}/submit**
- Auth: ✅ / Idempotent: ✅ / Mode: Sync
- Headers:
  - `Idempotency-Key: idem_diag_submit_001`
  - `X-Request-Id: req_diag_submit_001`
- **Path**: `testId=64fa0a111111111111111111`
- **Query**: `userId=12345`
- **Body**

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

- Errors: 404, 409, 422, 500

### 1-5. 진단 테스트 타임아웃 체크

- **GET /v1/diagnostics/{testId}/timeout-check**
- Auth: ✅ / Idempotent: — / Mode: Sync
- Headers: `X-Request-Id: req_timeout_001`
- **Path**: `testId=68a69df860e46a5b28fe8b6e`
- Query: `userId=12349`
- **Body**: `{}`

**Response 200 (정상 진행 중):**

```json
{
  "timedOut": false,
  "remainingMinutes": 26,
  "totalTimeoutMinutes": 30,
  "startedAt": "2025-08-21T04:09:51.612Z"
}
```

**Response 200 (타임아웃 발생):**

```json
{
  "timedOut": true,
  "message": "진단 테스트가 타임아웃되었습니다",
  "durationSec": 1800
}
```

- Errors: 404, 403, 409, 500
