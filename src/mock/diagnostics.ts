import { 
  DiagnosticEligibilityResponse,
  DiagnosticStartResponse,
  DiagnosticStatusResponse,
  DiagnosticSubmitResponse,
  DiagnosticTimeoutResponse
} from '@/types/diagnostics';

export const mockDiagnosticsData = {
  eligibility: {
    eligible: true,
    reason: null,
    existingTestId: null
  } as DiagnosticEligibilityResponse,
  
  start: {
    testId: '64fa0a111111111111111111',
    userId: 12345,
    gradeRange: { min: 1, max: 3 },
    startedAt: '2025-07-10T12:00:00Z',
    firstProblemId: '64fa0p111111111111111111',
    totalProblems: 20,
    
  } as DiagnosticStartResponse,
  
  status: {
    testId: '64fa0a111111111111111111',
    userId: 12345,
    completed: false,
    answeredCount: 7,
    remainingCount: 13,
    currentProblemId: '64fa0b111111111111111111',
    startedAt: '2025-07-10T12:00:00Z',
    lastActivityAt: '2025-07-10T12:15:00Z',
    timeoutMinutes: 30
  } as DiagnosticStatusResponse,
  
  submit: {
    answerId: '64ans11111111111111111111',
    isCorrect: null,
    nextProblemId: '64fa0p222222222222222222',
    answeredCount: 8,
    remainingCount: 12
  } as DiagnosticSubmitResponse,
  
  timeout: {
    timedOut: false,
    remainingMinutes: 26,
    totalTimeoutMinutes: 30,
    startedAt: '2025-08-21T04:09:51.612Z'
  } as DiagnosticTimeoutResponse,

  // 2-2. unit_000 진단테스트용 첫 번째 문제 조회 모킹 데이터
  unitFirstProblem: {
    problem: {
      problemId: "64fa0p111111111111111111",
      unitId: "unit_000",
      grade: 1,
      chapter: 1,
      context: { source: "교과서", year: 2024, region: "서울" },
      cognitiveType: "이해",
      level: "중",
      type: "객관식",
      tags: ["덧셈", "기초"],
      content: {
        stem: { text: "5 + 3 = ?" },
        choices: [
          { key: "①", text: "7" },
          { key: "②", text: "8" },
          { key: "③", text: "9" },
          { key: "④", text: "10" }
        ]
      },
      imageUrl: "/images/problems/problem_001.png",
      createdAt: "2025-07-14T10:25:00Z",
      updatedAt: "2025-07-14T10:25:00Z"
    },
    problemIds: [
      "64fa0p111111111111111111",
      "64fa0p222222222222222222",
      "64fa0p333333333333333333",
      "64fa0p444444444444444444"
    ]
  }
};
