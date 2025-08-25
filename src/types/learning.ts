// 개념 블록 타입
export interface ConceptBlock {
  id: string;
  type:
    | 'explanation'
    | 'example'
    | 'practice'
    | 'realExample'
    | 'internationalExample'
    | 'relation';
  title: string;
  content: string;
  imageUrl?: string;
  examples?: string[];
  countries?: Array<{
    country: string;
    example: string;
  }>;
  connections?: string[];
  steps?: string[];
  latex?: string;
}

// 어휘 카드 타입
export interface VocabCard {
  id: string;
  word: string;
  meaning: string;
  etymology: string;
  imageUrl?: string;
}

// 연습 문제 타입
export interface PracticeProblem {
  id: string;
  type: 'math' | 'vocab';
  questionType: '객관식' | '주관식'; // 문제 유형 추가
  question: string;
  answer: string;
  explanation: string;
  hint: string;
  latex?: string; // 수식 렌더링을 위한 LaTeX 문자열
  choices?: string[]; // 객관식 선택지 (객관식인 경우)
}

// 학습 데이터 통합 타입
export interface LearningData {
  conceptId: string;
  unitId: string;
  concept: {
    blocks: ConceptBlock[];
  };
  vocab: {
    vocabularies: VocabCard[];
  };
  practice: {
    problems: PracticeProblem[];
  };
  createdAt: string;
}

// 학습 진행률 타입
export interface LearningProgress {
  conceptProgress: number;
  vocabProgress: number;
  practiceProgress: number;
  overallProgress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

// 학습 완료 결과 타입
export interface LearningCompletionResult {
  unitId: string;
  conceptProgress: number;
  message: string;
  updatedProgress: {
    conceptProgress: number;
    status: 'completed';
  };
  xpGained: number;
  gamificationUpdate: {
    level: number;
    xp: number;
    totalXp: number;
    nextLevelXp: number;
    leveledUp: boolean;
  };
}

// Step 1: 개념 학습 완료 결과 타입
export interface ConceptLearningResult {
  unitId: string;
  conceptProgress: number;
  message: string;
  updatedProgress: {
    conceptProgress: number;
    status: 'completed';
  };
  xpGained: number;
  gamificationUpdate: {
    level: number;
    xp: number;
    totalXp: number;
    nextLevelXp: number;
    leveledUp: boolean;
  };
}

// Step 2: 어휘 테스트 관련 타입
export interface VocabTestProblem {
  problemId: string;
  vocaId: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  questionType: 'word_to_meaning' | 'meaning_to_word';
}

export interface VocabTestSet {
  testSet: {
    unitId: string;
    testSize: number;
    problems: VocabTestProblem[];
  };
  generatedAt: string;
}

// Step 2: 실전 문제 관련 타입
export interface FirstProblemResponse {
  problem: PracticeProblem;
  problemIds: string[];
  progress: {
    completed: number;
    total: number;
    remaining: number;
    percentage: number;
  };
  sortedBy: string;
  sortOrder: string[];
  isFirstTime: boolean;
}

// Step 2: 답안 제출 관련 타입
export interface SubmitAnswerParams {
  mode: 'vocab_test' | 'practice';
  sessionId: string;
  unitId: string;
  problemId: string;
  userAnswer: { answer: string };
  durationSeconds: number;
}

export interface AnswerResponse {
  answerId: string;
  isCorrect: boolean;
  explanation: { explanation: string };
  relatedConcepts: Array<{ unitId: string; title: string }>;
  updatedProgress: {
    problemProgress?: number;
    vocabProgress?: number;
    status: 'completed' | 'in_progress';
  };
  xpGained: number;
  gamificationUpdate: {
    level: number;
    xp: number;
    totalXp: number;
    nextLevelXp: number;
    leveledUp: boolean;
  };
}

// 북마크 관련 타입
export interface BookmarkResponse {
  bookmarkId: string;
  problemId: string;
  bookmarked: boolean;
  message: string;
}

// XP 시스템 관련 타입
export interface XPTransaction {
  transactionId: string;
  amount: number;
  reason:
    | 'problem_solved'
    | 'vocab_solved'
    | 'concept_completed'
    | 'unit_completed'
    | 'streak_bonus';
  reasonRef: string;
  at: string;
}

export interface GamificationState {
  level: number;
  xp: number;
  totalXp: number;
  nextLevelXp: number;
  leveledUp: boolean;
}

// 학습 스토어 상태 타입
export interface LearningState {
  currentUnitId: string | null;
  currentMode: 'concept' | 'problem' | null;
  conceptProgress: number;
  isLearning: boolean;

  startLearning: (unitId: string, mode: 'concept' | 'problem') => void;
  updateProgress: (progress: number) => void;
  completeLearning: () => void;
  resetLearning: () => void;
}

// Step 2: 문제 풀이 모드 상태 타입
export interface ProblemModeState {
  currentProblemIndex: number;
  problemIds: string[];
  vocabTestProgress: number;
  practiceProgress: number;
  completedProblems: Set<string>;
  currentAnswer: string;
  showExplanation: boolean;
  isCorrect: boolean | null;
  currentProblem: PracticeProblem | null;
  sessionId: string;
  startTime: number;
}

// 확장된 학습 스토어 상태 타입
export interface ExtendedLearningState extends LearningState {
  // Step 2 추가 상태
  problemMode: ProblemModeState;

  // XP 시스템
  gamification: GamificationState;

  // Step 2 액션
  startProblemMode: (unitId: string, problemIds: string[]) => void;
  updateProblemProgress: (type: 'vocab' | 'practice', progress: number) => void;
  setCurrentProblem: (index: number, problem: PracticeProblem) => void;
  submitAnswer: (answer: string) => void;
  nextProblem: () => void;
  resetProblemMode: () => void;
  updateXP: (gainedXP: number, reason: string) => void;
}
