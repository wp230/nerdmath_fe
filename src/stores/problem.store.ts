import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import {
  Problem,
  Progress,
  ProblemSession,
  AnswerState,
  AnswerResult,
  PersistentProblemSession,
} from '@/types/problem';

interface ProblemState {
  // 현재 세션 정보
  currentSession: ProblemSession | null;
  
  // 현재 문제
  currentProblem: Problem | null;
  
  // 답안 상태
  answerState: AnswerState;
  
  // 북마크 대상 문제들 (틀린 문제)
  incorrectProblems: string[];
  
  // UI 상태
  isLoading: boolean;
  error: string | null;
  
  // 세션 지속성
  persistedAt: string | null;
}

interface ProblemActions {
  // 세션 관리
  initializeSession: (params: {
    unitId: string;
    chapterId: string;
    firstProblemResponse: {
      problem: Problem | null;
      problemIds: string[];
      progress: Progress;
      isFirstTime: boolean;
    };
  }) => void;
  
  setCurrentProblem: (problem: Problem | null) => void;
  updateProgress: (progress: Progress) => void;
  
  // 답안 관리
  setSelectedAnswer: (answer: string | number | null) => void;
  submitAnswer: () => void;
  setAnswerResult: (result: AnswerResult) => void;
  resetAnswer: () => void;
  
  // 문제 진행
  nextProblem: () => void;
  addIncorrectProblem: (problemId: string) => void;
  
  // 세션 종료
  completeSession: () => void;
  clearSession: () => void;
  
  // UI 상태
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 세션 복구
  hydrateFromSession: () => boolean;
  persistSession: () => void;
  
  // 유틸리티
  getCurrentProblemId: () => string | null;
  getProgressPercentage: () => number;
  isSessionComplete: () => boolean;
  hasNextProblem: () => boolean;
}

const initialState: ProblemState = {
  currentSession: null,
  currentProblem: null,
  answerState: {
    selectedAnswer: null,
    isSubmitted: false,
    result: null,
  },
  incorrectProblems: [],
  isLoading: false,
  error: null,
  persistedAt: null,
};

const STORAGE_KEY = 'problem-session';

export const useProblemStore = create<ProblemState & ProblemActions>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,

        // 세션 초기화
        initializeSession: ({ unitId, chapterId, firstProblemResponse }) => {
          const now = new Date().toISOString();
          const session: ProblemSession = {
            unitId,
            chapterId,
            problemIds: firstProblemResponse.problemIds,
            currentIndex: 0,
            progress: firstProblemResponse.progress,
            isFirstTime: firstProblemResponse.isFirstTime,
            startedAt: now,
          };

          set({
            currentSession: session,
            currentProblem: firstProblemResponse.problem,
            answerState: {
              selectedAnswer: null,
              isSubmitted: false,
              result: null,
            },
            incorrectProblems: [],
            persistedAt: now,
            isLoading: false,
            error: null,
          });
        },

        // 현재 문제 설정
        setCurrentProblem: (problem) => {
          set((state) => ({
            ...state,
            currentProblem: problem,
            persistedAt: new Date().toISOString(),
          }));
        },

        // 진행률 업데이트
        updateProgress: (progress) => {
          set((state) => ({
            ...state,
            currentSession: state.currentSession
              ? { ...state.currentSession, progress }
              : null,
            persistedAt: new Date().toISOString(),
          }));
        },

        // 답안 선택
        setSelectedAnswer: (answer) => {
          set((state) => ({
            ...state,
            answerState: {
              ...state.answerState,
              selectedAnswer: answer,
            },
          }));
        },

        // 답안 제출
        submitAnswer: () => {
          set((state) => ({
            ...state,
            answerState: {
              ...state.answerState,
              isSubmitted: true,
            },
          }));
        },

        // 답안 결과 설정
        setAnswerResult: (result) => {
          set((state) => {
            const newIncorrectProblems = !result.isCorrect && state.currentProblem
              ? [...state.incorrectProblems, state.currentProblem.problemId]
              : state.incorrectProblems;

            return {
              ...state,
              answerState: {
                ...state.answerState,
                result,
              },
              incorrectProblems: newIncorrectProblems,
              currentSession: state.currentSession
                ? {
                    ...state.currentSession,
                    progress: {
                      ...state.currentSession.progress,
                      completed: result.updatedProgress.problemProgress,
                      percentage: result.updatedProgress.problemProgress,
                    },
                  }
                : null,
              persistedAt: new Date().toISOString(),
            };
          });
        },

        // 답안 초기화
        resetAnswer: () => {
          set((state) => ({
            ...state,
            answerState: {
              selectedAnswer: null,
              isSubmitted: false,
              result: null,
            },
          }));
        },

        // 다음 문제로 진행
        nextProblem: () => {
          set((state) => {
            if (!state.currentSession) return state;

            const nextIndex = state.currentSession.currentIndex + 1;
            return {
              ...state,
              currentSession: {
                ...state.currentSession,
                currentIndex: nextIndex,
              },
              answerState: {
                selectedAnswer: null,
                isSubmitted: false,
                result: null,
              },
              persistedAt: new Date().toISOString(),
            };
          });
        },

        // 틀린 문제 추가
        addIncorrectProblem: (problemId) => {
          set((state) => ({
            ...state,
            incorrectProblems: state.incorrectProblems.includes(problemId)
              ? state.incorrectProblems
              : [...state.incorrectProblems, problemId],
          }));
        },

        // 세션 완료
        completeSession: () => {
          set((state) => ({
            ...state,
            currentSession: state.currentSession
              ? {
                  ...state.currentSession,
                  progress: {
                    ...state.currentSession.progress,
                    percentage: 100,
                  },
                }
              : null,
            currentProblem: null,
            persistedAt: new Date().toISOString(),
          }));
        },

        // 세션 클리어
        clearSession: () => {
          set(initialState);
          // 세션 스토리지에서도 제거
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(STORAGE_KEY);
          }
        },

        // UI 상태 관리
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

        // 세션 복구
        hydrateFromSession: () => {
          if (typeof window === 'undefined') return false;

          try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (!stored) return false;

            const session: PersistentProblemSession = JSON.parse(stored);

            // 세션이 24시간 이내인지 확인
            const sessionAge =
              Date.now() - new Date(session.persistedAt).getTime();
            if (sessionAge > 24 * 60 * 60 * 1000) {
              sessionStorage.removeItem(STORAGE_KEY);
              return false;
            }

            set({
              currentSession: {
                unitId: session.unitId,
                chapterId: session.chapterId,
                problemIds: session.problemIds,
                currentIndex: session.currentIndex,
                progress: session.progress,
                isFirstTime: false, // 복구된 세션은 처음이 아님
                startedAt: session.startedAt,
              },
              persistedAt: session.persistedAt,
              answerState: {
                selectedAnswer: null,
                isSubmitted: false,
                result: null,
              },
              incorrectProblems: [],
              isLoading: false,
              error: null,
            });

            return true;
          } catch (error) {
            console.error('Failed to hydrate problem session:', error);
            return false;
          }
        },

        // 세션 저장
        persistSession: () => {
          if (typeof window === 'undefined') return;

          const state = get();
          if (!state.currentSession) return;

          const session: PersistentProblemSession = {
            unitId: state.currentSession.unitId,
            chapterId: state.currentSession.chapterId,
            currentIndex: state.currentSession.currentIndex,
            problemIds: state.currentSession.problemIds,
            progress: state.currentSession.progress,
            startedAt: state.currentSession.startedAt,
            persistedAt: new Date().toISOString(),
          };

          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        },

        // 유틸리티 함수들
        getCurrentProblemId: () => {
          const state = get();
          if (!state.currentSession || !state.currentProblem) return null;
          return state.currentProblem.problemId;
        },

        getProgressPercentage: () => {
          const state = get();
          return state.currentSession?.progress.percentage || 0;
        },

        isSessionComplete: () => {
          const state = get();
          if (!state.currentSession) return false;
          return state.currentSession.progress.percentage >= 100;
        },

        hasNextProblem: () => {
          const state = get();
          if (!state.currentSession) return false;
          const { currentIndex, problemIds } = state.currentSession;
          return currentIndex < problemIds.length - 1;
        },
      }),
      {
        name: 'problem-store',
        // 세션 복구를 위한 최소한의 상태만 저장
        partialize: (state) =>
          ({
            currentSession: state.currentSession,
            persistedAt: state.persistedAt,
          }) as Partial<ProblemState & ProblemActions>,
      }
    )
  )
);

// 자동 세션 저장을 위한 구독
if (typeof window !== 'undefined') {
  useProblemStore.subscribe(
    (state) => state.currentSession,
    () => {
      const store = useProblemStore.getState();
      store.persistSession();
    }
  );
}

// 편의 함수들
export const useCurrentProblem = () => useProblemStore((state) => state.currentProblem);
export const useCurrentSession = () => useProblemStore((state) => state.currentSession);
export const useAnswerState = () => useProblemStore((state) => state.answerState);
export const useIncorrectProblems = () => useProblemStore((state) => state.incorrectProblems);
export const useProblemLoading = () => useProblemStore((state) => state.isLoading);
export const useProblemError = () => useProblemStore((state) => state.error);
