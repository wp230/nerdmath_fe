import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';

interface DiagnosticBannerProps {
  hasCompletedDiagnostic?: boolean;
  lastDiagnosticDate?: string;
}

const DiagnosticBanner: React.FC<DiagnosticBannerProps> = ({
  hasCompletedDiagnostic = false,
  lastDiagnosticDate,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 진단 테스트를 완료한 경우
  if (hasCompletedDiagnostic) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-6 h-6 text-white"
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
              <span className="text-sm font-medium text-white/90">진단 완료</span>
            </div>
            <h3 className="text-xl font-bold mb-2">진단 테스트 완료!</h3>
            <p className="text-white/80 mb-4">
              {lastDiagnosticDate ? (
                <>
                  마지막 진단: {formatDate(lastDiagnosticDate)}
                  <br />
                  주기적인 진단으로 실력 변화를 확인해보세요.
                </>
              ) : (
                '실력 진단이 완료되었습니다. 주기적인 진단으로 실력 변화를 확인해보세요.'
              )}
            </p>
            <div className="flex space-x-3">
              <Button
                as={Link}
                href="/diagnostic"
                variant="primary"
                className="bg-white text-emerald-600 hover:bg-gray-100"
              >
                재진단하기
              </Button>
              <Button
                as={Link}
                href="/course"
                variant="ghost"
                className="text-white border-white hover:bg-white/10"
              >
                맞춤 학습하기
              </Button>
            </div>
          </div>
          <div className="hidden md:block ml-6">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 진단 테스트를 아직 완료하지 않은 경우
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-white/90">진단 필요</span>
          </div>
          <h3 className="text-xl font-bold mb-2">실력 진단을 받아보세요!</h3>
          <p className="text-white/80 mb-4">
            현재 실력을 정확히 파악하고 맞춤형 학습 계획을 세워보세요.
            <br />
            약 15-20분 정도 소요됩니다.
          </p>
          <div className="flex space-x-3">
            <Button
              as={Link}
              href="/diagnostic"
              variant="primary"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              진단 테스트 시작
            </Button>
            <Button
              as={Link}
              href="/course"
              variant="ghost"
              className="text-white border-white hover:bg-white/10"
            >
              바로 학습하기
            </Button>
          </div>

          {/* 진단 테스트의 장점 */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-sm text-white/70 mb-2">진단 테스트 혜택:</p>
            <ul className="text-sm text-white/80 space-y-1">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>개인 맞춤형 학습 계획 제공</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>부족한 영역 정확한 분석</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>효율적인 학습 우선순위 설정</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:block ml-6">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticBanner;
