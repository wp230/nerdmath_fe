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

export interface GradeName {
  id: number;
  name: string;
  range: string;
}

export interface UnitGradeInfo {
  id: number;
  title: string;
  gradeNames: {
    [grade: number]: GradeName;
  };
}

export type UnitGradeNames = Record<string, UnitGradeInfo>;

// 학습 타입 정의 (개념공부, 문제풀기)
export type StudyType = 'concept' | 'problem';

// 문제 난이도 정의 (이해, 적용, 응용)
export type DifficultyLevel = 'understanding' | 'application' | 'advanced';

export interface StudyLink {
  type: StudyType;
  href: string;
  label: string;
  difficulty?: DifficultyLevel;
}
