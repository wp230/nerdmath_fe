// Problem 관련 Query Keys
export const problemQueryKeys = {
  all: ['problem'] as const,

  // 첫 문제 조회
  firstProblem: (unitId: string, userId?: string) =>
    [...problemQueryKeys.all, 'first', unitId, userId] as const,

  // 문제 단건 조회
  problem: (problemId: string) =>
    [...problemQueryKeys.all, 'single', problemId] as const,

  // 북마크 상태
  bookmarkStatus: (problemId: string, userId: string) =>
    [...problemQueryKeys.all, 'bookmark', problemId, userId] as const,
};
