import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import {
  GradeRange,
  ProblemTimer,
  DiagnosticSession,
} from '@/types/diagnostic';

interface DiagnosticTestState {
  // 기본 테스트 정보
  testId: string | null;
  gradeRange: GradeRange | null;
  totalProblems: number;
  answeredCount: number;
  remainingCount: number;
  currentProblemId: string | null;

  // 시간 관련
  startedAt: string | null;
  timeoutMinutes: number;

  // 상태 관리
  completed: boolean;
  shuffleSeed: number | null;

  // 문제별 타이머
  currentProblemStartTime: number | null;
  problemTimers: ProblemTimer[];

  // 세션 관리
  persistedAt: string | null;

  // UI 상태
  isLoading: boolean;
  error: string | null;
}

interface DiagnosticTestActions {
  // 테스트 생명주기
  setFromStartResponse: (response: {
    testId: string;
    firstProblemId: string;
    totalProblems: number;
    startedAt: string;
    gradeRange: GradeRange;
    shuffleSeed?: number;
  }) => void;

  applyStatusUpdate: (status: {
    answeredCount: number;
    remainingCount: number;
    currentProblemId: string;
    completed: boolean;
    timeoutMinutes: number;
  }) => void;

  advanceToProblem: (
    nextProblemId: string | null,
    answeredCount: number
  ) => void;

  markCompleted: () => void;

  resetTest: () => void;

  // 문제별 타이머 관리
  startProblemTimer: (problemId: string) => void;
  endProblemTimer: (problemId: string) => number; // 소요 시간 반환

  // 세션 관리
  hydrateFromSession: () => boolean; // 성공 여부 반환
  persistSession: () => void;
  clearSession: () => void;

  // 학년 범위 설정
  setGradeRange: (gradeRange: GradeRange) => void;

  // UI 상태 관리
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 유틸리티
  getRemainingTimeMinutes: () => number;
  isTimedOut: () => boolean;
  getCurrentProblemDuration: () => number;
}

const initialState: DiagnosticTestState = {
  testId: null,
  gradeRange: null,
  totalProblems: 0,
  answeredCount: 0,
  remainingCount: 0,
  currentProblemId: null,
  startedAt: null,
  timeoutMinutes: 0,
  completed: false,
  shuffleSeed: null,
  currentProblemStartTime: null,
  problemTimers: [],
  persistedAt: null,
  isLoading: false,
  error: null,
};

const STORAGE_KEY = 'diagnostic-test-session';

export const useDiagnosticStore = create<
  DiagnosticTestState & DiagnosticTestActions
>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,

        setFromStartResponse: (response) => {
          const now = Date.now();
          set({
            testId: response.testId,
            gradeRange: response.gradeRange,
            currentProblemId: response.firstProblemId,
            totalProblems: response.totalProblems,
            answeredCount: 0,
            remainingCount: response.totalProblems,
            startedAt: response.startedAt,
            timeoutMinutes: 60, // 기본값, 상태 조회에서 업데이트
            completed: false,
            shuffleSeed: response.shuffleSeed || null,
            currentProblemStartTime: now,
            problemTimers: [],
            persistedAt: new Date().toISOString(),
            isLoading: false,
            error: null,
          });
        },

        applyStatusUpdate: (status) => {
          set((state) => ({
            ...state,
            answeredCount: status.answeredCount,
            remainingCount: status.remainingCount,
            currentProblemId: status.currentProblemId,
            completed: status.completed,
            timeoutMinutes: status.timeoutMinutes,
            persistedAt: new Date().toISOString(),
          }));
        },

        advanceToProblem: (nextProblemId, answeredCount) => {
          const now = Date.now();
          set((state) => {
            // 현재 문제의 타이머 종료
            const updatedTimers =
              state.currentProblemStartTime && state.currentProblemId
                ? [
                    ...state.problemTimers,
                    {
                      problemId: state.currentProblemId,
                      startTime: state.currentProblemStartTime,
                      endTime: now,
                      durationSeconds: Math.floor(
                        (now - state.currentProblemStartTime) / 1000
                      ),
                    },
                  ]
                : state.problemTimers;

            return {
              ...state,
              currentProblemId: nextProblemId,
              answeredCount,
              remainingCount: state.totalProblems - answeredCount,
              currentProblemStartTime: nextProblemId ? now : null,
              problemTimers: updatedTimers,
              persistedAt: new Date().toISOString(),
            };
          });
        },

        markCompleted: () => {
          set((state) => ({
            ...state,
            completed: true,
            currentProblemId: null,
            currentProblemStartTime: null,
            persistedAt: new Date().toISOString(),
          }));
        },

        resetTest: () => {
          set(initialState);
          // 세션 스토리지에서도 제거
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(STORAGE_KEY);
          }
        },

        startProblemTimer: (problemId) => {
          set((state) => ({
            ...state,
            currentProblemStartTime: Date.now(),
          }));
        },

        endProblemTimer: (problemId) => {
          const state = get();
          const now = Date.now();
          const duration = state.currentProblemStartTime
            ? Math.floor((now - state.currentProblemStartTime) / 1000)
            : 0;

          set((prevState) => ({
            ...prevState,
            problemTimers: [
              ...prevState.problemTimers,
              {
                problemId,
                startTime: prevState.currentProblemStartTime || now,
                endTime: now,
                durationSeconds: duration,
              },
            ],
          }));

          return duration;
        },

        hydrateFromSession: () => {
          if (typeof window === 'undefined') return false;

          try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (!stored) return false;

            const session: DiagnosticSession = JSON.parse(stored);

            // 세션이 24시간 이내인지 확인
            const sessionAge =
              Date.now() - new Date(session.persistedAt).getTime();
            if (sessionAge > 24 * 60 * 60 * 1000) {
              sessionStorage.removeItem(STORAGE_KEY);
              return false;
            }

            set({
              testId: session.testId,
              gradeRange: session.gradeRange,
              startedAt: session.startedAt,
              timeoutMinutes: session.timeoutMinutes,
              totalProblems: session.totalProblems,
              currentProblemId: session.currentProblemId,
              answeredCount: session.answeredCount,
              remainingCount: session.remainingCount,
              completed: session.completed,
              shuffleSeed: session.shuffleSeed,
              persistedAt: session.persistedAt,
              currentProblemStartTime: Date.now(), // 새로 시작
              problemTimers: [],
              isLoading: false,
              error: null,
            });

            return true;
          } catch (error) {
            console.error('Failed to hydrate session:', error);
            return false;
          }
        },

        persistSession: () => {
          if (typeof window === 'undefined') return;

          const state = get();
          if (!state.testId) return;

          const session: DiagnosticSession = {
            testId: state.testId,
            gradeRange: state.gradeRange!,
            startedAt: state.startedAt!,
            timeoutMinutes: state.timeoutMinutes,
            totalProblems: state.totalProblems,
            currentProblemId: state.currentProblemId,
            answeredCount: state.answeredCount,
            remainingCount: state.remainingCount,
            completed: state.completed,
            shuffleSeed: state.shuffleSeed,
            persistedAt: new Date().toISOString(),
          };

          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        },

        clearSession: () => {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(STORAGE_KEY);
          }
        },

        setGradeRange: (gradeRange) => {
          set((state) => ({
            ...state,
            gradeRange,
          }));
        },

        setLoading: (loading) => {
          set((state) => ({
            ...state,
            isLoading: loading,
          }));
        },

        setError: (error) => {
          set((state) => ({
            ...state,
            error,
          }));
        },

        getRemainingTimeMinutes: () => {
          const state = get();
          if (!state.startedAt || !state.timeoutMinutes) return 0;

          const startTime = new Date(state.startedAt).getTime();
          const timeoutTime = startTime + state.timeoutMinutes * 60 * 1000;
          const remaining = timeoutTime - Date.now();

          return Math.max(0, Math.floor(remaining / (60 * 1000)));
        },

        isTimedOut: () => {
          const state = get();
          return state.getRemainingTimeMinutes() <= 0;
        },

        getCurrentProblemDuration: () => {
          const state = get();
          if (!state.currentProblemStartTime) return 0;
          return Math.floor(
            (Date.now() - state.currentProblemStartTime) / 1000
          );
        },
      }),
      {
        name: 'diagnostic-store',
        // 세션 복구를 위한 최소한의 상태만 저장
        partialize: (state) =>
          ({
            testId: state.testId,
            gradeRange: state.gradeRange,
            persistedAt: state.persistedAt,
          }) as Partial<DiagnosticTestState & DiagnosticTestActions>,
      }
    )
  )
);

// 자동 세션 저장을 위한 구독
if (typeof window !== 'undefined') {
  useDiagnosticStore.subscribe(
    (state) => state.testId,
    () => {
      const store = useDiagnosticStore.getState();
      store.persistSession();
    }
  );
}
