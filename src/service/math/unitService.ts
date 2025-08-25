import { UnitData, ChapterData } from '@/types/math';
import { mockServiceManager } from '../mockServiceManager';

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock 데이터 사용 여부 확인 (MockServiceManager 우선)
const shouldUseMock = () => mockServiceManager.isMockEnabled() || !API_BASE_URL;

// 요청 ID 생성
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export class UnitService {
  // Mock 데이터 (개발 환경용)
  static getMockUnit(unitId: string): UnitData {
    const unitData = UNIT_DATA[unitId as keyof typeof UNIT_DATA];
    if (!unitData) {
      throw new Error(`Unit ${unitId} not found`);
    }

    return {
      unitId: unitData.unitId,
      title: unitData.title,
      description: unitData.description,
      backgroundColor: unitData.backgroundColor,
      grade: 1, // 기본값
      chapter: 1, // 기본값
      chapterTitle: '기본',
      orderInGrade: 1, // 기본값
      status: 'active' as const,
    };
  }

  static getMockChapters(unitId: string): ChapterData[] {
    const chapters = UNIT_CHAPTERS[unitId as keyof typeof UNIT_CHAPTERS];
    if (!chapters) {
      return [];
    }

    return chapters.map((chapter) => ({
      chapter: chapter.chapter,
      title: chapter.title,
      subtitle: chapter.subtitle,
      grade: chapter.grade,
      description: chapter.description,
      progress: 0, // 기본 진행률
      status: 'not_started' as const,
    }));
  }

  // 실제 API 호출 - 단원 정보 조회
  static async getUnit(unitId: string): Promise<UnitData> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 단원 정보');
      return this.getMockUnit(unitId);
    }

    console.log(
      '🚀 API 호출 시작: 단원 정보 조회',
      `${API_BASE_URL}/v1/units/${unitId}`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/v1/units/${unitId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('unit_info'),
        },
      });

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 단원 정보', data);
      return data;
    } catch (error) {
      console.error('❌ 단원 정보 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return this.getMockUnit(unitId);
    }
  }

  // 실제 API 호출 - 소단원 목록 조회
  static async getChapters(unitId: string): Promise<ChapterData[]> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 소단원 목록');
      return this.getMockChapters(unitId);
    }

    console.log(
      '🚀 API 호출 시작: 소단원 목록 조회',
      `${API_BASE_URL}/v1/units/${unitId}/chapters`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/units/${unitId}/chapters`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('unit_chapters'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `API 호출 실패: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 소단원 목록', data);
      return data.chapters || [];
    } catch (error) {
      console.error('❌ 소단원 목록 조회 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return this.getMockChapters(unitId);
    }
  }
}
