import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🧮 수학 진단 테스트
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI 기반 개인 맞춤형 수학 학습을 위한 진단 테스트 시스템입니다.
            <br />
            현재 실력을 정확히 파악하고 효율적인 학습 경로를 제시합니다.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/diagnostics"
              className="btn-primary text-lg px-8 py-4"
            >
              🚀 진단 테스트 시작하기
            </Link>
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg">
              📚 학습 가이드 보기
            </button>
          </div>
        </div>

        {/* 특징 섹션 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              정확한 진단
            </h3>
            <p className="text-gray-600">
              AI 알고리즘을 통해 현재 수학 실력을 정확하게 파악합니다
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              맞춤형 분석
            </h3>
            <p className="text-gray-600">
              개인의 강점과 약점을 분석하여 최적의 학습 계획을 제시합니다
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            진단 테스트 과정
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">자격 확인</h4>
              <p className="text-sm text-gray-600">진단 테스트 진행 가능 여부 확인</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">테스트 설정</h4>
              <p className="text-sm text-gray-600">학년 범위 설정</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">문제 풀이</h4>
              <p className="text-sm text-gray-600">제한 시간 내 문제 풀이 진행</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">결과 분석</h4>
              <p className="text-sm text-gray-600">상세한 분석 결과와 학습 가이드</p>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 시작해보세요!
            </h2>
            <p className="text-xl mb-6 opacity-90">
              단 30분만에 수학 실력을 정확히 파악하고 맞춤형 학습을 시작할 수 있습니다
            </p>
            <Link
              href="/diagnostics"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              🧮 무료 진단 테스트 시작하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
  