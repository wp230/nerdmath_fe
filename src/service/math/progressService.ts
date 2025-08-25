import { UnitProgress } from '@/types/math';
import { mockServiceManager } from '../mockServiceManager';

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock 데이터 사용 여부 확인 (MockServiceManager 우선)
const shouldUseMock = () => mockServiceManager.isMockEnabled() || !API_BASE_URL;

// 요청 ID 생성
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export class ProgressService {
  // Mock 데이터 (개발 환경용)
  static getMockProgress(unitId: string): UnitProgress {
    return {
      unitId,
      conceptProgress: Math.floor(Math.random() * 100), // 랜덤 진행률
      problemProgress: Math.floor(Math.random() * 100),
      vocabProgress: Math.floor(Math.random() * 100),
      overallStatus: 'in_progress' as const,
    };
  }

  // 실제 API 호출 - 단원별 진행률 조회
  static async getUnitProgress(unitId: string): Promise<UnitProgress> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 단원 진행률');
      return this.getMockProgress(unitId);
    }

    console.log(
      '🚀 API 호출 시작: 단원 진행률 조회',
      `${API_BASE_URL}/v1/progress/concepts?unitId=${unitId}`
    );
    try {
      // 개념 진행률 조회
      const conceptResponse = await fetch(
        `${API_BASE_URL}/v1/progress/concepts?unitId=${unitId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('progress_concept'),
          },
        }
      );

      // 문제 진행률 조회
      const problemResponse = await fetch(
        `${API_BASE_URL}/v1/progress/problems?unitId=${unitId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('progress_problem'),
          },
        }
      );

      // 어휘 진행률 조회
      const vocabResponse = await fetch(
        `${API_BASE_URL}/v1/progress/vocab?unitId=${unitId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('progress_vocab'),
          },
        }
      );

      // 진행률 데이터 추출
      let conceptProgress = 0;
      let problemProgress = 0;
      let vocabProgress = 0;

      if (conceptResponse.ok) {
        const conceptData = await conceptResponse.json();
        const unitProgress = conceptData.units?.find(
          (u: any) => u.unitId === unitId
        );
        conceptProgress = unitProgress?.conceptProgress || 0;
      }

      if (problemResponse.ok) {
        const problemData = await problemResponse.json();
        const unitProgress = problemData.units?.find(
          (u: any) => u.unitId === unitId
        );
        problemProgress = unitProgress?.problemProgress || 0;
      }

      if (vocabResponse.ok) {
        const vocabData = await vocabResponse.json();
        const unitProgress = vocabData.units?.find(
          (u: any) => u.unitId === unitId
        );
        vocabProgress = unitProgress?.vocabProgress || 0;
      }

      const result: UnitProgress = {
        unitId,
        conceptProgress,
        problemProgress,
        vocabProgress,
        overallStatus: 'in_progress' as const,
      };

      console.log('✅ API 호출 성공: 단원 진행률', result);
      return result;
    } catch (error) {
      console.error('❌ 단원 진행률 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return this.getMockProgress(unitId);
    }
  }

  // 실제 API 호출 - 전체 진행률 조회
  static async getOverallProgress(): Promise<{
    totalConceptProgress: number;
    totalProblemProgress: number;
    totalVocabProgress: number;
    completedAllUnitsRatio: number;
  }> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 전체 진행률');
      return {
        totalConceptProgress: 35,
        totalProblemProgress: 42,
        totalVocabProgress: 28,
        completedAllUnitsRatio: 5.2,
      };
    }

    console.log(
      '🚀 API 호출 시작: 전체 진행률 조회',
      `${API_BASE_URL}/v1/progress/overall`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/v1/progress/overall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('progress_overall'),
        },
      });

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 전체 진행률', data);

      const result = {
        totalConceptProgress: data.totalConceptProgress || 0,
        totalProblemProgress: data.totalProblemProgress || 0,
        totalVocabProgress: data.totalVocabProgress || 0,
        completedAllUnitsRatio: data.completedAllUnitsRatio || 0,
      };
      return result;
    } catch (error) {
      console.error('❌ 전체 진행률 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return {
        totalConceptProgress: 35,
        totalProblemProgress: 42,
        totalVocabProgress: 28,
        completedAllUnitsRatio: 5.2,
      };
    }
  }
}
