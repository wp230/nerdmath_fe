import React from 'react';
import Link from 'next/link';
import { Button, Spinner } from '@/components/common';
import type { ActivityStats } from '@/types/dashboard';

interface MainProgressBannerProps {
  activityStats?: ActivityStats;
  isLoading?: boolean;
  error?: any;
}

const MainProgressBanner: React.FC<MainProgressBannerProps> = ({
  activityStats,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-center h-32">
          <Spinner size="lg" color="white" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg shadow-lg p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            데이터를 불러올 수 없습니다
          </h2>
          <p className="text-white/80">잠시 후 다시 시도해주세요.</p>
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

  // 오늘 학습한 경우
  if (activityStats && activityStats.todaySolved > 0) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">
              오늘도 열심히 하고 있어요! 🎉
            </h2>
            <p className="text-white/80 mb-4">
              오늘 {activityStats.todaySolved}개의 문제를 해결하고{' '}
              {formatTime(activityStats.studyDurationMin)} 동안 학습했어요.
            </p>
            <div className="flex space-x-3">
              <Button
                as={Link}
                href="/course"
                variant="primary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                학습 계속하기
              </Button>
              <Button
                as={Link}
                href="/diagnostic"
                variant="ghost"
                className="text-white border-white hover:bg-white/10"
              >
                진단 테스트
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 아직 학습하지 않은 경우
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">
            오늘 학습을 시작해보세요! 📚
          </h2>
          <p className="text-white/80 mb-4">
            새로운 지식을 쌓고 실력을 향상시킬 시간입니다. 어떤 학습부터
            시작하시겠어요?
          </p>
          <div className="flex space-x-3">
            <div className="bg-white text-gray-700 hover:bg-gray-100 rounded-lg px-4 py-2">
              맞춤형 학습
            </div>
            <div className="bg-white text-black hover:bg-gray-100 rounded-lg px-4 py-2">
              직접 선택
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProgressBanner;
