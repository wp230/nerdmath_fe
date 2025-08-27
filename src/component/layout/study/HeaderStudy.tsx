'use client';

import Link from 'next/link';

export default function HeaderStudy() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-20">
      <div className="flex justify-between items-center py-2">
        {/* 텍스트 로고: 맨왼쪽 + 반응형 크기 */}
        <div className="flex items-center pl-2 sm:pl-4 lg:pl-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-DungGeunMo tracking-wide hover:text-blue-600 transition-colors">
              NerdMath
            </h1>
          </Link>
        </div>

        <div>여기에 선택한 대단원/소단원 이름 표시</div>
        <div>
          소단원 진행상황표시
          <div>소단원 진행바(개념or문제or어휘 중 하나 표시)</div>
          <div>소단원 진행률(퍼센트로 개념or문제or어휘 중 하나 표시)</div>
        </div>

        {/* 네비게이션: 우측 */}
        <nav className="flex space-x-2 sm:space-x-4 pr-2 sm:pr-4 lg:pr-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            홈
          </Link>
          <Link
            href="/diagnostics"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            진단 테스트
          </Link>
          <Link
            href="/voca"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            어휘 학습
          </Link>
          <Link
            href="/math"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            수학 학습
          </Link>
        </nav>
      </div>
    </header>
  );
}
