import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SelectedUnit,
  LearningProgress,
  LearningStage,
  XPSystem,
} from '../types/learning';

interface LearningState {
  // 현재 선택된 단원 정보
  selectedUnit: SelectedUnit | null;

  // 현재 학습 단계
  currentStage: LearningStage;

  // 학습 진행 상태
  progress: Record<string, LearningProgress>;

  // XP 시스템 설정
  xpSystem: XPSystem;

  // 총 획득 XP
  totalXP: number;

  // Actions
  selectUnit: (unit: SelectedUnit) => void;
  setCurrentStage: (stage: LearningStage) => void;
  updateProgress: (unitId: string, progress: Partial<LearningProgress>) => void;
  completeConcept: (unitId: string) => void;
  completeProblem: (unitId: string, isCorrect: boolean) => void;
  completeUnit: (unitId: string) => void;
  resetProgress: (unitId: string) => void;
  resetAllProgress: () => void;
}

// XP 시스템 기본값
const DEFAULT_XP_SYSTEM: XPSystem = {
  conceptComplete: 20,
  correctAnswer: 15,
  wrongAnswer: 10,
  unitBonus: 10,
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      selectedUnit: null,
      currentStage: 'unit-selection',
      progress: {},
      xpSystem: DEFAULT_XP_SYSTEM,
      totalXP: 0,

      // 단원 선택
      selectUnit: (unit: SelectedUnit) => {
        set({ selectedUnit: unit, currentStage: 'concept' });

        // 진행 상태 초기화 (없는 경우)
        const { progress } = get();
        if (!progress[unit.unitId]) {
          set({
            progress: {
              ...progress,
              [unit.unitId]: {
                unitId: unit.unitId,
                chapter: unit.chapter,
                grade: unit.grade,
                conceptCompleted: false,
                problemsCompleted: 0,
                totalProblems: 10, // 기본값, 향후 API에서 가져올 예정
                xpEarned: 0,
                lastAccessedAt: new Date(),
              },
            },
          });
        } else {
          // 기존 진행 상태 업데이트
          set({
            progress: {
              ...progress,
              [unit.unitId]: {
                ...progress[unit.unitId],
                lastAccessedAt: new Date(),
              },
            },
          });
        }
      },

      // 학습 단계 설정
      setCurrentStage: (stage: LearningStage) => {
        set({ currentStage: stage });
      },

      // 진행 상태 업데이트
      updateProgress: (
        unitId: string,
        progressUpdate: Partial<LearningProgress>
      ) => {
        const { progress } = get();
        const currentProgress = progress[unitId];

        if (currentProgress) {
          set({
            progress: {
              ...progress,
              [unitId]: {
                ...currentProgress,
                ...progressUpdate,
                lastAccessedAt: new Date(),
              },
            },
          });
        }
      },

      // 개념 완료
      completeConcept: (unitId: string) => {
        const { progress, xpSystem, totalXP } = get();
        const currentProgress = progress[unitId];

        if (currentProgress && !currentProgress.conceptCompleted) {
          const newXP = totalXP + xpSystem.conceptComplete;

          set({
            progress: {
              ...progress,
              [unitId]: {
                ...currentProgress,
                conceptCompleted: true,
                xpEarned: currentProgress.xpEarned + xpSystem.conceptComplete,
                lastAccessedAt: new Date(),
              },
            },
            totalXP: newXP,
            currentStage: 'problems',
          });
        }
      },

      // 문제 완료
      completeProblem: (unitId: string, isCorrect: boolean) => {
        const { progress, xpSystem, totalXP } = get();
        const currentProgress = progress[unitId];

        if (currentProgress) {
          const xpEarned = isCorrect
            ? xpSystem.correctAnswer
            : xpSystem.wrongAnswer;
          const newXP = totalXP + xpEarned;
          const newProblemsCompleted = currentProgress.problemsCompleted + 1;

          set({
            progress: {
              ...progress,
              [unitId]: {
                ...currentProgress,
                problemsCompleted: newProblemsCompleted,
                xpEarned: currentProgress.xpEarned + xpEarned,
                lastAccessedAt: new Date(),
              },
            },
            totalXP: newXP,
          });

          // 모든 문제 완료 시 단원 완료
          if (newProblemsCompleted >= currentProgress.totalProblems) {
            get().completeUnit(unitId);
          }
        }
      },

      // 단원 완료
      completeUnit: (unitId: string) => {
        const { progress, xpSystem, totalXP } = get();
        const currentProgress = progress[unitId];

        if (currentProgress) {
          const newXP = totalXP + xpSystem.unitBonus;

          set({
            progress: {
              ...progress,
              [unitId]: {
                ...currentProgress,
                xpEarned: currentProgress.xpEarned + xpSystem.unitBonus,
                lastAccessedAt: new Date(),
              },
            },
            totalXP: newXP,
            currentStage: 'completed',
          });
        }
      },

      // 진행 상태 초기화
      resetProgress: (unitId: string) => {
        const { progress } = get();
        const newProgress = { ...progress };
        delete newProgress[unitId];
        set({ progress: newProgress });
      },

      // 전체 진행 상태 초기화
      resetAllProgress: () => {
        set({ progress: {}, totalXP: 0, currentStage: 'unit-selection' });
      },
    }),
    {
      name: 'learning-storage',
      partialize: (state) => ({
        progress: state.progress,
        totalXP: state.totalXP,
        xpSystem: state.xpSystem,
      }),
    }
  )
);
