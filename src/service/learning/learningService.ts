import {
  LearningData,
  VocabCard,
  LearningCompletionResult,
} from '../../types/learning';
import { mockServiceManager } from '../mockServiceManager';

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock 데이터 사용 여부 확인 (MockServiceManager 우선)
const shouldUseMock = () => mockServiceManager.isMockEnabled() || !API_BASE_URL;

// 요청 ID 생성
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Idempotency Key 생성
const generateIdempotencyKey = (prefix: string) =>
  `idem_${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export class LearningService {
  // Mock 데이터 (개발 환경용)
  static getMockLearningData(unitId: string): LearningData {
    return {
      conceptId: `mock_concept_${unitId}`,
      unitId,
      concept: {
        blocks: [
          {
            id: '1',
            type: 'explanation',
            title: '기본 개념 설명',
            content:
              '이것은 테스트용 개념 설명입니다. 실제로는 API에서 가져온 데이터가 표시됩니다.',
          },
          {
            id: '2',
            type: 'realExample',
            title: '실생활 예시',
            content:
              '실제 사용 예시를 보여줍니다. 쇼핑할 때 할인 계산, 요리할 때 비율 계산 등이 있습니다.',
            examples: [
              '쇼핑할 때 할인 계산',
              '요리할 때 비율 계산',
              '여행할 때 거리 계산',
            ],
          },
          {
            id: '3',
            type: 'internationalExample',
            title: '세계 각국의 수학 교육',
            content: '다른 나라에서는 이 개념을 어떻게 가르칠까요?',
            countries: [
              {
                country: '일본',
                example: '일본에서는 구체적인 예시를 통해 가르칩니다.',
              },
              {
                country: '미국',
                example: '미국에서는 실용적인 문제 해결에 중점을 둡니다.',
              },
            ],
          },
          {
            id: '4',
            type: 'relation',
            title: '관련 개념',
            content: '이 개념과 관련된 다른 수학 개념들을 살펴보겠습니다.',
            connections: ['분수의 덧셈', '분수의 뺄셈', '분수의 곱셈'],
          },
        ],
      },
      vocab: {
        vocabularies: [
          {
            id: `mock_voca_${unitId}_1`,
            word: 'fraction',
            meaning: '분수',
            etymology: 'fractus: 라틴어 깨진',
            imageUrl: '', // Mock 데이터에서는 이미지 경로 제거
          },
          {
            id: `mock_voca_${unitId}_2`,
            word: 'numerator',
            meaning: '분자',
            etymology: 'numerare: 라틴어 세다',
            imageUrl: '', // Mock 데이터에서는 이미지 경로 제거
          },
          {
            id: `mock_voca_${unitId}_3`,
            word: 'denominator',
            meaning: '분모',
            etymology: 'denominare: 라틴어 이름붙이다',
            imageUrl: '', // Mock 데이터에서는 이미지 경로 제거
          },
        ],
      },
      practice: {
        problems: [
          {
            id: `mock_problem_${unitId}_1`,
            type: 'math',
            questionType: '객관식',
            question: '1/2 + 1/4 = ?',
            answer: '3/4',
            explanation: '1/2 = 2/4이므로, 2/4 + 1/4 = 3/4입니다.',
            hint: '분모를 같게 만들어보세요',
            choices: ['1/6', '2/6', '3/4', '3/6'],
          },
          {
            id: `mock_problem_${unitId}_2`,
            type: 'math',
            questionType: '객관식',
            question: '2/3 × 3/4 = ?',
            answer: '1/2',
            explanation: '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2입니다.',
            hint: '곱셈은 분자×분자, 분모×분모',
            choices: ['1/2', '6/12', '6/7', '1/2'],
          },
        ],
      },
      createdAt: new Date().toISOString(),
    };
  }

  // 실제 API 호출 - 학습 데이터 조회
  static async getLearningData(unitId: string): Promise<LearningData> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 학습 데이터');
      return this.getMockLearningData(unitId);
    }

    console.log(
      '🚀 API 호출 시작: 학습 데이터 조회',
      `${API_BASE_URL}/v1/learning/units/${unitId}`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/learning/units/${unitId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('learning_data'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 학습 데이터', data);
      return data;
    } catch (error) {
      console.error('❌ 학습 데이터 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return this.getMockLearningData(unitId);
    }
  }

  // 실제 API 호출 - 어휘 데이터 조회
  static async getVocabData(unitId: string): Promise<VocabCard[]> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 어휘 데이터');
      const data = await this.getMockLearningData(unitId);
      return data.vocab.vocabularies;
    }

    console.log(
      '🚀 API 호출 시작: 어휘 데이터 조회',
      `${API_BASE_URL}/v1/vocab/unit/${unitId}`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/v1/vocab/unit/${unitId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('vocab_data'),
        },
      });

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 어휘 데이터', data);
      return data.vocabularies || [];
    } catch (error) {
      console.error('❌ 어휘 데이터 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      const mockData = await this.getMockLearningData(unitId);
      return mockData.vocab.vocabularies;
    }
  }

  // 실제 API 호출 - 학습 완료 (전체 단원)
  static async completeLearning(
    unitId: string
  ): Promise<LearningCompletionResult> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 학습 완료');
      return {
        unitId,
        conceptProgress: 100,
        message: 'Mock: 학습이 완료되었습니다.',
        updatedProgress: {
          conceptProgress: 100,
          status: 'completed',
        },
        xpGained: 100,
        gamificationUpdate: {
          level: 3,
          xp: 150,
          totalXp: 580,
          nextLevelXp: 500,
          leveledUp: false,
        },
      };
    }

    console.log(
      '🚀 API 호출 시작: 학습 완료',
      `${API_BASE_URL}/v1/learning/units/${unitId}/complete`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/learning/units/${unitId}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('learning_complete'),
            'Idempotency-Key': generateIdempotencyKey('learning_complete'),
          },
          body: JSON.stringify({
            unitId,
            completedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 학습 완료', data);
      return data;
    } catch (error) {
      console.error('❌ 학습 완료 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return {
        unitId,
        conceptProgress: 100,
        message: 'Mock: 학습이 완료되었습니다.',
        updatedProgress: {
          conceptProgress: 100,
          status: 'completed',
        },
        xpGained: 100,
        gamificationUpdate: {
          level: 3,
          xp: 150,
          totalXp: 580,
          nextLevelXp: 500,
          leveledUp: false,
        },
      };
    }
  }

  // 실제 API 호출 - 개념 학습 완료
  static async completeConcept(
    unitId: string,
    conceptId: string
  ): Promise<LearningCompletionResult> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 개념 학습 완료');
      return {
        unitId,
        conceptProgress: 100,
        message: 'Mock: 개념 학습이 완료되었습니다.',
        updatedProgress: {
          conceptProgress: 100,
          status: 'completed',
        },
        xpGained: 50,
        gamificationUpdate: {
          level: 3,
          xp: 150,
          totalXp: 580,
          nextLevelXp: 500,
          leveledUp: false,
        },
      };
    }

    console.log(
      '🚀 API 호출 시작: 개념 학습 완료',
      `${API_BASE_URL}/v1/learning/concepts/${conceptId}/complete`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/learning/concepts/${conceptId}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('concept_complete'),
            'Idempotency-Key': generateIdempotencyKey('concept_complete'),
          },
          body: JSON.stringify({
            conceptId,
            unitId,
            completedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 개념 학습 완료', data);
      return data;
    } catch (error) {
      console.error('❌ 개념 학습 완료 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return {
        unitId,
        conceptProgress: 100,
        message: 'Mock: 개념 학습이 완료되었습니다.',
        updatedProgress: {
          conceptProgress: 100,
          status: 'completed',
        },
        xpGained: 50,
        gamificationUpdate: {
          level: 3,
          xp: 150,
          totalXp: 580,
          nextLevelXp: 500,
          leveledUp: false,
        },
      };
    }
  }
}
