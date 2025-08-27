import React from 'react';
import { Spinner } from '@/components/common';
import type { ActivityStats } from '@/types/dashboard';

interface TodayStatsProps {
  activityStats?: ActivityStats;
  isLoading?: boolean;
  error?: any;
}

const TodayStats: React.FC<TodayStatsProps> = ({
  activityStats,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          오늘 학습 통계
        </h3>
        <div className="flex items-center justify-center h-32">
          <Spinner size="md" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          오늘 학습 통계
        </h3>
        <div className="text-center text-red-600">
          <p>통계를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (!activityStats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          오늘 학습 통계
        </h3>
        <div className="text-center text-gray-500">
          <p>아직 학습 데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}분`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}시간 ${remainingMinutes}분`
      : `${hours}시간`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">오늘 학습 통계</h3>
        <span className="text-sm text-gray-500">
          {formatDate(activityStats.date)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 오늘 푼 문제 수 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {activityStats.todaySolved}
              </p>
              <p className="text-sm text-gray-600">문제 해결</p>
            </div>
          </div>
        </div>

        {/* 오늘 학습 시간 */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 rounded-full p-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {formatTime(activityStats.studyDurationMin)}
              </p>
              <p className="text-sm text-gray-600">학습 시간</p>
            </div>
          </div>
        </div>

        {/* 누적 문제 수 */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 rounded-full p-2">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {activityStats.totalProblems.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">총 문제 수</p>
            </div>
          </div>
        </div>

        {/* 출석 일수 */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 rounded-full p-2">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {activityStats.attendanceCount}
              </p>
              <p className="text-sm text-gray-600">연속 출석</p>
            </div>
          </div>
        </div>
      </div>

      {/* 총 학습 시간 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            총 학습 시간
          </span>
          <span className="text-sm font-bold text-gray-900">
            {formatTime(activityStats.totalStudyMinutes)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayStats;
