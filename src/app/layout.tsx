import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "수학 진단 테스트 시스템",
  description: "개인 맞춤형 수학 학습을 위한 진단 테스트 시스템",
  keywords: ["수학", "진단", "학습", "교육", "문제풀이"],
  authors: [{ name: "Math Learning Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen">
          {/* 헤더 */}
          <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <h1 className="text-4xl font-bold text-gray-900 font-DungGeunMo">
                    NerdMath
                  </h1>
                </div>
                <nav className="flex space-x-4">
                  <a
                    href="/"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    홈
                  </a>
                  <a
                    href="/diagnostics"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    진단 테스트
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 relative z-10">
            {children}
          </main>

          {/* 푸터 */}
          <footer className="bg-white/95 backdrop-blur-sm border-t border-white/20 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-gray-600 text-sm">
                <p>&copy; 2024 수학 진단 테스트 시스템. All rights reserved.</p>
                <p className="mt-1">개인 맞춤형 학습을 위한 AI 기반 진단 시스템</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
