/**
 * 전체 시스템의 MOCK 서비스를 중앙에서 관리하는 매니저
 * 하나의 불리언 값으로 모든 Mock 서비스를 통제
 */

export interface MockServiceConfig {
  // 전체 시스템 Mock 모드 (단일 토글)
  isMockMode: boolean;
}

export interface MockServiceStatus {
  config: MockServiceConfig;
  lastUpdated: string;
}

class MockServiceManager {
  private static instance: MockServiceManager;
  private config: MockServiceConfig;
  private listeners: Set<(status: MockServiceStatus) => void> = new Set();

  private constructor() {
    // 환경 변수에서 초기 설정 로드
    this.config = this.loadConfigFromEnv();

    // Mock 모드가 활성화된 경우 Math Unit 데이터 로드
    if (this.config.isMockMode) {
      this.loadMathUnitData();
    }
  }

  static getInstance(): MockServiceManager {
    if (!MockServiceManager.instance) {
      MockServiceManager.instance = new MockServiceManager();
    }
    return MockServiceManager.instance;
  }

  /**
   * 환경 변수에서 MOCK 서비스 설정 로드
   */
  private loadConfigFromEnv(): MockServiceConfig {
    const env = process.env.NODE_ENV || 'development';
    const forceMock = process.env.NEXT_PUBLIC_FORCE_MOCK === 'true';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // 개발 환경이고 API URL이 없거나 강제 Mock 모드인 경우
    const shouldUseMock = env === 'development' && (!apiUrl || forceMock);

    return {
      isMockMode: shouldUseMock,
    };
  }

  /**
   * 현재 MOCK 서비스 상태 조회
   */
  getStatus(): MockServiceStatus {
    return {
      config: { ...this.config },
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Mock 모드 사용 여부 확인
   */
  isMockEnabled(): boolean {
    return this.config.isMockMode;
  }

  /**
   * Mock 모드 토글
   */
  toggleMockMode(): void {
    this.config.isMockMode = !this.config.isMockMode;
    this.notifyListeners();
    this.saveConfig();
    console.log(`🔧 Mock Mode: ${this.config.isMockMode ? 'ON' : 'OFF'}`);

    // Mock 모드 전환 시 관련 서비스들 갱신
    this.refreshRelatedServices();
  }

  /**
   * Mock 모드 설정
   */
  setMockMode(enabled: boolean): void {
    this.config.isMockMode = enabled;
    this.notifyListeners();
    this.saveConfig();
    console.log(`🔧 Mock Mode: ${enabled ? 'ON' : 'OFF'}`);

    // Mock 모드 전환 시 관련 서비스들 갱신
    this.refreshRelatedServices();
  }

  /**
   * Mock 모드 활성화
   */
  enableMockMode(): void {
    this.setMockMode(true);
    // Mock 모드 활성화 시 Math Unit 데이터 로드
    this.loadMathUnitData();
  }

  /**
   * Mock 모드 비활성화
   */
  disableMockMode(): void {
    this.setMockMode(false);
  }

  /**
   * Mock 모드 전환 시 관련 서비스들 갱신
   */
  private refreshRelatedServices(): void {
    try {
      // VocabServiceFactory 갱신
      const { VocabServiceFactory } = require('./voca/vocabServiceFactory');
      if (
        VocabServiceFactory &&
        typeof VocabServiceFactory.forceRefreshOnMockToggle === 'function'
      ) {
        VocabServiceFactory.forceRefreshOnMockToggle();
      }

      // Math Unit 데이터 로드 (2순위)
      this.loadMathUnitData();

      // 추후 다른 서비스들도 여기에 추가
      console.log('🔄 MockServiceManager: Related services refreshed');
    } catch (error) {
      console.warn(
        '⚠️ MockServiceManager: Failed to refresh some services:',
        error
      );
    }
  }

  /**
   * Math Unit 데이터를 2순위로 로드
   * 1순위: 기존 API 로직
   * 2순위: math_Unit.ts의 Mock 데이터
   */
  private loadMathUnitData(): void {
    try {
      // math_Unit.ts에서 Mock 데이터 로드
      const { UNIT_DATA, UNIT_CHAPTERS } = require('@/hooks/math_Unit');

      if (UNIT_DATA && UNIT_CHAPTERS) {
        // 전역 객체에 Mock 데이터 등록 (기존 API 로직과 호환)
        if (typeof window !== 'undefined') {
          (window as any).UNIT_DATA = UNIT_DATA;
          (window as any).UNIT_CHAPTERS = UNIT_CHAPTERS;
          console.log('✅ MockServiceManager: Math Unit Mock 데이터 로드 완료');
        }
      }
    } catch (error) {
      console.warn(
        '⚠️ MockServiceManager: Math Unit Mock 데이터 로드 실패:',
        error
      );
    }
  }

  /**
   * Math Unit Mock 데이터 로드 상태 확인
   */
  isMathUnitDataLoaded(): boolean {
    if (typeof window !== 'undefined') {
      return !!(window as any).UNIT_DATA && !!(window as any).UNIT_CHAPTERS;
    }
    return false;
  }

  /**
   * Math Unit Mock 데이터 강제 로드
   */
  forceLoadMathUnitData(): void {
    console.log('🔄 MockServiceManager: Math Unit Mock 데이터 강제 로드 시작');
    this.loadMathUnitData();

    if (this.isMathUnitDataLoaded()) {
      console.log(
        '✅ MockServiceManager: Math Unit Mock 데이터 강제 로드 완료'
      );
    } else {
      console.warn(
        '⚠️ MockServiceManager: Math Unit Mock 데이터 강제 로드 실패'
      );
    }
  }

  /**
   * 설정을 로컬 스토리지에 저장
   */
  private saveConfig(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockServiceConfig', JSON.stringify(this.config));
    }
  }

  /**
   * 로컬 스토리지에서 설정 로드
   */
  loadConfigFromStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockServiceConfig');
      if (stored) {
        try {
          this.config = { ...this.config, ...JSON.parse(stored) };
          this.notifyListeners();
        } catch (error) {
          console.error(
            'Failed to load mock service config from storage:',
            error
          );
        }
      }
    }
  }

  /**
   * 설정 변경 리스너 등록
   */
  addListener(listener: (status: MockServiceStatus) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * 리스너들에게 변경 사항 알림
   */
  private notifyListeners(): void {
    const status = this.getStatus();
    this.listeners.forEach((listener) => listener(status));
  }

  /**
   * 개발자 도구용 정보 출력
   */
  logStatus(): void {
    const status = this.getStatus();
    console.group('🔧 Mock Service Manager Status');
    console.log('Mock Mode:', status.config.isMockMode ? '🟢 ON' : '🔴 OFF');
    console.log('Last Updated:', status.lastUpdated);
    console.groupEnd();
  }
}

// 싱글톤 인스턴스 export
export const mockServiceManager = MockServiceManager.getInstance();

// 편의 함수들
export const isMockEnabled = () => mockServiceManager.isMockEnabled();
export const toggleMockMode = () => mockServiceManager.toggleMockMode();
export const enableMockMode = () => mockServiceManager.enableMockMode();
export const disableMockMode = () => mockServiceManager.disableMockMode();

// 개발자 도구에서 직접 접근 가능하도록
if (typeof window !== 'undefined') {
  (window as any).mockServiceManager = mockServiceManager;
  (window as any).toggleMockMode = toggleMockMode;
  (window as any).enableMockMode = enableMockMode;
  (window as any).disableMockMode = disableMockMode;

  // Math Unit Mock 데이터 관련 함수들
  (window as any).isMathUnitDataLoaded = () =>
    mockServiceManager.isMathUnitDataLoaded();
  (window as any).forceLoadMathUnitData = () =>
    mockServiceManager.forceLoadMathUnitData();
}
