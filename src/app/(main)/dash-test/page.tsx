'use client';

import React from 'react';
import {
  NerdMathWelcome,
  MainProgressBanner,
  SubProgressBanner,
  DiagnosticBanner,
  BookmarkSection,
  ProfileCard,
  TodayStats,
} from '@/components/dashboard';
import type {
  UserProfile,
  MyCharacter,
  OverallProgress,
  ActivityStats,
  ProgressByType,
  BookmarkList,
} from '@/types/dashboard';

// 모키 데이터 정의
const mockProfile: UserProfile = {
  id: 'user123',
  username: 'nerdmath_user',
  email: 'user@example.com',
  nickname: '수학러버',
  level: 5,
  xp: 1250,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-08-28T00:00:00Z',
  name: '김철수',
  gender: 'male',
  joinedAt: '2024-01-15T00:00:00Z',
};

const mockCharacter: MyCharacter = {
  gamificationState: {
    gamifiId: 'gamifi123',
    userId: 12345,
    level: 5,
    xp: 1250,
  },
  equippedCharacter: {
    characterId: 'char_male_lv5',
    name: '수학 탐험가 Lv.5',
    imageUrl: 'https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=👨‍🎓',
    gender: 'male',
    level: 5,
  },
};

const mockOverallProgress: OverallProgress = {
  totalConceptProgress: 75.5,
  totalProblemProgress: 62.3,
  totalVocabProgress: 84.7,
  completedAllUnitsRatio: 68.2,
};

const mockActivityStats: ActivityStats = {
  todaySolved: 15,
  studyDurationMin: 127,
  totalProblems: 892,
  totalStudyMinutes: 2340,
  attendanceCount: 28,
  date: '2024-08-28',
};

const mockConceptProgress: ProgressByType = {
  units: [
    {
      unitId: 'unit1',
      unitTitle: '함수의 기초',
      conceptProgress: 100,
      status: 'completed',
    },
    {
      unitId: 'unit2',
      unitTitle: '이차함수',
      conceptProgress: 75,
      status: 'in_progress',
    },
    {
      unitId: 'unit3',
      unitTitle: '지수와 로그',
      conceptProgress: 0,
      status: 'not_started',
    },
    {
      unitId: 'unit4',
      unitTitle: '삼각함수',
      conceptProgress: 100,
      status: 'completed',
    },
    {
      unitId: 'unit5',
      unitTitle: '미분',
      conceptProgress: 30,
      status: 'in_progress',
    },
  ],
};

const mockProblemProgress: ProgressByType = {
  units: [
    {
      unitId: 'unit1',
      unitTitle: '함수의 기초',
      conceptProgress: 90,
      status: 'completed',
    },
    {
      unitId: 'unit2',
      unitTitle: '이차함수',
      conceptProgress: 60,
      status: 'in_progress',
    },
    {
      unitId: 'unit3',
      unitTitle: '지수와 로그',
      conceptProgress: 0,
      status: 'not_started',
    },
    {
      unitId: 'unit4',
      unitTitle: '삼각함수',
      conceptProgress: 85,
      status: 'completed',
    },
  ],
};

const mockVocabProgress: ProgressByType = {
  units: [
    {
      unitId: 'unit1',
      unitTitle: '함수의 기초',
      conceptProgress: 100,
      status: 'completed',
    },
    {
      unitId: 'unit2',
      unitTitle: '이차함수',
      conceptProgress: 95,
      status: 'completed',
    },
    {
      unitId: 'unit3',
      unitTitle: '지수와 로그',
      conceptProgress: 40,
      status: 'in_progress',
    },
    {
      unitId: 'unit4',
      unitTitle: '삼각함수',
      conceptProgress: 100,
      status: 'completed',
    },
    {
      unitId: 'unit5',
      unitTitle: '미분',
      conceptProgress: 70,
      status: 'in_progress',
    },
    {
      unitId: 'unit6',
      unitTitle: '적분',
      conceptProgress: 0,
      status: 'not_started',
    },
  ],
};

const mockBookmarks: BookmarkList = {
  bookmarks: [
    {
      bookmarkId: 'bookmark1',
      problemId: 'problem123',
      unitId: 'unit2',
      unitTitle: '이차함수',
      problemTitle: '이차함수의 최대값과 최소값 구하기',
      bookmarkedAt: '2024-08-27T14:30:00Z',
    },
    {
      bookmarkId: 'bookmark2',
      problemId: 'problem456',
      unitId: 'unit1',
      unitTitle: '함수의 기초',
      problemTitle: '합성함수와 역함수의 성질',
      bookmarkedAt: '2024-08-26T10:15:00Z',
    },
    {
      bookmarkId: 'bookmark3',
      problemId: 'problem789',
      unitId: 'unit4',
      unitTitle: '삼각함수',
      problemTitle: '삼각함수의 덧셈정리 활용',
      bookmarkedAt: '2024-08-25T16:45:00Z',
    },
    {
      bookmarkId: 'bookmark4',
      problemId: 'problem101',
      unitId: 'unit2',
      unitTitle: '이차함수',
      problemTitle: '이차부등식 해 구하기',
      bookmarkedAt: '2024-08-24T11:20:00Z',
    },
    {
      bookmarkId: 'bookmark5',
      problemId: 'problem202',
      unitId: 'unit5',
      unitTitle: '미분',
      problemTitle: '도함수를 이용한 그래프 개형',
      bookmarkedAt: '2024-08-23T13:10:00Z',
    },
  ],
  totalCount: 12,
};

export default function DashTestPage() {
  // 모든 상태를 false로 설정 (로딩이나 에러 없이 바로 데이터 표시)
  const queryStates = {
    profile: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
    character: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
    overallProgress: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
    activityStats: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
    progressByType: {
      isLoading: false,
      isError: false,
      errors: [],
      isFetching: false,
    },
    bookmarks: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
    activeLearning: {
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 제목 */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-16">
          <h1 className="text-2xl font-bold text-gray-900">
            📊 대시보드 미리보기 (모키 데이터)
          </h1>
          <p className="text-gray-600 mt-1">
            실제 API 연동 없이 대시보드 화면을 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-16 py-8 flex gap-6">
        {/* 왼쪽 섹션 */}
        <div className="flex-1 space-y-6 mt-12">
          {/* 너드수학 웰컴 인사 */}
          <NerdMathWelcome profile={mockProfile} isLoading={false} />

          {/* 메인 학습 진행률 배너 */}
          <MainProgressBanner
            activityStats={mockActivityStats}
            activeLearning={null} // 활성 학습 세션 없음
            isLoading={false}
            error={null}
          />

          {/* 서브 학습 진행률 배너 */}
          <SubProgressBanner
            conceptProgress={mockConceptProgress}
            problemProgress={mockProblemProgress}
            vocabProgress={mockVocabProgress}
            isLoading={false}
            error={null}
          />

          {/* 진단 테스트 리디렉션 배너 */}
          <DiagnosticBanner
            hasCompletedDiagnostic={false}
            lastDiagnosticDate={undefined}
          />

          {/* 북마크 목록 조회 섹션 */}
          <BookmarkSection
            bookmarks={mockBookmarks}
            isLoading={false}
            error={null}
          />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-80 space-y-6 mt-12">
          {/* 프로필 카드 */}
          <ProfileCard
            profile={mockProfile}
            character={mockCharacter}
            overallProgress={mockOverallProgress}
            isLoading={false}
            error={null}
          />

          {/* 오늘 학습 통계 섹션 */}
          <TodayStats
            activityStats={mockActivityStats}
            isLoading={false}
            error={null}
          />
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="bg-blue-50 border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-16 py-6">
          <div className="flex items-center space-x-2 text-blue-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">
              이 페이지는 모키 데이터를 사용합니다. 실제 대시보드는
              /dashboard에서 확인하세요.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
