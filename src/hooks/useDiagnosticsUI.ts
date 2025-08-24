import { useState, useEffect } from 'react';
import { DiagnosticStartRequest } from '@/types/diagnostics';

export type DiagnosticStep = 'eligibility' | 'setup' | 'test' | 'complete';

export function useDiagnosticsUI() {
  const [currentStep, setCurrentStep] = useState<DiagnosticStep>('eligibility');
  const [userId] = useState(12345); // 임시 사용자 ID
  const [testData, setTestData] = useState<any>(null);
  
  // 진단 자격 확인 (Mock 데이터 사용)
  const handleEligibilityCheck = async () => {
    try {
      // Mock 응답으로 항상 자격 있음 처리
      const mockEligibility = { eligible: true, reason: null, existingTestId: null };
      if (mockEligibility.eligible) {
        setCurrentStep('setup');
      } else {
        alert(`진단 테스트를 이미 완료했습니다. ${mockEligibility.reason}`);
      }
    } catch (err) {
      console.error('자격 확인 실패:', err);
    }
  };

  // 진단 테스트 시작 (상태만 관리, API 호출은 부모에서)
  const handleTestStart = async (setupData: DiagnosticStartRequest) => {
    try {
      console.log('🚀 진단 테스트 시작 요청:', setupData);
      // testData는 부모 컴포넌트에서 설정됨
      setCurrentStep('test');
    } catch (err) {
      console.error('❌ 테스트 시작 실패:', err);
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
    console.log('🎉 테스트 완료 처리');
    setCurrentStep('complete');
  };

  // 테스트 타임아웃
  const handleTestTimeout = () => {
    alert('진단 테스트 시간이 만료되었습니다.');
    setCurrentStep('complete');
  };

  // 처음부터 다시 시작
  const handleRestart = () => {
    console.log('🔄 진단 테스트 재시작');
    setCurrentStep('eligibility');
    setTestData(null);
  };

  // 페이지 로드 시 자동으로 자격 확인
  useEffect(() => {
    handleEligibilityCheck();
  }, []);

  return {
    // 상태
    currentStep,
    testData,
    userId,
    loading: false, // API 훅에서 관리하지 않음
    error: null, // API 훅에서 관리하지 않음
    
    // 액션
    handleEligibilityCheck,
    handleTestStart,
    handleBack,
    handleTestComplete,
    handleTestTimeout,
    handleRestart,
    
    // 유틸리티
    canGoBack: currentStep === 'setup' || currentStep === 'test',
    isEligibilityStep: currentStep === 'eligibility',
    isSetupStep: currentStep === 'setup',
    isTestStep: currentStep === 'test',
    isCompleteStep: currentStep === 'complete'
  };
}
