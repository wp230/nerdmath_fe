import { create } from 'zustand';
import { ExtendedLearningState, PracticeProblem } from '@/types/learning';
import { XPCalculator } from '@/lib/xpCalculator';

export const useLearningStore = create<ExtendedLearningState>((set, get) => ({
  // 기존 상태
  currentUnitId: null,
  currentMode: null,
  conceptProgress: 0,
  isLearning: false,

  // Step 2 추가 상태
  problemMode: {
    currentProblemIndex: 0,
    problemIds: [],
    vocabTestProgress: 0,
    practiceProgress: 0,
    completedProblems: new Set(),
    currentAnswer: '',
    showExplanation: false,
    isCorrect: null,
    currentProblem: null,
    sessionId: '',
    startTime: 0,
  },

  // XP 시스템
  gamification: {
    level: 1,
    xp: 0,
    totalXp: 0,
    nextLevelXp: 50,
    leveledUp: false,
  },

  // 기존 액션
  startLearning: (unitId: string, mode: 'concept' | 'problem') =>
    set({ currentUnitId: unitId, currentMode: mode, isLearning: true }),

  updateProgress: (progress: number) => set({ conceptProgress: progress }),

  completeLearning: () => set({ isLearning: false, conceptProgress: 100 }),

  resetLearning: () =>
    set({
      currentUnitId: null,
      currentMode: null,
      conceptProgress: 0,
      isLearning: false,
      problemMode: {
        currentProblemIndex: 0,
        problemIds: [],
        vocabTestProgress: 0,
        practiceProgress: 0,
        completedProblems: new Set(),
        currentAnswer: '',
        showExplanation: false,
        isCorrect: null,
        currentProblem: null,
        sessionId: '',
        startTime: 0,
      },
      gamification: {
        level: 1,
        xp: 0,
        totalXp: 0,
        nextLevelXp: 50,
        leveledUp: false,
      },
    }),

  // Step 2 액션
  startProblemMode: (unitId: string, problemIds: string[]) =>
    set((state) => ({
      currentUnitId: unitId,
      currentMode: 'problem',
      isLearning: true,
      problemMode: {
        ...state.problemMode,
        problemIds,
        currentProblemIndex: 0,
        sessionId: `session_${Date.now()}`,
        startTime: Date.now(),
        vocabTestProgress: 0,
        practiceProgress: 0,
        completedProblems: new Set(),
        currentAnswer: '',
        showExplanation: false,
        isCorrect: null,
        currentProblem: null,
      },
    })),

  updateProblemProgress: (type: 'vocab' | 'practice', progress: number) => {
    set((state) => ({
      problemMode: {
        ...state.problemMode,
        ...(type === 'vocab'
          ? { vocabTestProgress: progress }
          : { practiceProgress: progress }),
      },
    }));
  },

  setCurrentProblem: (index: number, problem: PracticeProblem) => {
    set((state) => ({
      problemMode: {
        ...state.problemMode,
        currentProblemIndex: index,
        currentProblem: problem,
        currentAnswer: '',
        showExplanation: false,
        isCorrect: null,
        startTime: Date.now(),
      },
    }));
  },

  submitAnswer: (answer: string) => {
    set((state) => ({
      problemMode: {
        ...state.problemMode,
        currentAnswer: answer,
        showExplanation: true,
      },
    }));
  },

  nextProblem: () => {
    const state = get();
    const { currentProblemIndex, problemIds, completedProblems } =
      state.problemMode;

    if (currentProblemIndex < problemIds.length - 1) {
      // 다음 문제로 이동
      set((state) => ({
        problemMode: {
          ...state.problemMode,
          currentProblemIndex: currentProblemIndex + 1,
          currentAnswer: '',
          showExplanation: false,
          isCorrect: null,
          startTime: Date.now(),
        },
      }));
    } else {
      // 모든 문제 완료
      set((state) => ({
        problemMode: {
          ...state.problemMode,
          showExplanation: false,
        },
      }));
    }
  },

  resetProblemMode: () => {
    set((state) => ({
      problemMode: {
        currentProblemIndex: 0,
        problemIds: [],
        vocabTestProgress: 0,
        practiceProgress: 0,
        completedProblems: new Set(),
        currentAnswer: '',
        showExplanation: false,
        isCorrect: null,
        currentProblem: null,
        sessionId: '',
        startTime: 0,
      },
    }));
  },

  updateXP: (gainedXP: number, reason: string) => {
    set((state) => {
      const newTotalXP = state.gamification.totalXp + gainedXP;
      const newXP = state.gamification.xp + gainedXP;

      // 레벨업 체크
      const levelUpResult = XPCalculator.checkLevelUp(
        state.gamification.xp,
        gainedXP,
        state.gamification.level
      );

      return {
        gamification: {
          level: levelUpResult.newLevel,
          xp: levelUpResult.remainingXP,
          totalXp: newTotalXP,
          nextLevelXp: XPCalculator.calculateNextLevelXP(
            levelUpResult.newLevel
          ),
          leveledUp: levelUpResult.leveledUp,
        },
      };
    });
  },
}));
