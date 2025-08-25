import {
  FirstProblemResponse,
  SubmitAnswerParams,
  AnswerResponse,
  PracticeProblem,
} from '@/types/learning';
import { mockServiceManager } from '../mockServiceManager';

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock 데이터 사용 여부 확인 (MockServiceManager 우선)
const shouldUseMock = () => mockServiceManager.isMockEnabled() || !API_BASE_URL;

// 요청 ID 생성
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Idempotency Key 생성
const generateIdempotencyKey = (prefix: string) =>
  `idem_${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock 데이터
const getMockFirstProblem = (unitId: string): FirstProblemResponse => {
  const mockProblems: PracticeProblem[] = [
    {
      id: `problem_${unitId}_1`,
      type: 'math',
      questionType: '객관식',
      question: '5 + 3 = ?',
      answer: '8',
      explanation: '5와 3을 더하면 8입니다.',
      hint: '덧셈의 기본 원리를 생각해보세요.',
      choices: ['7', '8', '9', '10'],
    },
    {
      id: `problem_${unitId}_2`,
      type: 'math',
      questionType: '객관식',
      question: '10 - 4 = ?',
      answer: '6',
      explanation: '10에서 4를 빼면 6입니다.',
      hint: '뺄셈은 덧셈의 반대입니다.',
      choices: ['5', '6', '7', '8'],
    },
    {
      id: `problem_${unitId}_3`,
      type: 'math',
      questionType: '주관식',
      question: '2 × 6 = ?',
      answer: '12',
      explanation: '2를 6번 더하면 12입니다.',
      hint: '곱셈은 같은 수를 여러 번 더하는 것입니다.',
    },
    {
      id: `problem_${unitId}_4`,
      type: 'math',
      questionType: '주관식',
      question: '15 ÷ 3 = ?',
      answer: '5',
      explanation: '15를 3으로 나누면 5입니다.',
      hint: '나눗셈은 몇 개의 그룹으로 나누는 것입니다.',
    },
    {
      id: `problem_${unitId}_5`,
      type: 'math',
      questionType: '주관식',
      question: '다음 수식을 계산하세요:',
      answer: 'x = 2',
      explanation: '2x + 4 = 8에서 2x = 4, 따라서 x = 2입니다.',
      hint: '등식의 양변에서 같은 수를 빼거나 나누세요.',
      latex: '2x + 4 = 8',
    },
    {
      id: `problem_${unitId}_6`,
      type: 'math',
      questionType: '주관식',
      question: '이차방정식을 풀어보세요:',
      answer: 'x = 3 또는 x = -1',
      explanation:
        '인수분해를 통해 (x-3)(x+1) = 0이므로 x = 3 또는 x = -1입니다.',
      hint: '완전제곱식이나 인수분해를 사용하세요.',
      latex: 'x^2 - 2x - 3 = 0',
    },
  ];

  const problemIds = mockProblems.map((p) => p.id);

  return {
    problem: mockProblems[0],
    problemIds,
    progress: {
      completed: 0,
      total: problemIds.length,
      remaining: problemIds.length,
      percentage: 0.0,
    },
    sortedBy: 'cognitiveType',
    sortOrder: ['이해', '적용', '응용'],
    isFirstTime: true,
  };
};

const getMockAnswerResponse = (params: SubmitAnswerParams): AnswerResponse => {
  const { mode, problemId, userAnswer } = params;

  // Mock 정답 여부 (실제로는 서버에서 계산)
  const isCorrect = Math.random() > 0.3; // 70% 정답률

  // XP 계산
  let xpGained = 0;
  if (mode === 'vocab_test') {
    xpGained = isCorrect ? 5 : 3;
  } else {
    xpGained = isCorrect ? 15 : 10;
  }

  // 진행률 계산
  const progress: number = mode === 'vocab_test' ? 60 : 75;

  return {
    answerId: `answer_${Date.now()}`,
    isCorrect,
    explanation: {
      explanation: isCorrect
        ? '정답입니다! 잘 풀었어요.'
        : '틀렸습니다. 다시 한번 생각해보세요.',
    },
    relatedConcepts: [{ unitId: params.unitId, title: '수학의 기초' }],
    updatedProgress: {
      ...(mode === 'vocab_test'
        ? { vocabProgress: progress }
        : { problemProgress: progress }),
      status: progress >= 100 ? 'completed' : 'in_progress',
    },
    xpGained,
    gamificationUpdate: {
      level: 3,
      xp: 150 + xpGained,
      totalXp: 580 + xpGained,
      nextLevelXp: 500,
      leveledUp: false,
    },
  };
};

export class PracticeService {
  /**
   * 소단원별 첫 번째 문제 조회
   * GET /v1/units/{unitId}/first-problem
   */
  static async getFirstProblem(unitId: string): Promise<FirstProblemResponse> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 첫 번째 문제');
      return getMockFirstProblem(unitId);
    }

    console.log(
      '🚀 API 호출 시작: 첫 번째 문제 조회',
      `${API_BASE_URL}/v1/units/${unitId}/first-problem`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/units/${unitId}/first-problem`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('first_problem'),
            'Idempotency-Key': generateIdempotencyKey('first_problem'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 첫 번째 문제', data);
      return data;
    } catch (error) {
      console.error('❌ 첫 번째 문제 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return getMockFirstProblem(unitId);
    }
  }

  /**
   * 답안 제출 및 채점
   * POST /v1/answers/check
   */
  static async submitAnswer(
    params: SubmitAnswerParams
  ): Promise<AnswerResponse> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 답안 제출');
      // Mock 응답 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getMockAnswerResponse(params);
    }

    console.log(
      '🚀 API 호출 시작: 답안 제출',
      `${API_BASE_URL}/v1/answers/check`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/v1/answers/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('answer_check'),
          'Idempotency-Key': generateIdempotencyKey('answer_check'),
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 답안 제출', data);
      return data;
    } catch (error) {
      console.error('❌ 답안 제출 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return getMockAnswerResponse(params);
    }
  }

  /**
   * 문제 진행률 조회
   */
  static calculateProgress(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }

  /**
   * 다음 문제 ID 가져오기
   */
  static getNextProblemId(
    currentIndex: number,
    problemIds: string[]
  ): string | null {
    if (currentIndex >= problemIds.length - 1) {
      return null; // 마지막 문제
    }
    return problemIds[currentIndex + 1];
  }

  /**
   * 문제 세트 검증
   */
  static validateProblemSet(problemIds: string[]): boolean {
    return (
      problemIds.length > 0 && problemIds.every((id) => id && id.trim() !== '')
    );
  }
}
