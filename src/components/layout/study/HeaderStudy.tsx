'use client';

import Link from 'next/link';

export default function HeaderStudy() {
  // 하드코딩된 예시 데이터
  const studyProgress = {
    majorName: '함수',
    minorName: '일차함수',
    progressType: 'concept',
    progressPercent: 75,
  };
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-20">
      <div className="flex justify-between items-center gap-4 sm:gap-6 lg:gap-8 py-2 sm:py-3 lg:py-4 px-4 sm:px-8 lg:px-12">
        {/* 좌측: 텍스트 로고 + 대단원/소단원 정보 */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-12">
          {/* 로고 */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-DungGeunMo tracking-wide hover:text-blue-600 transition-colors">
              NerdMath
            </h1>
          </Link>

          {/* 대단원/소단원 정보 + 진행상황 */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* 대단원/소단원 이름 */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
                {studyProgress.majorName}
              </h2>
              <h3 className="text-sm sm:text-md lg:text-lg text-gray-600">
                {studyProgress.minorName}
              </h3>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 pl-2 sm:pl-4 lg:pl-6">
              {/* 진행바 */}
              <div className="w-32 sm:w-40 lg:w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${studyProgress.progressPercent}%` }}
                ></div>
              </div>

              {/* 퍼센트 */}
              <span className="text-xs sm:text-sm lg:text-base font-bold text-blue-600 min-w-[2.5rem] sm:min-w-[3rem]">
                {studyProgress.progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* 네비게이션: 우측 */}
        <nav className="flex space-x-1 sm:space-x-2 lg:space-x-4">
          <Link
            href="/math"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            알림
          </Link>
          <Link
            href="/math"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            프로필
          </Link>
          <Link
            href="/math"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            로그아웃
          </Link>
        </nav>
      </div>
    </header>
  );
}
