'use client';

import './globals.css';
import { Providers } from './providers';
import { useEffect } from 'react';
import { mockServiceManager } from '@/service/mockServiceManager';
import { MockServiceControlPanel } from '@/components/dev/MockServiceControlPanel';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // MockServiceManager 초기화
  useEffect(() => {
    // 로컬 스토리지에서 설정 로드
    mockServiceManager.loadConfigFromStorage();

    // 개발자 도구에서 상태 확인 가능하도록
    console.log('🚀 App initialized');
    console.log('🔧 MockServiceManager available at window.mockServiceManager');
    console.log('📋 Available commands:');
    console.log('  - window.enableGlobalMock()');
    console.log('  - window.disableGlobalMock()');
    console.log('  - window.enableAllMocks()');
    console.log('  - window.disableAllMocks()');
    console.log('  - window.mockServiceManager.logStatus()');

    // 초기 상태 로그
    mockServiceManager.logStatus();
  }, []);

  return (
    <html lang="ko">
      <head>
        {/* favicon 비활성화 - 404 에러 방지 */}
        <link rel="icon" href="data:," />
      </head>
      <body>
        <Providers>
          {/* 공통 헤더 - 모든 페이지에서 표시 */}
          <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="hover:opacity-80 transition-opacity"
                  >
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

          {/* 페이지 콘텐츠 */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* Mock 서비스 제어 패널 - 모든 페이지에서 표시 */}
          <MockServiceControlPanel />
        </Providers>
      </body>
    </html>
  );
}
