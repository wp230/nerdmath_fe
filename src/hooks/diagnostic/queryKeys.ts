export const QUERY_KEYS = {
  // 진단 관련 쿼리 키들
  DIAGNOSTIC_ELIGIBILITY: (userId: number | null) =>
    ['diagnostic', 'eligibility', userId] as const,
  DIAGNOSTIC_STATUS: (testId: string | null) =>
    ['diagnostic', 'status', testId] as const,
  DIAGNOSTIC_PROBLEM: (problemId: string | null) =>
    ['diagnostic', 'problem', problemId] as const,
  DIAGNOSTIC_TIMEOUT: (testId: string | null) =>
    ['diagnostic', 'timeout', testId] as const,
  DIAGNOSTIC_ANALYSIS: (userId: number | null) =>
    ['diagnostic', 'analysis', userId] as const,
};
