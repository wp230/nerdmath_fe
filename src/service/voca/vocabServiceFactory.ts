import { VocabPackService } from './vocabPackService';
import { MockVocabService } from './mockVocabService';
import { mockServiceManager } from '../mockServiceManager';
import { VocabPackResponse } from '@/types/voca'; // 타입 import 추가

export type VocabServiceType = 'api' | 'mock';

export interface IVocabService {
  getUnitVocab(unitId: string): Promise<any>;
  getCommonVocab(type: string): Promise<any>;
  getUnitReviewVocab(unitId: string, userId: number): Promise<any>;
  getCommonReviewVocab(type: string, userId: number): Promise<any>;
  getAllVocabPacks(userId?: number): Promise<VocabPackResponse[]>; // 타입 구체화
}

export class VocabServiceFactory {
  private static instance: IVocabService | null = null;
  private static serviceType: VocabServiceType = 'api';
  private static lastMockState: boolean | null = null;

  private constructor() {}

  static getInstance(): IVocabService {
    // Mock 모드 상태가 변경되었는지 확인
    const currentMockState = mockServiceManager.isMockEnabled();

    // Mock 상태가 변경되었거나 인스턴스가 없는 경우 새로 생성
    if (this.lastMockState !== currentMockState || !this.instance) {
      this.lastMockState = currentMockState;
      this.instance = this.createService();
      console.log(
        `🔄 VocabServiceFactory: Service refreshed (Mock: ${currentMockState ? 'ON' : 'OFF'})`
      );
    }

    return this.instance;
  }

  private static createService(): IVocabService {
    // MockServiceManager 우선 확인
    if (mockServiceManager.isMockEnabled()) {
      console.log('🔧 VocabServiceFactory: Using Mock Vocab Service');
      this.serviceType = 'mock';
      return new MockVocabService();
    }

    // 기존 로직 (하위 호환성 유지)
    const forceMock = process.env.NEXT_PUBLIC_FORCE_MOCK === 'true';
    const env = process.env.NEXT_PUBLIC_ENV || 'development';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (forceMock || env === 'development' || !apiUrl) {
      console.log(
        '🔧 VocabServiceFactory: Using Mock Vocab Service (Environment)'
      );
      this.serviceType = 'mock';
      return new MockVocabService();
    }

    console.log('🔧 VocabServiceFactory: Using API Vocab Service');
    this.serviceType = 'api';
    return new VocabPackService();
  }

  static getCurrentServiceType(): VocabServiceType {
    if (mockServiceManager.isMockEnabled()) {
      return 'mock';
    }
    return this.serviceType;
  }

  /**
   * 서비스 인스턴스를 강제로 새로고침
   * Mock 모드 전환 후 즉시 반영이 필요한 경우 사용
   */
  static refreshService(): void {
    console.log('🔄 VocabServiceFactory: Force refreshing service...');
    this.instance = null;
    this.lastMockState = null;
    this.instance = this.createService();
    console.log('✅ VocabServiceFactory: Service refreshed successfully');
  }

  /**
   * 현재 Mock 모드 상태 확인
   */
  static isMockMode(): boolean {
    return mockServiceManager.isMockEnabled();
  }

  /**
   * Mock 모드 전환 시 서비스 자동 갱신
   */
  static forceRefreshOnMockToggle(): void {
    console.log(
      '🔄 VocabServiceFactory: Mock mode toggled, refreshing service...'
    );
    this.refreshService();
  }

  /**
   * API 서비스 사용 가능 여부 확인
   */
  static isApiServiceAvailable(): boolean {
    const env = process.env.NEXT_PUBLIC_ENV || 'development';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    return env === 'production' ? !!apiUrl : !!apiUrl;
  }
}
