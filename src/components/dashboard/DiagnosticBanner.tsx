import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';

const DiagnosticBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-300 to-sky-400 rounded-lg shadow-lg p-6 text-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <svg
              className="w-6 h-6 text-slate-700"
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
            <span className="text-sm font-medium text-slate-700">
              진단 결과
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">
            방금 제출하신 진단테스트 결과가 나왔어요!
          </h3>
          <p className="text-slate-700 mb-4">확인하러 가세요!</p>
          <div className="flex space-x-3">
            <Button
              as={Link}
              href="/diagnostic"
              variant="primary"
              className="bg-white text-gray-700  hover:bg-gray-100 shadow-md"
            >
              결과 확인하기
            </Button>
            <Button
              as={Link}
              href="/course"
              variant="ghost"
              className="text-slate-700 border-slate-700 hover:bg-white/20"
            >
              맞춤 학습하기
            </Button>
          </div>
        </div>
        <div className="hidden md:block ml-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-700"
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
};

export default DiagnosticBanner;
