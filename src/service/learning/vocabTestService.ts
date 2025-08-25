import { VocabTestSet } from '@/types/learning';
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
const getMockVocabTest = (unitId: string, testSize: number): VocabTestSet => {
  const mockProblems = [
    {
      problemId: `vocab_${unitId}_1`,
      vocaId: `voca_${unitId}_1`,
      question: 'angle의 뜻을 쓰세요',
      correctAnswer: '각도',
      explanation: 'angulus: 라틴어 모서리',
      questionType: 'word_to_meaning' as const,
    },
    {
      problemId: `vocab_${unitId}_2`,
      vocaId: `voca_${unitId}_2`,
      question: '삼각형을 영어로 쓰세요',
      correctAnswer: 'triangle',
      explanation: 'tri: 3 + angle: 각',
      questionType: 'meaning_to_word' as const,
    },
    {
      problemId: `vocab_${unitId}_3`,
      vocaId: `voca_${unitId}_3`,
      question: 'solve for의 뜻을 쓰세요',
      correctAnswer: '~에 대해 풀다',
      explanation: 'solve: 해결하다 + for: ~에 대해',
      questionType: 'word_to_meaning' as const,
    },
    {
      problemId: `vocab_${unitId}_4`,
      vocaId: `voca_${unitId}_4`,
      question: '~가 주어졌을 때를 영어로 쓰세요',
      correctAnswer: 'given that',
      explanation: 'given: 주어진 + that: ~라는 것',
      questionType: 'meaning_to_word' as const,
    },
    {
      problemId: `vocab_${unitId}_5`,
      vocaId: `voca_${unitId}_5`,
      question: 'fraction의 뜻을 쓰세요',
      correctAnswer: '분수',
      explanation: 'fractus: 라틴어 깨진',
      questionType: 'word_to_meaning' as const,
    },
  ];

  // testSize에 맞게 문제 수 조정
  const selectedProblems = mockProblems.slice(
    0,
    Math.min(testSize, mockProblems.length)
  );

  return {
    testSet: {
      unitId,
      testSize: selectedProblems.length,
      problems: selectedProblems,
    },
    generatedAt: new Date().toISOString(),
  };
};

export class VocabTestService {
  /**
   * 어휘 테스트 문제 세트 조회
   * GET /v1/vocab/test?unitId={unitId}&testSize=10
   */
  static async getVocabTest(
    unitId: string,
    testSize: number
  ): Promise<VocabTestSet> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 어휘 테스트');
      return getMockVocabTest(unitId, testSize);
    }

    console.log(
      '🚀 API 호출 시작: 어휘 테스트 조회',
      `${API_BASE_URL}/v1/vocab/test?unitId=${unitId}&testSize=${testSize}`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/vocab/test?unitId=${unitId}&testSize=${testSize}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('vocab_test'),
            IdempotencyKey: generateIdempotencyKey('vocab_test'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 어휘 테스트', data);
      return data;
    } catch (error) {
      console.error('❌ 어휘 테스트 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return getMockVocabTest(unitId, testSize);
    }
  }

  /**
   * 어휘 테스트 문제 세트 검증
   */
  static validateVocabTest(testSet: VocabTestSet): boolean {
    if (!testSet.testSet || !testSet.testSet.problems) {
      return false;
    }

    if (testSet.testSet.problems.length === 0) {
      return false;
    }

    // 각 문제의 필수 필드 검증
    return testSet.testSet.problems.every(
      (problem) =>
        problem.problemId &&
        problem.question &&
        problem.correctAnswer &&
        problem.explanation
    );
  }
}
