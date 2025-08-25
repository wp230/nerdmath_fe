export interface UnitData {
  unitId: string;
  title: string;
  description: string;
  backgroundColor: string;
  grade: number;
  chapter: number;
  chapterTitle: string;
  orderInGrade: number;
  status: 'active' | 'inactive';
}

export interface ChapterData {
  chapter: number;
  title: string;
  subtitle: string;
  grade: number;
  description: string;
  progress?: number;
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface UnitProgress {
  unitId: string;
  conceptProgress: number;
  problemProgress: number;
  vocabProgress: number;
  overallStatus: 'not_started' | 'in_progress' | 'completed';
}

export interface GradeName {
  id: number;
  name: string;
  range: string;
}

export interface UnitGradeNames {
  id: number;
  title: string;
  gradeNames: Record<number, GradeName>;
}
