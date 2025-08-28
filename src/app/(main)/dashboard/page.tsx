'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardQueries } from '@/hooks/dashboard';
import { useCurrentUser, useAuthLoading } from '@/stores/auth.store';
import { Spinner } from '@/components/common';
import {
  NerdMathWelcome,
  MainProgressBanner,
  BookmarkSection,
  ProfileCard,
  TodayStats,
} from '@/components/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const isAuthLoading = useAuthLoading();

  // 인증 상태 확인 및 리다이렉트
  useEffect(() => {
    if (!isAuthLoading && !currentUser) {
      router.replace('/login?returnUrl=/dashboard');
    }
  }, [currentUser, isAuthLoading, router]);

  // 대시보드에 필요한 모든 데이터를 병렬로 조회
  const { data, queryStates, isLoading, isError, errors } =
    useDashboardQueries();

  // 인증 로딩 중이거나 로그인되지 않은 경우
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">로그인 정보를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // 로그인되지 않은 경우 (리다이렉트 처리 중)
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-16 py-8 flex gap-6">
        {/* 왼쪽 섹션 */}
        <div className="flex-1 font-DungGeunMo space-y-6 mt-12">
          {/* 너드수학 웰컴 인사 */}
          <NerdMathWelcome
            profile={data.profile}
            isLoading={queryStates.profile.isLoading}
          />

          {/* 메인 학습 진행률 배너 */}
          <MainProgressBanner
            activityStats={data.activityStats}
            isLoading={queryStates.activityStats.isLoading}
            error={queryStates.activityStats.error}
          />

          {/* 북마크 목록 조회 섹션 */}
          <BookmarkSection
            bookmarks={data.bookmarks}
            isLoading={queryStates.bookmarks.isLoading}
            error={queryStates.bookmarks.error}
          />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-80 font-DungGeunMo space-y-6 mt-12">
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
    </div>
  );
}
