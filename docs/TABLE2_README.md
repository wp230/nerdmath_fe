### **`diagnostic_test` (진단 테스트)**

| 필드명                   | 타입     | 필수 여부   | 설명                                       | 예시                         |
| :----------------------- | :------- | :---------- | :----------------------------------------- | :--------------------------- |
| **testId (PK)**          | ObjectId | 필수        | 진단 테스트 고유 ID                        | `"64fa0a..."`                |
| **userId (FK)**          | Number   | 필수        | 사용자 참조용                              | `1`                          |
| **gradeRange**           | Object   | 필수        | 사용자가 선택한 학년 범위 (최소·최대)      | `{"min":1,"max":3}`          |
| **selectedRuleSnapshot** | Object   | 선택        | 문제 선정 규칙 스냅샷                      | `{"perUnit":2,"perLevel":1}` |
| **restartCount**         | Number   | 필수        | 재시작 횟수                                | `0`                          |
| **shuffleSeed**          | Number   | 조건부 필수 | 문제 순서 셔플링 (2회 이상 재시작 시 필요) | `0`                          |
| **timeoutMinutes**       | Number   | 필수        | 제한 시간                                  | `30`                         |
| **startedAt**            | Date     | 필수        | 테스트 시작 시각                           | `"2025-07-10T12:00:00Z"`     |
| **endedAt**              | Date     | 필수        | 테스트 종료 시각                           | `"2025-07-10T12:20:00Z"`     |
| **durationSec**          | Number   | 필수        | 소요 시간 (초)                             | `1200`                       |
| **completed**            | Boolean  | 필수        | 완료 여부                                  | `TRUE`                       |

---

### **`answer_attempt` (문제 풀이·채점 기록)**

| 필드명                | 타입          | 필수 여부   | 설명                     | 예시                         |
| :-------------------- | :------------ | :---------- | :----------------------- | :--------------------------- |
| **answerId (PK)**     | ObjectId      | 필수        | 풀이 기록 고유 ID        | `"64fa0a..."`                |
| **userId (FK)**       | Number        | 필수        | 사용자 ID                | `1`                          |
| **problemId (FK)**    | ObjectId      | 필수        | 문제 ID                  | `"64fa0a..."`                |
| **mode**              | String (Enum) | 필수        | 풀이 모드                | `"diagnostic"`               |
| **setId (PK)**        | ObjectId      | 선택        | 문제 세트 ID             | `"64fa0a..."`                |
| **unitId**            | ObjectId      | 필수        | 소단원 ID                | `"64fa0a..."`                |
| **userAnswer**        | Object        | 필수        | 제출 답안                | `{"value":"6cm²"}`           |
| **isCorrect**         | Boolean       | 필수        | 정답 여부                | `TRUE`                       |
| **vocaId (FK)**       | ObjectId      | 조건부 필수 | 어휘 테스트 시 답 관리용 | `"64fa0a..."`                |
| **scoredAt**          | Date          | 필수        | 채점 시각                | `"2025-07-14T10:30:00Z"`     |
| **explanationShown**  | Boolean       | 선택        | 해설 노출 여부           | `TRUE`                       |
| **problemOrderIndex** | Number        | 선택        | 세트 내 문항 순서        | `7`                          |
| **idempotencyKey**    | String        | 선택        | 중복 방지 키             | `"idem_ans_20250714_103000"` |

---

### **`diagnostic_analysis` (진단 테스트 분석 및 맞춤형 학습 경로)**

| 필드명              | 타입          | 필수 여부 | 설명                    | 예시                                                         |
| :------------------ | :------------ | :-------- | :---------------------- | :----------------------------------------------------------- |
| **analysisId (PK)** | ObjectId      | 필수      | 분석 고유 ID            | `"64fa0a..."`                                                |
| **testId (FK)**     | ObjectId      | 필수      | 진단 세션 ID 참조       | `"64fa0a..."`                                                |
| **userId (FK)**     | Number        | 필수      | 사용자 ID               | `1`                                                          |
| **analysisType**    | String (Enum) | 필수      | 분석 유형               | `"diagnostic"`                                               |
| **aiComment**       | String        | 필수      | AI 피드백 코멘트        | `"함수 단원의 오답률이 높습니다..."`                         |
| **recommendedPath** | Array<Object> | 필수      | 추천 학습 경로          | `[{"unitId":"64fbc...","priority":1,"reason":"오답률 80%"}]` |
| **class**           | String        | 필수      | pre-nerd/nerd 등급 구분 | `"pre-nerd"`                                                 |
| **generatedAt**     | Date          | 필수      | 분석 생성 시각          | `"2025-07-10T12:00:00Z"`                                     |

---

### **`unit` (소단원 정보)**

| 필드명           | 타입     | 필수 여부 | 설명                | 예시                                                          |
| :--------------- | :------- | :-------- | :------------------ | :------------------------------------------------------------ |
| **unitId (PK)**  | ObjectId | 필수      | 소단원 고유 ID      | `"64fa0a..."`                                                 |
| **subject**      | String   | 필수      | 과목 코드 또는 명칭 | `"math"`                                                      |
| **title**        | Object   | 필수      | 다국어 제목         | `{"ko":"정수와 유리수","en":"Integers and Rational Numbers"}` |
| **grade**        | Number   | 필수      | 대상 학년           | `1`                                                           |
| **chapter**      | Number   | 필수      | 대단원 번호         | `1`                                                           |
| **chapterTitle** | String   | 필수      | 대단원 제목         | `"수와 연산"`                                                 |
| **orderInGrade** | Number   | 필수      | 학년 내 순서        | `3`                                                           |
| **description**  | Object   | 선택      | 소단원 간략 설명    | `{"ko":"정수와 유리수의 정의를 다룸"}`                        |
| **status**       | String   | 필수      | 표시 상태           | `"active"`                                                    |
| **createdAt**    | Date     | 필수      | 등록 시각           | `"2025-07-14T10:00:00Z"`                                      |

---

### **`problem` (문제 DB)**

| 필드명             | 타입          | 필수 여부   | 설명                         | 예시                                       |
| :----------------- | :------------ | :---------- | :--------------------------- | :----------------------------------------- |
| **problemId (PK)** | ObjectId      | 필수        | 문제 고유 ID                 | `"64fa0a..."`                              |
| **unitId (FK)**    | ObjectId      | 필수        | 소단원 ID                    | `"64fa0a..."`                              |
| **grade**          | Number        | 필수        | 학년                         | `1`                                        |
| **chapter**        | Number        | 필수        | 대단원 번호                  | `1`                                        |
| **context**        | Object        | 필수        | 문제 출처/용도               | `{"source":"교과서","for":["diagnostic"]}` |
| **cognitiveType**  | String (Enum) | 필수        | 인지유형                     | `"이해"`                                   |
| **level**          | String (Enum) | 필수        | 난이도                       | `"중"`                                     |
| **diagnosticTest** | Boolean       | 필수        | 진단 테스트용 문제 구분용    | `TRUE`                                     |
| **diagnosticUnit** | String (Enum) | 조건부 필수 | 진단 테스트 학년 범위 구분용 | `"middle_1"`                               |
| **type**           | String (Enum) | 필수        | 문제 유형                    | `"객관식"`                                 |
| **tags**           | Array         | 필수        | 검색/분류 태그               | `["함수","그래프"]`                        |
| **content**        | Object        | 필수        | 지문·보기·LaTeX 등           | `{...}`                                    |
| **correctAnswer**  | String        | 필수        | 정답                         | `"4"`                                      |
| **explanation**    | Object        | 필수        | 해설                         | `{"text":"밑변×높이÷2"}`                   |
| **imageUrl**       | String        | 선택        | 시각 자료 경로               | `"/images/problems/triangle_area.png"`     |
| **createdAt**      | Date          | 필수        | 생성 시각                    | `"2025-07-14T10:25:00Z"`                   |
| **updatedAt**      | Date          | 필수        | 수정 시각                    | `"2025-07-14T10:25:00Z"`                   |

---

### **`problem_set` (문제 세트 메타 정보)**

| 필드명             | 타입            | 필수 여부   | 설명                            | 예시                                                                             |
| :----------------- | :-------------- | :---------- | :------------------------------ | :------------------------------------------------------------------------------- |
| **setId (PK)**     | ObjectId        | 필수        | 문제 세트 고유 ID               | `"64fa0a..."`                                                                    |
| **userId (FK)**    | Number          | 필수        | 세트 생성 사용자 ID             | `1`                                                                              |
| **unitId (FK)**    | ObjectId        | 선택        | 대표 소단원 ID                  | `"64fa0a..."`                                                                    |
| **problemIds**     | Array<ObjectId> | 필수        | 포함 문제 목록                  | `["64fa0a...","64fa0b..."]`                                                      |
| **ruleSnapshot**   | Object          | 선택        | 세트 생성 시 적용된 규칙 + seed | `{"perUnit":2,"perCognitiveType":{"개념":1,...},"perLevel":{...},"seed":918273}` |
| **diagnosticUnit** | String (Enum)   | 조건부 필수 | 진단 테스트 학년 범위 구분용    | `"middle_1"`                                                                     |
| **mode**           | String (Enum)   | 선택        | 세트 모드                       | `"diagnostic"`                                                                   |
| **title**          | String          | 선택        | 세트 제목                       | `"진단테스트 문제 세트"`                                                         |
| **createdAt**      | Date            | 필수        | 생성 시각                       | `"2025-07-14T10:20:00Z"`                                                         |

---

### **`concept` (개념 설명)**

| 필드명             | 타입     | 필수 여부 | 설명               | 예시                                    |
| :----------------- | :------- | :-------- | :----------------- | :-------------------------------------- |
| **conceptId (PK)** | ObjectId | 필수      | 개념 설명 고유 ID  | `"64fa0a..."`                           |
| **unitId (FK)**    | ObjectId | 필수      | 소단원 참조용      | `"64fa0a..."`                           |
| **blocks**         | Array    | 필수      | 개념 콘텐츠 블록들 | `[{"type":"realExample","text":"..."}]` |
| **createdAt**      | Date     | 필수      | 등록 시각          | `"2025-07-14T10:10:00Z"`                |

---

### **`vocabulary` (어휘 카드)**

| 필드명          | 타입          | 필수 여부   | 설명                 | 예시                        |
| :-------------- | :------------ | :---------- | :------------------- | :-------------------------- |
| **vocaId (PK)** | ObjectId      | 필수        | 어휘 카드 고유 ID    | `"64fa0a..."`               |
| **type**        | String (Enum) | 필수        | 어휘 카드 유형       | `"복습"`                    |
| **category**    | String (Enum) | 필수        | 카테고리             | `"math_term"`               |
| **unitId (FK)** | ObjectId      | 조건부 필수 | 관련 소단원 ID       | `"64fa0a..."`               |
| **word**        | String        | 필수        | 영어 단어            | `"angle"`                   |
| **meaning**     | String        | 필수        | 한글 뜻              | `"각도"`                    |
| **etymology**   | String        | 조건부 필수 | 어근/접두사 설명     | `"angulus: 라틴어 모서리"`  |
| **imageUrl**    | String        | 조건부 필수 | 시각 자료 이미지 URL | `"/images/vocab/angle.png"` |
| **createdAt**   | Date          | 필수        | 등록 시각            | `"2025-07-14T10:15:00Z"`    |

---

### **`progress` (학습 진행률)**

| 필드명              | 타입     | 필수 여부 | 설명                 | 예시                     |
| :------------------ | :------- | :-------- | :------------------- | :----------------------- |
| **progressId (PK)** | ObjectId | 필수      | 진행률 고유 ID       | `"64fa0a..."`            |
| **userId (FK)**     | Number   | 필수      | 사용자 ID            | `1`                      |
| **unitId (FK)**     | ObjectId | 필수      | 소단원 ID            | `"64fa0a..."`            |
| **conceptProgress** | Number   | 필수      | 개념 학습 진행률 (%) | `25`                     |
| **problemProgress** | Number   | 필수      | 문제 풀이 진행률 (%) | `20`                     |
| **vocabProgress**   | Number   | 필수      | 어휘 학습 진행률 (%) | `40`                     |
| **updatedAt**       | Date     | 필수      | 업데이트 시각        | `"2025-07-14T10:40:00Z"` |

---

### **`activity_log` (사용자 활동 집계)**

| 필드명                | 타입     | 필수 여부 | 설명                   | 예시           |
| :-------------------- | :------- | :-------- | :--------------------- | :------------- |
| **logId (PK)**        | ObjectId | 필수      | 활동 로그 고유 ID      | `"64fa0a..."`  |
| **userId (FK)**       | Number   | 필수      | 사용자 ID              | `1`            |
| **date**              | String   | 필수      | 활동 일자 (YYYY-MM-DD) | `"2025-07-14"` |
| **todaySolved**       | Number   | 필수      | 해당 날짜에 푼 문제 수 | `12`           |
| **studyDurationMin**  | Number   | 필수      | 학습 시간 (분)         | `45`           |
| **totalProblems**     | Number   | 필수      | 누적 문제 수           | `254`          |
| **totalStudyMinutes** | Number   | 필수      | 누적 학습 시간 (분)    | `980`          |
| **attendanceCount**   | Number   | 필수      | 누적 출석일 수         | `22`           |

---

### **`gamification_state` (게이미피케이션 상태)**

| 필드명                  | 타입     | 필수 여부 | 설명                    | 예시                              |
| :---------------------- | :------- | :-------- | :---------------------- | :-------------------------------- |
| **gamifiId (PK)**       | ObjectId | 필수      | 경험치 상태 고유 ID     | `"64fa0a..."`                     |
| **userId (FK)**         | Number   | 필수      | 사용자 ID               | `1`                               |
| **level**               | Number   | 필수      | 현재 레벨               | `5`                               |
| **xp**                  | Number   | 필수      | 현재 레벨 내 누적 XP    | `80`                              |
| **totalXp**             | Number   | 필수      | 총 누적 XP              | `1580`                            |
| **nextLevelXp**         | Number   | 필수      | 다음 레벨까지 필요한 XP | `100`                             |
| **equippedCharacterId** | String   | 필수      | 장착 캐릭터             | `"char_default"`                  |
| **equippedSkinId**      | String   | 필수      | 장착 스킨               | `"skin_default"`                  |
| **unlockedSkinIds**     | Array    | 필수      | 보유 스킨 목록          | `["skin_default","skin_lv3_cat"]` |
| **lastLeveledUpAt**     | Date     | 선택      | 최근 레벨업 시각        | `"2025-07-14T10:59:00Z"`          |
| **createdAt**           | Date     | 필수      | 생성 시각               | `"2025-07-01T00:00:00Z"`          |
| **updatedAt**           | Date     | 필수      | 마지막 갱신 시각        | `"2025-07-14T11:00:00Z"`          |

---

### **`xp_transactions` (경험치 지급 이력)**

| 필드명                 | 타입          | 필수 여부 | 설명                 | 예시                     |
| :--------------------- | :------------ | :-------- | :------------------- | :----------------------- |
| **transactionId (PK)** | ObjectId      | 필수      | XP 지급 이력 고유 ID | `"64fa0a..."`            |
| **userId (FK)**        | Number        | 필수      | 사용자 ID            | `1`                      |
| **amount**             | Number        | 필수      | 지급 XP 양           | `10`                     |
| **reason**             | String (Enum) | 필수      | 지급 사유            | `"problem_solved"`       |
| **reasonRef**          | String        | 선택      | 외부 참조 ID         | `"answerId:64fa0a..."`   |
| **idempotencyKey**     | String        | 필수      | 중복 방지 키         | `"idem_123"`             |
| **at**                 | Date          | 필수      | 지급 시각            | `"2025-07-14T11:00:00Z"` |

---

### **`learning_time_log` (학습 시간 기록)**

| 필드명                 | 타입          | 필수 여부 | 설명                | 예시                     |
| :--------------------- | :------------ | :-------- | :------------------ | :----------------------- |
| **learningTimeId(PK)** | ObjectId      | 필수      | 학습 활동 고유 ID   | `"64fa0a..."`            |
| **userId (FK)**        | Number        | 필수      | 사용자 ID           | `47`                     |
| **activityType**       | String (Enum) | 필수      | 활동 유형           | `"problem"`              |
| **contentId**          | ObjectId      | 필수      | 활동 대상 콘텐츠 ID | `"64fa0a..."`            |
| **sessionId**          | ObjectId      | 선택      | 세션 ID             | `"64fa0a..."`            |
| **startedAt**          | Date          | 필수      | 시작 시각           | `"2025-07-14T11:00:00Z"` |
| **endedAt**            | Date          | 필수      | 종료 시각           | `"2025-07-14T11:18:00Z"` |
| **durationSeconds**    | Number        | 필수      | 소요 시간 (초)      | `1065`                   |
| **createdAt**          | Date          | 필수      | 저장 시각           | `"2025-07-14T11:00:00Z"` |

---

### **`bookmark` (즐겨찾기)**

| 필드명              | 타입     | 필수 여부 | 설명               | 예시                     |
| :------------------ | :------- | :-------- | :----------------- | :----------------------- |
| **bookmarkId (PK)** | ObjectId | 필수      | 즐겨찾기 고유 ID   | `"64fa0a..."`            |
| **userId (FK)**     | Number   | 필수      | 사용자 참조용      | `1`                      |
| **problemId (FK)**  | ObjectId | 필수      | 문제 참조용        | `"64fa0a..."`            |
| **unitId (FK)**     | ObjectId | 선택      | 소단원 참조용      | `"64fa0a..."`            |
| **bookmarkedAt**    | Date     | 필수      | 즐겨찾기 등록 시각 | `"2025-07-10T12:00:00Z"` |
| **createdAt**       | Date     | 필수      | 생성 시각          | `"2025-07-10T12:00:00Z"` |
| **updatedAt**       | Date     | 필수      | 수정 시각          | `"2025-07-10T12:00:00Z"` |

---

### **`character` (캐릭터 정보)**

| 필드명          | 타입          | 필수 여부 | 설명               | 예시                        |
| :-------------- | :------------ | :-------- | :----------------- | :-------------------------- |
| **characterId** | String        | 필수      | 캐릭터 고유 ID     | `"64fa0a..."`               |
| **name**        | String        | 필수      | 캐릭터 이름        | `"기본 캐릭터(남)"`         |
| **imageUrl**    | String        | 필수      | 캐릭터 이미지 경로 | `"/images/vocab/angle.png"` |
| **gender**      | String (Enum) | 필수      | 성별               | `"male"`                    |
| **level**       | Number        | 필수      | 레벨               | `1`                         |
| **description** | String        | 선택      | 캐릭터 설명        | `"기본 남학생 캐릭터"`      |
| **isDefault**   | Boolean       | 필수      | 기본 캐릭터 여부   | `TRUE`                      |
| **isActive**    | Boolean       | 필수      | 활성화 여부        | `TRUE`                      |
| **createdAt**   | Date          | 필수      | 생성 시각          | `"2025-07-10T12:00:00Z"`    |
| **updatedAt**   | Date          | 필수      | 수정 시각          | `"2025-07-10T12:00:00Z"`    |
