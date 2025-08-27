'use client';

import Link from 'next/link';

export default function HeaderStudy() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-4xl font-bold text-gray-900 font-DungGeunMo">
                NerdMath
              </h1>
            </Link>
          </div>
          <nav className="flex space-x-4">
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
      </div>
    </header>
  );
}
