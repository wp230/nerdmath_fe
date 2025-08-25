import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto flex gap-6">
            {/* 왼쪽 메인 콘텐츠 */}
            <div className="flex-1 space-y-6 mt-12">
              {/* 추천학습 섹션 */}
              <div className="space-y-6">
                {/* 너드수학 웰컴 배너 */}
                <div className="relative flex items-center justify-between">
                  {/* 왼쪽 캐릭터 */}
                  <div className="flex-shrink-0">
                    <div className="text-5xl">👾</div>
                  </div>

                  {/* 중앙 말풍선 */}
                  <div className="flex-1 mx-6">
                    <div className="relative bg-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                      <div className="text-lg font-bold text-blue-800 font-DungGeunMo">
                        너드수학에 오신것을 환영합니다, 이제 우리 너드가
                        되어볼까요?
                      </div>
                      {/* 말풍선 꼬리 */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-100"></div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-16 mb-4 font-DungGeunMo">
                  RECOMMEND
                </div>
                {/* 진단테스트 결과 확인하러가기 */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="text-3xl mb-2">🔍</div>
                  <h3 className="text-xl font-bold mb-1 font-DungGeunMo">
                    진단테스트 결과 확인
                  </h3>
                  <p className="text-indigo-100 text-sm mb-3">
                    나의 학습 수준을 파악하고 맞춤형 학습을 시작해보세요
                  </p>
                  <Link href="/recommend">
                    <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-semibold hover:bg-white/30 transition-all duration-200">
                      <span>바로가기</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 오른쪽 사이드 콘텐츠 */}
            <div className="w-80 space-y-6 mt-12  ">
              <div>임시 학습버튼 바로가기</div>
              <div className="flex flex-col gap-2">
                <Link href="/math/unit_01">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    수와 연산
                  </div>
                </Link>
                <Link href="/math/unit_02">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    문자와 식
                  </div>
                </Link>
                <Link href="/math/unit_03">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    함수
                  </div>
                </Link>
                <Link href="/math/unit_04">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    확률과 통계
                  </div>
                </Link>
                <Link href="/math/unit_05">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    기하
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
