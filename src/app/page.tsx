import Link from 'next/link';

export function Background() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Mathematical symbols layer */}
      <div className="absolute inset-0 opacity-30">
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
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-32 left-16 w-16 h-16 border-2 border-blue-400 rounded-lg transform rotate-45 animate-float-math"></div>
        <div className="absolute top-48 right-32 w-12 h-12 border-2 border-cyan-400 rounded-full animate-float-math-delayed"></div>
        <div className="absolute bottom-48 left-32 w-20 h-20 border-2 border-purple-400 transform rotate-12 animate-float-math-slow"></div>
        <div className="absolute bottom-32 right-16 w-14 h-14 border-2 border-green-400 rounded-lg transform -rotate-45 animate-float-math-delayed"></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* 히어로 섹션 */}
        
        <section className="text-center mt-16 mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 font-DungGeunMo drop-shadow-lg">
            수학, 한계를 넘어서 세계로
          </h1>
          <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
            영어 기반 수학 학습 플랫폼{' '}
            <span className="font-bold text-blue-300">NerdMath</span>에서
            <br />
            글로벌 수학 사고력과 진짜 실력을 키워보세요.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/diagnostics" className="btn-primary text-lg px-8 py-4">
              시작하기
            </Link>
          </div>
        </section>

        {/* 특징 섹션 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-white/30 hover:bg-white/100 transition-all duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              정확한 진단
            </h3>
            <p className="text-gray-600">
              AI 알고리즘을 통해 현재 수학 실력을 정확하게 파악합니다
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-white/30 hover:bg-white/100 transition-all duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              맞춤형 분석
            </h3>
            <p className="text-gray-600">
              개인의 강점과 약점을 분석하여 최적의 학습 계획을 제시합니다
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-white/30 hover:bg-white/100 transition-all duration-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              효율적 학습
            </h3>
            <p className="text-gray-600">
              불필요한 반복을 줄이고 핵심 개념에 집중할 수 있습니다
            </p>
          </div>
        </div>

        {/* 진단 과정 설명 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/30">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            진단 테스트 과정
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">테스트 설정</h4>
              <p className="text-sm text-gray-600">학년 범위 설정</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">문제 풀이</h4>
              <p className="text-sm text-gray-600">
                제한 시간 내 문제 풀이 진행
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">결과 분석</h4>
              <p className="text-sm text-gray-600">
                상세한 분석 결과와 학습 가이드
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
