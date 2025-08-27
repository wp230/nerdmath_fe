// 공통 열거형 타입

// 과목 타입
export enum Subject {
  MATH = 'math',
  SCIENCE = 'science',
  ENGLISH = 'english',
  KOREAN = 'korean',
}

// 문제 유형
export enum ProblemType {
  OBJECTIVE = '객관식',
  SUBJECTIVE = '주관식',
  TRUE_FALSE = '참거짓',
  MATCHING = '연결하기',
  FILL_BLANK = '빈칸채우기',
}

// 문제 난이도
export enum ProblemLevel {
  EASY = '하',
  MEDIUM = '중',
  HARD = '상',
}

// 인지 유형
export enum CognitiveType {
  UNDERSTANDING = '이해',
  APPLICATION = '적용',
  ANALYSIS = '분석',
  SYNTHESIS = '종합',
  EVALUATION = '평가',
}

// 활동 유형
export enum ActivityType {
  CONCEPT_LEARNING = 'concept_learning',
  PROBLEM_SOLVING = 'problem_solving',
  VOCABULARY_LEARNING = 'vocabulary_learning',
  DIAGNOSTIC_TEST = 'diagnostic_test',
}

// XP 지급 사유
export enum XpReason {
  PROBLEM_SOLVED = 'problem_solved',
  CONCEPT_COMPLETED = 'concept_completed',
  VOCABULARY_LEARNED = 'vocabulary_learned',
  ATTENDANCE = 'attendance',
  STREAK = 'streak',
}

// 챗봇 컨텍스트 타입
export enum ChatbotContextType {
  CONCEPT = 'concept',
  PROBLEM = 'problem',
  VOCABULARY = 'vocabulary',
  GENERAL = 'general',
}

// 사용자 등급
export enum UserClass {
  PRE_NERD = 'pre-nerd',
  NERD = 'nerd',
}
