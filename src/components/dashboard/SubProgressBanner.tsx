import React from 'react';
import Link from 'next/link';
import { Button, Spinner } from '@/components/common';
import type { ProgressByType } from '@/types/dashboard';

interface SubProgressBannerProps {
  conceptProgress?: ProgressByType;
  problemProgress?: ProgressByType;
  vocabProgress?: ProgressByType;
  isLoading?: boolean;
  error?: any;
}

const SubProgressBanner: React.FC<SubProgressBannerProps> = ({
  conceptProgress,
  problemProgress,
  vocabProgress,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-32">
              <Spinner size="md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>진행률 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getProgressStats = (units: ProgressByType | undefined) => {
    if (!units?.units || units.units.length === 0) {
      return { completed: 0, inProgress: 0, total: 0, percentage: 0 };
    }

    const completed = units.units.filter(unit => unit.status === 'completed').length;
    const inProgress = units.units.filter(unit => unit.status === 'in_progress').length;
    const total = units.units.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { completed, inProgress, total, percentage };
  };

  const conceptStats = getProgressStats(conceptProgress);
  const problemStats = getProgressStats(problemProgress);
  const vocabStats = getProgressStats(vocabProgress);

  const progressBanners = [
    {
      title: '개념 학습',
      subtitle: '기초부터 차근차근',
      stats: conceptStats,
      color: 'green',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
      href: '/course?type=concept',
    },
    {
      title: '문제 풀이',
      subtitle: '실력을 확인해보세요',
      stats: problemStats,
      color: 'blue',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      ),
      href: '/course?type=problem',
    },
    {
      title: '어휘 학습',
      subtitle: '수학 용어를 익혀보세요',
      stats: vocabStats,
      color: 'purple',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
      href: '/vocabulary',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        progress: 'bg-green-500',
        button: 'bg-green-600 hover:bg-green-700',
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        progress: 'bg-blue-500',
        button: 'bg-blue-600 hover:bg-blue-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        progress: 'bg-purple-500',
        button: 'bg-purple-600 hover:bg-purple-700',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {progressBanners.map((banner, index) => {
        const colors = getColorClasses(banner.color);
        
        return (
          <div
            key={index}
            className={`${colors.bg} ${colors.border} border rounded-lg p-6 hover:shadow-md transition-shadow`}
          >
            {/* 헤더 */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${colors.text} p-2 rounded-lg bg-white`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {banner.icon}
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.subtitle}</p>
              </div>
            </div>

            {/* 진행률 정보 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">진행률</span>
                <span className="text-sm text-gray-600">
                  {banner.stats.completed}/{banner.stats.total} 완료
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colors.progress} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${banner.stats.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{banner.stats.percentage.toFixed(1)}% 완료</span>
                {banner.stats.inProgress > 0 && (
                  <span>{banner.stats.inProgress}개 진행 중</span>
                )}
              </div>
            </div>

            {/* 상태별 통계 */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">{banner.stats.completed}</p>
                <p className="text-xs text-gray-500">완료</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{banner.stats.inProgress}</p>
                <p className="text-xs text-gray-500">진행중</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {banner.stats.total - banner.stats.completed - banner.stats.inProgress}
                </p>
                <p className="text-xs text-gray-500">미시작</p>
              </div>
            </div>

            {/* 액션 버튼 */}
            <Button
              as={Link}
              href={banner.href}
              variant="primary"
              size="sm"
              fullWidth
              className={`${colors.button} text-white`}
            >
              {banner.stats.inProgress > 0 ? '이어서 학습하기' : '학습 시작하기'}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SubProgressBanner;
