import '../globals.css';
import Link from 'next/link';
import { Providers } from '@/components/common';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                    href="/diagnostic"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    진단 테스트
                  </Link>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="text-white bg-gray-900 shover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    회원가입
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* 페이지 콘텐츠 */}
          <main className="flex-1 relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
