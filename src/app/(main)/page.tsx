import React from 'react';
import Link from 'next/link';

export function Background() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Mathematical symbols layer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl text-blue-400 font-mono animate-pulse">
          ∫
        </div>
        <div
          className="absolute top-20 right-20 text-5xl text-cyan-400 font-mono animate-pulse"
          style={{ animationDelay: '1s' }}
        >
          ∑
        </div>
        <div
          className="absolute top-40 left-1/4 text-4xl text-purple-400 font-mono animate-pulse"
          style={{ animationDelay: '2s' }}
        >
          π
        </div>
        <div
          className="absolute top-60 right-1/3 text-5xl text-green-400 font-mono animate-pulse"
          style={{ animationDelay: '3s' }}
        >
          ∞
        </div>
        <div
          className="absolute bottom-40 left-20 text-6xl text-pink-400 font-mono animate-pulse"
          style={{ animationDelay: '4s' }}
        >
          √
        </div>
        <div
          className="absolute bottom-20 right-10 text-4xl text-yellow-400 font-mono animate-pulse"
          style={{ animationDelay: '5s' }}
        >
          θ
        </div>
        <div
          className="absolute bottom-60 left-1/3 text-5xl text-indigo-400 font-mono animate-pulse"
          style={{ animationDelay: '6s' }}
        >
          Δ
        </div>
      </div>

      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-32 left-16 w-16 h-16 border-2 border-blue-400 rounded-lg transform rotate-45 animate-float-math"></div>
        <div className="absolute top-48 right-32 w-12 h-12 border-2 border-cyan-400 rounded-full animate-float-math-delayed"></div>
        <div className="absolute bottom-48 left-32 w-20 h-20 border-2 border-purple-400 transform rotate-12 animate-float-math-slow"></div>
        <div className="absolute bottom-32 right-16 w-14 h-14 border-2 border-green-400 rounded-lg transform -rotate-45 animate-float-math-delayed"></div>
      </div>

      {/* Circuit-like connections */}
      <div className="absolute inset-0 opacity-15">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M10,20 Q30,10 50,20 T90,20"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M20,80 Q40,70 60,80 T100,80"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Background />
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-transparent">
        {/* Content starts here */}
        {/* Hero Section */}
        <section className="w-full max-w-4xl text-center mt-20 mb-20 relative z-10">
          <h2 className="text-5xl font-extrabold text-white font-DungGeunMo mb-6 tracking-tight">
            수학, 한계를 넘어 세계로
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            영어 기반 수학 학습 플랫폼{' '}
            <span className="font-bold text-blue-300">NerdMath</span>에서
            <br />
            글로벌 수학 사고력과 진짜 실력을 키워보세요.
          </p>
          <a
            href="/diagnostic"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            지금 시작하기
          </a>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-15 mb-24 relative z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-20 h-20 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-DungGeunMo font-bold">
                개념
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 font-DungGeunMo">
              개념을 영어로!
            </h3>
            <p className="text-gray-600 text-center">
              한자 용어에 갇히지 않고, 영어로 수학 개념을 정확히 이해합니다.
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-20 h-20 mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-2xl font-DungGeunMo font-bold">
                문제
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 font-DungGeunMo">
              문제로 사고력을!
            </h3>
            <p className="text-gray-600 text-center">
              해외 교과서 기반 응용 문제로 수학적 사고력을 기릅니다.
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-20 h-20 mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl font-DungGeunMo font-bold">
                어휘
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 font-DungGeunMo">
              어휘로 소통력을!
            </h3>
            <p className="text-gray-600 text-center">
              수학 영어 표현을 배워 글로벌 수학 소통 실력을 키웁니다.
            </p>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white/95 backdrop-blur-sm border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2024 NerdMath. All rights reserved.</p>
            <p className="mt-1">개인 맞춤형 수학 학습을 위한 AI 기반 시스템</p>
          </div>
        </div>
      </footer>
    </>
  );
}
