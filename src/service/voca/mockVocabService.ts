import { VocabPackResponse, VocabReviewResponse } from '@/types/voca';

// Mock 데이터
const mockUnitVocab: VocabPackResponse = {
  unitId: 'unit-001',
  category: 'math_term',
  vocabularies: [
    {
      vocaId: '64v1111111111111111111111',
      word: 'angle',
      meaning: '각도',
      etymology: 'angulus: 라틴어 모서리',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
    {
      vocaId: '64v2222222222222222222222',
      word: 'triangle',
      meaning: '삼각형',
      etymology: 'tri: 3 + angle: 각',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
    {
      vocaId: '64v3333333333333333333333',
      word: 'quadrilateral',
      meaning: '사각형',
      etymology: 'quadri: 4 + lateral: 측면',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
  ],
  // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
};

const mockSatActVocab: VocabPackResponse = {
  type: 'sat_act',
  category: 'common',
  vocabularies: [
    {
      vocaId: '64v4444444444444444444444',
      word: 'solve for',
      meaning: '~에 대해 풀다',
      etymology: 'solve: 해결하다 + for: ~에 대해',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
    {
      vocaId: '64v5555555555555555555555',
      word: 'given that',
      meaning: '~가 주어졌을 때',
      etymology: 'given: 주어진 + that: ~라는 것',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
    {
      vocaId: '64v6666666666666666666666',
      word: 'find the value of',
      meaning: '~의 값을 구하다',
      etymology: 'find: 찾다 + value: 값 + of: ~의',
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    },
  ],
  // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
};

const mockUnitReviewVocab: VocabReviewResponse = {
  unitId: '64unit001111111111111111',
  userId: 12345,
  incorrectVocabularies: [
    {
      vocaId: '64v1111111111111111111111',
      word: 'angle',
      meaning: '각도',
      etymology: 'angulus: 라틴어 모서리',
      imageUrl: '', // Mock 데이터에서는 이미지 경로 제거
      totalAttempts: 3,
      correctAttempts: 1,
      accuracy: 0.33,
      lastAttempted: '2025-01-20T10:25:00Z',
    },
  ],
};

const mockCommonReviewVocab: VocabReviewResponse = {
  type: 'sat_act',
  userId: 12345,
  incorrectVocabularies: [
    {
      vocaId: '64v4444444444444444444444',
      word: 'solve for',
      meaning: '~에 대해 풀다',
      etymology: 'solve: 해결하다 + for: ~에 대해',
      imageUrl: '', // Mock 데이터에서는 이미지 경로 제거
      totalAttempts: 2,
      correctAttempts: 0,
      accuracy: 0.0,
      lastAttempted: '2025-01-20T10:26:00Z',
    },
  ],
};

export class MockVocabService {
  // 5-1: 단원별 어휘 조회
  async getUnitVocab(unitId: string): Promise<VocabPackResponse> {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (unitId === 'unit-001') {
      // Mock 데이터와 일치하는 unitId 사용
      return mockUnitVocab;
    }

    throw new Error(`Unit ID ${unitId} not found`);
  }

  // 5-2: 빈출 어휘 조회
  async getCommonVocab(type: string): Promise<VocabPackResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (type === 'sat_act') {
      return mockSatActVocab;
    }

    throw new Error(`Type ${type} not found`);
  }

  // 5-4: 단원별 복습 어휘
  async getUnitReviewVocab(
    unitId: string,
    userId: number
  ): Promise<VocabReviewResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (unitId === '64unit001111111111111111') {
      return mockUnitReviewVocab;
    }

    throw new Error(`Unit ID ${unitId} not found`);
  }

  // 5-5: 빈출 어휘 복습
  async getCommonReviewVocab(
    type: string,
    userId: number
  ): Promise<VocabReviewResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (type === 'sat_act') {
      return mockCommonReviewVocab;
    }

    throw new Error(`Type ${type} not found`);
  }

  // 모든 어휘팩 조회 (통합)
  async getAllVocabPacks(userId: number = 12345): Promise<VocabPackResponse[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [mockUnitVocab, mockSatActVocab];
  }
}
