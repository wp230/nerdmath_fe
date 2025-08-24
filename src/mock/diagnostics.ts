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
    totalProblems: 20
  } as DiagnosticStartResponse,
  
  status: {
    testId: '64fa0a111111111111111111',
    userId: 12345,
    completed: false,
    answeredCount: 0,
    remainingCount: 20,
    currentProblemId: '64fa0p111111111111111111',
    startedAt: '2025-07-10T12:00:00Z',
    lastActivityAt: '2025-07-10T12:00:00Z',
    timeoutMinutes: 30
  } as DiagnosticStatusResponse,
  
  // 답안 제출 응답들 (20개 문제 순차 진행)
  submit: {
    // 1번 문제 제출 후
    '64fa0p111111111111111111': {
      answerId: '64ans11111111111111111111',
      isCorrect: null,
      nextProblemId: '64fa0p222222222222222222',
      answeredCount: 1,
      remainingCount: 19
    } as DiagnosticSubmitResponse,
    
    // 2번 문제 제출 후
    '64fa0p222222222222222222': {
      answerId: '64ans22222222222222222222',
      isCorrect: null,
      nextProblemId: '64fa0p333333333333333333',
      answeredCount: 2,
      remainingCount: 18
    } as DiagnosticSubmitResponse,
    
    // 3번 문제 제출 후
    '64fa0p333333333333333333': {
      answerId: '64ans33333333333333333333',
      isCorrect: null,
      nextProblemId: '64fa0p444444444444444444',
      answeredCount: 3,
      remainingCount: 17
    } as DiagnosticSubmitResponse,
    
    // 4번 문제 제출 후
    '64fa0p444444444444444444': {
      answerId: '64ans44444444444444444444',
      isCorrect: null,
      nextProblemId: '64fa0p555555555555555555',
      answeredCount: 4,
      remainingCount: 16
    } as DiagnosticSubmitResponse,
    
    // 5번 문제 제출 후
    '64fa0p555555555555555555': {
      answerId: '64ans55555555555555555555',
      isCorrect: null,
      nextProblemId: '64fa0p666666666666666666',
      answeredCount: 5,
      remainingCount: 15
    } as DiagnosticSubmitResponse,
    
    // 6번 문제 제출 후
    '64fa0p666666666666666666': {
      answerId: '64ans66666666666666666666',
      isCorrect: null,
      nextProblemId: '64fa0p777777777777777777',
      answeredCount: 6,
      remainingCount: 14
    } as DiagnosticSubmitResponse,
    
    // 7번 문제 제출 후
    '64fa0p777777777777777777': {
      answerId: '64ans77777777777777777777',
      isCorrect: null,
      nextProblemId: '64fa0p888888888888888888',
      answeredCount: 7,
      remainingCount: 13
    } as DiagnosticSubmitResponse,
    
    // 8번 문제 제출 후
    '64fa0p888888888888888888': {
      answerId: '64ans88888888888888888888',
      isCorrect: null,
      nextProblemId: '64fa0p999999999999999999',
      answeredCount: 8,
      remainingCount: 12
    } as DiagnosticSubmitResponse,
    
    // 9번 문제 제출 후
    '64fa0p999999999999999999': {
      answerId: '64ans99999999999999999999',
      isCorrect: null,
      nextProblemId: '64fa0p101010101010101010',
      answeredCount: 9,
      remainingCount: 11
    } as DiagnosticSubmitResponse,
    
    // 10번 문제 제출 후
    '64fa0p101010101010101010': {
      answerId: '64ans10101010101010101010',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111112',
      answeredCount: 10,
      remainingCount: 10
    } as DiagnosticSubmitResponse,
    
    // 11번 문제 제출 후
    '64fa0p111111111111111112': {
      answerId: '64ans11111111111111111112',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111113',
      answeredCount: 11,
      remainingCount: 9
    } as DiagnosticSubmitResponse,
    
    // 12번 문제 제출 후
    '64fa0p111111111111111113': {
      answerId: '64ans11111111111111111113',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111114',
      answeredCount: 12,
      remainingCount: 8
    } as DiagnosticSubmitResponse,
    
    // 13번 문제 제출 후
    '64fa0p111111111111111114': {
      answerId: '64ans11111111111111111114',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111115',
      answeredCount: 13,
      remainingCount: 7
    } as DiagnosticSubmitResponse,
    
    // 14번 문제 제출 후
    '64fa0p111111111111111115': {
      answerId: '64ans11111111111111111115',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111116',
      answeredCount: 14,
      remainingCount: 6
    } as DiagnosticSubmitResponse,
    
    // 15번 문제 제출 후
    '64fa0p111111111111111116': {
      answerId: '64ans11111111111111111116',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111117',
      answeredCount: 15,
      remainingCount: 5
    } as DiagnosticSubmitResponse,
    
    // 16번 문제 제출 후
    '64fa0p111111111111111117': {
      answerId: '64ans11111111111111111117',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111118',
      answeredCount: 16,
      remainingCount: 4
    } as DiagnosticSubmitResponse,
    
    // 17번 문제 제출 후
    '64fa0p111111111111111118': {
      answerId: '64ans11111111111111111118',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111119',
      answeredCount: 17,
      remainingCount: 3
    } as DiagnosticSubmitResponse,
    
    // 18번 문제 제출 후
    '64fa0p111111111111111119': {
      answerId: '64ans11111111111111111119',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111120',
      answeredCount: 18,
      remainingCount: 2
    } as DiagnosticSubmitResponse,
    
    // 19번 문제 제출 후
    '64fa0p111111111111111120': {
      answerId: '64ans11111111111111111120',
      isCorrect: null,
      nextProblemId: '64fa0p111111111111111121',
      answeredCount: 19,
      remainingCount: 1
    } as DiagnosticSubmitResponse,
    
    // 20번 문제 제출 후 (마지막 - nextProblemId 없음)
    '64fa0p111111111111111121': {
      answerId: '64ans11111111111111111121',
      isCorrect: null,
      nextProblemId: null, // 마지막 문제이므로 다음 문제 없음
      answeredCount: 20,
      remainingCount: 0
    } as DiagnosticSubmitResponse
  },
  
  timeout: {
    timedOut: false,
    remainingMinutes: 30,
    totalTimeoutMinutes: 30,
    startedAt: '2025-07-10T12:00:00Z'
  } as DiagnosticTimeoutResponse
};
