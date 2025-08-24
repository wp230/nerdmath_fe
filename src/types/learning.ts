// 학습 관련 기본 타입들
export interface Unit {
  unitId: string;
  title: string;
  description: string;
  linkPath: string;
  backgroundColor: string;
}

export interface Chapter {
  chapter: number;
  title: string;
  subtitle: string;
  grade: number;
  description: string;
}

export interface UnitGrade {
  id: number;
  name: string;
  range: string;
}

export interface UnitGradeInfo {
  id: number;
  title: string;
  gradeNames: Record<number, UnitGrade>;
}

// 학습 진행 상태 타입
export interface LearningProgress {
  unitId: string;
  chapter: number;
  grade: number;
  conceptCompleted: boolean;
  problemsCompleted: number;
  totalProblems: number;
  xpEarned: number;
  lastAccessedAt: Date;
}

// 선택된 단원 정보 타입
export interface SelectedUnit {
  unitId: string;
  grade: number;
  chapter: number;
  unitTitle: string;
  chapterTitle: string;
}

// 개념 학습 타입 (향후 확장)
export interface Concept {
  id: string;
  title: string;
  content: string;
  examples: string[];
  completed: boolean;
}

// 문제 타입 (향후 확장)
export interface Problem {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 학습 단계 타입
export type LearningStage =
  | 'unit-selection'
  | 'concept'
  | 'problems'
  | 'completed';

// XP 시스템 타입
export interface XPSystem {
  conceptComplete: number; // 개념 완료 시 획득 XP
  correctAnswer: number; // 정답 시 획득 XP
  wrongAnswer: number; // 오답 시 획득 XP
  unitBonus: number; // 단원 완료 보너스 XP
}
