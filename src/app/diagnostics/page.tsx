'use client';

import { useState, useEffect } from 'react';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { DiagnosticEligibility } from '@/components/diagnostics/DiagnosticEligibility';
import { DiagnosticSetup } from '@/components/diagnostics/DiagnosticSetup';
import { DiagnosticTest } from '@/components/diagnostics/DiagnosticTest';
import { DiagnosticStartRequest } from '@/types/diagnostics';

export default function DiagnosticsPage() {
  const [currentStep, setCurrentStep] = useState<'eligibility' | 'setup' | 'test' | 'complete'>('eligibility');
  const [userId] = useState(12345); // 임시 사용자 ID
  const [testData, setTestData] = useState<any>(null);
  
  const {
    checkEligibility,
    startDiagnostic,
    loading,
    error,
    resetDiagnostics
  } = useDiagnostics();

  // 진단 자격 확인
  const handleEligibilityCheck = async () => {
    try {
      const eligibility = await checkEligibility(userId);
      if (eligibility.eligible) {
        setCurrentStep('setup');
      } else {
        // 이미 완료된 경우 처리
        alert(`진단 테스트를 이미 완료했습니다. ${eligibility.reason}`);
      }
    } catch (err) {
      console.error('자격 확인 실패:', err);
    }
  };

  // 진단 테스트 시작
  const handleTestStart = async (setupData: DiagnosticStartRequest) => {
    try {
      const response = await startDiagnostic(userId, setupData);
      setTestData(response);
      setCurrentStep('test');
    } catch (err) {
      console.error('테스트 시작 실패:', err);
    }
  };

  // 뒤로 가기
  const handleBack = () => {
    if (currentStep === 'setup') {
      setCurrentStep('eligibility');
    } else if (currentStep === 'test') {
      setCurrentStep('setup');
    }
  };

  // 테스트 완료
  const handleTestComplete = () => {
    setCurrentStep('complete');
  };

  // 테스트 타임아웃
  const handleTestTimeout = () => {
    alert('진단 테스트 시간이 만료되었습니다.');
    setCurrentStep('complete');
  };

  // 처음부터 다시 시작
  const handleRestart = () => {
    resetDiagnostics();
    setCurrentStep('eligibility');
    setTestData(null);
  };

  // 페이지 로드 시 자동으로 자격 확인
  useEffect(() => {
    handleEligibilityCheck();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧮 수학 진단 테스트
          </h1>
          <div className="flex justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStep === 'eligibility' ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 'setup' ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 'test' ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 'complete' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* 뒤로 가기 버튼 */}
        {(currentStep === 'setup' || currentStep === 'test') && (
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
        {currentStep === 'eligibility' && (
          <DiagnosticEligibility 
            onCheck={handleEligibilityCheck}
            loading={loading}
            error={error}
          />
        )}

        {currentStep === 'setup' && (
          <DiagnosticSetup 
            onStart={handleTestStart}
            loading={loading}
            error={error}
          />
        )}

        {currentStep === 'test' && testData && (
          <DiagnosticTest 
            testData={testData}
            userId={userId}
            onComplete={handleTestComplete}
            onTimeout={handleTestTimeout}
          />
        )}

        {currentStep === 'complete' && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              진단 테스트가 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-6">
              수고하셨습니다. 진단 결과를 분석하여 맞춤형 학습 계획을 제공하겠습니다.
            </p>
            <button
              onClick={handleRestart}
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
      </div>
    </div>
  );
}
