import { UNIT_DATA, UNIT_CHAPTERS, UNIT_GRADE_NAMES } from '../hooks/math_Unit';
import { Unit, Chapter, UnitGradeInfo, SelectedUnit } from '../types/learning';

// 단원 관련 서비스 함수들
export class LearningService {
  // 모든 대단원 목록 조회
  static async getUnits(): Promise<Unit[]> {
    // 향후 API 호출로 대체 예정
    return Object.values(UNIT_DATA);
  }

  // 특정 단원 정보 조회
  static async getUnit(unitId: string): Promise<Unit | null> {
    // 향후 API 호출로 대체 예정
    return UNIT_DATA[unitId as keyof typeof UNIT_DATA] || null;
  }

  // 단원별 소단원 목록 조회
  static async getChapters(unitId: string): Promise<Chapter[]> {
    // 향후 API 호출로 대체 예정
    return UNIT_CHAPTERS[unitId as keyof typeof UNIT_CHAPTERS] || [];
  }

  // 단원별 학년 정보 조회
  static async getUnitGradeInfo(unitId: string): Promise<UnitGradeInfo | null> {
    // 향후 API 호출로 대체 예정
    return UNIT_GRADE_NAMES[unitId as keyof typeof UNIT_GRADE_NAMES] || null;
  }

  // 특정 학년의 소단원 목록 조회
  static async getChaptersByGrade(
    unitId: string,
    grade: number
  ): Promise<Chapter[]> {
    const chapters = await this.getChapters(unitId);
    return chapters.filter((chapter) => chapter.grade === grade);
  }

  // 선택된 단원 정보 생성
  static createSelectedUnit(
    unitId: string,
    grade: number,
    chapter: number
  ): SelectedUnit | null {
    const unit = UNIT_DATA[unitId as keyof typeof UNIT_DATA];
    const chapters = UNIT_CHAPTERS[unitId as keyof typeof UNIT_CHAPTERS];

    if (!unit || !chapters) return null;

    const chapterInfo = chapters.find(
      (c) => c.chapter === chapter && c.grade === grade
    );
    if (!chapterInfo) return null;

    return {
      unitId,
      grade,
      chapter,
      unitTitle: unit.title,
      chapterTitle: chapterInfo.title,
    };
  }

  // 단원별 진행률 계산
  static calculateProgress(
    completedChapters: number,
    totalChapters: number
  ): number {
    if (totalChapters === 0) return 0;
    return Math.round((completedChapters / totalChapters) * 100);
  }

  // 다음 학습할 단원 추천
  static async getRecommendedUnit(): Promise<Unit | null> {
    // 향후 사용자 학습 이력 기반 추천 로직 구현 예정
    const units = await this.getUnits();
    return units[0] || null;
  }

  // 단원별 난이도 정보 (향후 확장)
  static async getUnitDifficulty(
    unitId: string
  ): Promise<'easy' | 'medium' | 'hard'> {
    // 향후 API에서 단원별 난이도 정보 조회 예정
    return 'medium';
  }

  // 단원별 예상 학습 시간 (향후 확장)
  static async getEstimatedTime(unitId: string): Promise<number> {
    // 향후 API에서 단원별 예상 학습 시간 조회 예정
    return 30; // 분 단위
  }
}

// Mock API 함수들 (향후 실제 API로 대체)
export const mockLearningAPI = {
  // 개념 콘텐츠 조회 (2단계 구현 시 사용)
  getConcept: async (unitId: string) => {
    return {
      id: `concept_${unitId}`,
      title: '개념 제목',
      content: '개념 내용...',
      examples: ['예시 1', '예시 2'],
      completed: false,
    };
  },

  // 개념 학습 완료 (2단계 구현 시 사용)
  completeConcept: async (unitId: string) => {
    return { success: true, xpEarned: 20 };
  },

  // 첫 문제 조회 (3단계 구현 시 사용)
  getFirstProblem: async (unitId: string, userId: string) => {
    return {
      id: `problem_1_${unitId}`,
      question: '문제 내용...',
      options: ['보기 1', '보기 2', '보기 3', '보기 4'],
      correctAnswer: '보기 1',
      explanation: '해설 내용...',
      difficulty: 'medium' as const,
    };
  },

  // 답안 채점 (3단계 구현 시 사용)
  checkAnswer: async (problemId: string, answer: string) => {
    const isCorrect = answer === '보기 1';
    return {
      isCorrect,
      xpEarned: isCorrect ? 15 : 10,
      explanation: '해설 내용...',
    };
  },

  // 다음 문제 조회 (3단계 구현 시 사용)
  getNextProblem: async (problemId: string) => {
    return {
      id: `problem_2_${problemId}`,
      question: '다음 문제 내용...',
      options: ['보기 1', '보기 2', '보기 3', '보기 4'],
      correctAnswer: '보기 2',
      explanation: '해설 내용...',
      difficulty: 'medium' as const,
    };
  },
};
