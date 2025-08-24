'use client';

import { useState } from 'react';

function TestStart() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGradeSelect = (grade: number | null) => {
    console.log('🔄 학년 선택 변경:', `${selectedGrade} → ${grade}`);
    setSelectedGrade(grade);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrade) {
      setError('학년을 선택해주세요.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    // 여기에 제출 로직 추가
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            진단 테스트 설정
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            진단테스트를 보는 사용자의 상태를 선택해주세요
          </p>
        </div>

        {/* 메인 카드 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 학년 선택 섹션 */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">학년 선택</h2>
                <p className="text-gray-600">해당하는 학년을 클릭하여 선택해주세요</p>
              </div>
              
              <div className="grid grid-cols-6 grid-rows-4 gap-3 w-full max-w-2xl mx-auto">
                {/* 중학교 1학년 */}
                <div 
                  className={`col-span-2 row-span-2 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGrade === 1 
                      ? 'ring-4 ring-blue-500 ring-offset-4 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleGradeSelect(1)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transition-all duration-300 ${
                    selectedGrade === 1 ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                  }`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                    <div className="text-4xl font-bold mb-2">1</div>
                    <div className="text-sm font-medium text-center leading-tight">중학교<br />1학년</div>
                  </div>
                  {selectedGrade === 1 && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* 중학교 2학년 */}
                <div 
                  className={`col-span-2 row-span-2 col-start-3 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGrade === 2 
                      ? 'ring-4 ring-green-500 ring-offset-4 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleGradeSelect(2)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 transition-all duration-300 ${
                    selectedGrade === 2 ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                  }`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                    <div className="text-4xl font-bold mb-2">2</div>
                    <div className="text-sm font-medium text-center leading-tight">중학교<br />2학년</div>
                  </div>
                  {selectedGrade === 2 && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* 중학교 3학년 */}
                <div 
                  className={`col-span-2 row-span-2 col-start-5 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGrade === 3 
                      ? 'ring-4 ring-purple-500 ring-offset-4 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleGradeSelect(3)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 transition-all duration-300 ${
                    selectedGrade === 3 ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                  }`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                    <div className="text-4xl font-bold mb-2">3</div>
                    <div className="text-sm font-medium text-center leading-tight">중학교<br />3학년</div>
                  </div>
                  {selectedGrade === 3 && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* 초등학교 */}
                <div 
                  className={`col-span-2 row-span-2 col-start-2 row-start-3 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGrade === null 
                      ? 'ring-4 ring-orange-500 ring-offset-4 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleGradeSelect(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 transition-all duration-300 ${
                    selectedGrade === null ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                  }`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                    <div className="text-3xl font-bold mb-2">🎒</div>
                    <div className="text-sm font-medium text-center leading-tight">초등학교</div>
                  </div>
                  {selectedGrade === null && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* 고등학교 및 성인 */}
                <div 
                  className={`col-span-2 row-span-2 col-start-4 row-start-3 group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGrade === null 
                      ? 'ring-4 ring-red-500 ring-offset-4 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleGradeSelect(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transition-all duration-300 ${
                    selectedGrade === null ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                  }`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
                    <div className="text-3xl font-bold mb-2">🎓</div>
                    <div className="text-sm font-medium text-center leading-tight">고등학교<br />및 성인</div>
                  </div>
                  {selectedGrade === null && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 진단 테스트 시작 버튼 */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!selectedGrade || isSubmitting || loading}
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-lg overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  {isSubmitting || loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      진단 테스트 시작 중...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      진단 테스트 시작
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function TestResult() {
  return <>
    <div className="flex justify-center pt-8 space-x-2">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          진단 테스트가 완료되었습니다!
        </h2>
        <p className="text-gray-600 mb-6">
          수고하셨습니다. 진단 결과를 분석하여 맞춤형 학습 계획을
          제공하겠습니다.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          처음부터 다시 시작
        </button>
      </div>
    </div>
  </>;
}

export default function TestPage() {
  return (
    <>
      <TestStart />
    </>
  );
}
