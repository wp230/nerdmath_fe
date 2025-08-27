'use client';

import React from 'react';
import { useDashboardQueries } from '@/hooks/dashboard';
import {
  NerdMathWelcome,
  MainProgressBanner,
  SubProgressBanner,
  DiagnosticBanner,
  BookmarkSection,
  ProfileCard,
  TodayStats,
} from '@/components/dashboard';

export default function DashboardPage() {
  // 대시보드에 필요한 모든 데이터를 병렬로 조회
  const { data, queryStates, isLoading, isError, errors } =
    useDashboardQueries();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-16 py-8 flex gap-6">
        {/* 왼쪽 섹션 */}
        <div className="flex-1 space-y-6 mt-12">
          {/* 너드수학 웰컴 인사 */}
          <NerdMathWelcome
            profile={data.profile}
            isLoading={queryStates.profile.isLoading}
          />

          {/* 메인 학습 진행률 배너 */}
          <MainProgressBanner
            activityStats={data.activityStats}
            activeLearning={data.activeLearning?.activeSession}
            isLoading={queryStates.activityStats.isLoading}
            error={queryStates.activityStats.error}
          />

          {/* 서브 학습 진행률 배너 */}
          <SubProgressBanner
            conceptProgress={data.progressByType.concepts}
            problemProgress={data.progressByType.problems}
            vocabProgress={data.progressByType.vocab}
            isLoading={queryStates.progressByType.isLoading}
            error={queryStates.progressByType.errors}
          />

          {/* 진단 테스트 리디렉션 배너 */}
          <DiagnosticBanner
            hasCompletedDiagnostic={false} // TODO: 실제 진단 테스트 완료 여부 확인
            lastDiagnosticDate={undefined} // TODO: 마지막 진단 테스트 날짜
          />

          {/* 북마크 목록 조회 섹션 */}
          <BookmarkSection
            bookmarks={data.bookmarks}
            isLoading={queryStates.bookmarks.isLoading}
            error={queryStates.bookmarks.error}
          />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-80 space-y-6 mt-12">
          {/* 프로필 카드 */}
          <ProfileCard
            profile={data.profile}
            character={data.character}
            overallProgress={data.overallProgress}
            isLoading={
              queryStates.profile.isLoading ||
              queryStates.character.isLoading ||
              queryStates.overallProgress.isLoading
            }
            error={
              queryStates.profile.error ||
              queryStates.character.error ||
              queryStates.overallProgress.error
            }
          />

          {/* 오늘 학습 통계 섹션 */}
          <TodayStats
            activityStats={data.activityStats}
            isLoading={queryStates.activityStats.isLoading}
            error={queryStates.activityStats.error}
          />
        </div>
      </div>

      {/* 전체 로딩 상태 표시 (선택사항) */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">데이터 로딩 중...</span>
          </div>
        </div>
      )}

      {/* 에러 상태 표시 (선택사항) */}
      {isError && errors.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm">
          <div className="text-sm text-red-800">
            일부 데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      )}
    </div>
  );
}
