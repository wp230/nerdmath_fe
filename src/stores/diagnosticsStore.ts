import { create } from 'zustand';
import { DiagnosticTest, Problem, DiagnosticResult } from '@/types/diagnostics';

interface DiagnosticsState {
  // 현재 테스트 상태
  currentTest: DiagnosticTest | null;

  // 현재 문제
  currentProblem: Problem | null;

  // 테스트 결과
  testResult: DiagnosticResult | null;

  // UI 상태
  isLoading: boolean;
  error: string | null;

  // 세션 시간 관리
  sessionStartTime: number | null;
  totalSessionTime: number;

  // 액션들
  setCurrentTest: (test: DiagnosticTest | null) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  setTestResult: (result: DiagnosticResult | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 테스트 진행 상태 업데이트
  updateTestProgress: (
    answeredCount: number,
    remainingCount: number,
    currentProblemId: string
  ) => void;

  // 테스트 완료
  completeTest: (result: DiagnosticResult) => void;

  // 테스트 초기화
  resetTest: () => void;

  // 세션 시간 관리
  startSession: () => void;
  updateSessionTime: () => void;
}

export const useDiagnosticsStore = create<DiagnosticsState>((set, get) => ({
  // 초기 상태
  currentTest: null,
  currentProblem: null,
  testResult: null,
  isLoading: false,
  error: null,
  sessionStartTime: null,
  totalSessionTime: 0,

  // 액션들
  setCurrentTest: (test) => set({ currentTest: test }),
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  setTestResult: (result) => set({ testResult: result }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateTestProgress: (answeredCount, remainingCount, currentProblemId) =>
    set((state) => ({
      currentTest: state.currentTest
        ? {
            ...state.currentTest,
            answeredCount,
            remainingCount,
            currentProblemId,
          }
        : null,
    })),

  completeTest: (result) =>
    set((state) => ({
      currentTest: state.currentTest
        ? { ...state.currentTest, completed: true }
        : null,
      testResult: result,
    })),

  resetTest: () =>
    set({
      currentTest: null,
      currentProblem: null,
      testResult: null,
      isLoading: false,
      error: null,
      sessionStartTime: null,
      totalSessionTime: 0,
    }),

  // 세션 시간 관리
  startSession: () =>
    set({
      sessionStartTime: Date.now(),
      totalSessionTime: 0,
    }),

  updateSessionTime: () => {
    const state = get();
    if (state.sessionStartTime) {
      set({
        totalSessionTime: Math.floor(
          (Date.now() - state.sessionStartTime) / 1000
        ),
      });
    }
  },
}));
