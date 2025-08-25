import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            수학 학습의 새로운 시작
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI 기반 진단 테스트로 개인 맞춤형 학습을 경험해보세요. 어휘, 개념,
            문제 풀이를 통합적으로 학습할 수 있습니다.
          </p>

          {/* 주요 기능 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                진단 테스트
              </h3>
              <p className="text-gray-600 mb-6">
                현재 수학 실력을 정확히 파악하고 맞춤형 학습 계획을 세워보세요.
              </p>
              <Link
                href="/diagnostics"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                시작하기
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                어휘 학습
              </h3>
              <p className="text-gray-600 mb-6">
                수학 용어와 개념을 체계적으로 학습하고 어휘력을 향상시켜보세요.
              </p>
              <Link
                href="/voca"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                시작하기
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                수학 학습
              </h3>
              <p className="text-gray-600 mb-6">
                개념 이해부터 문제 풀이까지 단계별로 체계적인 학습을
                진행해보세요.
              </p>
              <Link
                href="/math"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                시작하기
              </Link>
            </div>
          </div>

          {/* 개발자 정보 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🔧 개발자 도구
            </h3>
            <p className="text-gray-600 mb-4">
              Mock 서비스 제어가 필요하시다면 우측 하단의 설정 아이콘을
              클릭하세요.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                • Console에서 직접 제어:{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  window.enableGlobalMock()
                </code>
              </p>
              <p>
                • 상태 확인:{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  window.mockServiceManager.logStatus()
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-white/95 backdrop-blur-sm border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2024 NerdMath. All rights reserved.</p>
            <p className="mt-1">개인 맞춤형 수학 학습을 위한 AI 기반 시스템</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
