import { BookmarkResponse } from '@/types/learning';
import { mockServiceManager } from '../mockServiceManager';

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock 데이터 사용 여부 확인 (MockServiceManager 우선)
const shouldUseMock = () => mockServiceManager.isMockEnabled() || !API_BASE_URL;

// 요청 ID 생성
const generateRequestId = (prefix: string) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock 데이터
const getMockBookmarkResponse = (problemId: string): BookmarkResponse => {
  // Mock 북마크 상태 (실제로는 서버에서 관리)
  const isBookmarked = Math.random() > 0.5;

  return {
    bookmarkId: `bookmark_${Date.now()}`,
    problemId,
    bookmarked: isBookmarked,
    message: isBookmarked
      ? '북마크가 추가되었습니다'
      : '북마크가 해제되었습니다',
  };
};

export class BookmarkService {
  /**
   * 북마크 토글 (추가/해제)
   * POST /v1/bookmarks/toggle
   */
  static async toggleBookmark(problemId: string): Promise<BookmarkResponse> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 북마크 토글');
      // Mock 응답 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockBookmarkResponse(problemId);
    }

    console.log(
      '🚀 API 호출 시작: 북마크 토글',
      `${API_BASE_URL}/v1/bookmarks/toggle`
    );
    try {
      const response = await fetch(`${API_BASE_URL}/v1/bookmarks/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('bookmark_toggle'),
        },
        body: JSON.stringify({ problemId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 북마크 토글', data);
      return data;
    } catch (error) {
      console.error('❌ 북마크 토글 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return getMockBookmarkResponse(problemId);
    }
  }

  /**
   * 북마크 상태 확인
   * GET /v1/bookmarks/{problemId}/status
   */
  static async getBookmarkStatus(
    problemId: string
  ): Promise<{ bookmarked: boolean }> {
    if (shouldUseMock()) {
      console.log('🔄 Mock 데이터 사용: 북마크 상태 확인');
      return { bookmarked: Math.random() > 0.5 };
    }

    console.log(
      '🚀 API 호출 시작: 북마크 상태 확인',
      `${API_BASE_URL}/v1/bookmarks/${problemId}/status`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/bookmarks/${problemId}/status`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('bookmark_status'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API 호출 성공: 북마크 상태 확인', data);
      return data;
    } catch (error) {
      console.error('❌ 북마크 상태 확인 실패:', error);
      console.log('🔄 Mock 데이터로 폴백');
      return { bookmarked: false };
    }
  }

  /**
   * 북마크 목록 조회
   * GET /v1/bookmarks
   */
  static async getBookmarks(
    userId?: string,
    unitId?: string
  ): Promise<{
    bookmarks: Array<{
      bookmarkId: string;
      problemId: string;
      unitId: string;
      unitTitle: string;
      problemTitle: string;
      bookmarkedAt: string;
    }>;
    totalCount: number;
  }> {
    if (shouldUseMock()) {
      const mockBookmarks = [
        {
          bookmarkId: 'bookmark_1',
          problemId: 'problem_1',
          unitId: 'unit_1',
          unitTitle: '수학의 기초',
          problemTitle: '덧셈 문제',
          bookmarkedAt: new Date().toISOString(),
        },
      ];

      return {
        bookmarks: mockBookmarks,
        totalCount: mockBookmarks.length,
      };
    }

    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (unitId) params.append('unitId', unitId);

      const response = await fetch(
        `${API_BASE_URL}/v1/bookmarks?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': generateRequestId('bookmark_list'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('북마크 목록 조회 실패:', error);
      return { bookmarks: [], totalCount: 0 };
    }
  }

  /**
   * 북마크한 문제로 복습 시작
   * POST /v1/bookmarks/review
   */
  static async startBookmarkReview(
    unitId: string,
    mode: 'set' | 'individual' = 'set'
  ): Promise<{
    setId?: string;
    problemIds: string[];
    totalProblems: number;
    mode: 'review' | 'individual';
  }> {
    if (shouldUseMock()) {
      const mockProblemIds = ['problem_1', 'problem_2', 'problem_3'];

      if (mode === 'set') {
        return {
          setId: `set_${Date.now()}`,
          problemIds: mockProblemIds,
          totalProblems: mockProblemIds.length,
          mode: 'review',
        };
      } else {
        return {
          problemIds: mockProblemIds,
          totalProblems: mockProblemIds.length,
          mode: 'individual',
        };
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/v1/bookmarks/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': generateRequestId('bookmark_review'),
        },
        body: JSON.stringify({ unitId, mode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('북마크 복습 시작 실패:', error);
      return { problemIds: [], totalProblems: 0, mode: 'individual' };
    }
  }
}
