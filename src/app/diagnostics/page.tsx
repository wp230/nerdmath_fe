'use client';

import { useState } from 'react';
import { DiagnosticEligibility } from '@/components/diagnostics/DiagnosticEligibility';
import { DiagnosticSetup } from '@/components/diagnostics/DiagnosticSetup';
import { DiagnosticTest } from '@/components/diagnostics/DiagnosticTest';
import { useDiagnosticsUI } from '@/hooks/useDiagnosticsUI';
import { useDiagnosticsAPI } from '@/hooks/useDiagnosticsAPI';
import { DiagnosticStartRequest } from '@/types/diagnostics';

export default function DiagnosticsPage() {
  // testData를 페이지에서 직접 관리
  const [testData, setTestData] = useState<any>(null);
  
  const {
    currentStep,
    userId,
    loading,
    error,
    handleEligibilityCheck,
    handleTestStart: uiHandleTestStart,
    handleBack,
    handleTestComplete,
    handleTestTimeout,
    handleRestart,
    canGoBack,
    isEligibilityStep,
    isSetupStep,
    isTestStep,
    isCompleteStep
  } = useDiagnosticsUI();

  // API 훅을 직접 사용하여 상태 공유
  const {
    currentProblem,
    submitAnswer,
    getTestStatus,
    checkTimeout,
    isCompleted,
    startDiagnostic
  } = useDiagnosticsAPI();

  // 진단 테스트 시작 처리 (API 호출 + UI 상태 업데이트)
  const handleTestStart = async (setupData: DiagnosticStartRequest) => {
    try {
      console.log('🚀 페이지에서 진단 테스트 시작:', setupData);
      const response = await startDiagnostic(userId, setupData);
      console.log('✅ 진단 테스트 시작 성공:', response);
      
      // testData 설정 (API 응답으로)
      setTestData(response);
      
      // UI 상태 업데이트
      uiHandleTestStart(setupData);
    } catch (err) {
      console.error('❌ 진단 테스트 시작 실패:', err);
    }
  };

  // 처음부터 다시 시작
  const handleRestartClick = () => {
    console.log('🔄 진단 테스트 재시작');
    setTestData(null); // testData 초기화
    handleRestart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-DungGeunMo">
            수학 진단 테스트
          </h1>
          {/* 진행 확인 점 */}
          <div className="flex justify-center pt-8 space-x-2">
            <div className={`w-3 h-3 rounded-full ${isEligibilityStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${isSetupStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${isTestStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${isCompleteStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* 뒤로 가기 버튼 */}
        {canGoBack && (
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              뒤로 가기
            </button>
          </div>
        )}

        {/* 단계별 컴포넌트 */}
        {isEligibilityStep && (
          <DiagnosticEligibility 
            onCheck={handleEligibilityCheck}
            loading={loading}
            error={error}
          />
        )}

        {isSetupStep && (
          <DiagnosticSetup 
            onStart={handleTestStart}
            loading={loading}
            error={error}
          />
        )}

        {isTestStep && testData && (
          <DiagnosticTest 
            testData={testData}
            userId={userId}
            currentProblem={currentProblem}
            submitAnswer={submitAnswer}
            getTestStatus={getTestStatus}
            checkTimeout={checkTimeout}
            isCompleted={isCompleted}
            onComplete={handleTestComplete}
            onTimeout={handleTestTimeout}
          />
        )}

        {isCompleteStep && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              진단 테스트가 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-6">
              수고하셨습니다. 진단 결과를 분석하여 맞춤형 학습 계획을 제공하겠습니다.
            </p>
            <button
              onClick={handleRestartClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              처음부터 다시 시작
            </button>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center mt-4">
            {error}
          </div>
        )}

        {/* 디버그 정보 (개발용) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
            <h3 className="font-bold mb-2">디버그 정보:</h3>
            <div>현재 단계: {currentStep}</div>
            <div>테스트 완료: {isCompleted ? '예' : '아니오'}</div>
            <div>현재 문제: {currentProblem ? '로드됨' : '없음'}</div>
            <div>테스트 데이터: {testData ? '있음' : '없음'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
