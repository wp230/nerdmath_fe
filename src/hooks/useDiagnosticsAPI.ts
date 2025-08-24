// 진단 테스트 API 통신 관련 커스텀 훅

import { useState, useCallback } from 'react';
import { apiClient, handleApiError } from '@/lib/api';
import {
  DiagnosticEligibilityResponse,
  DiagnosticStartRequest,
  DiagnosticStartResponse,
  DiagnosticStatusResponse,
  DiagnosticSubmitRequest,
  DiagnosticSubmitResponse,
  DiagnosticTimeoutResponse,
  DiagnosticStatus
} from '@/types/diagnostics';

export const useDiagnosticsAPI = () => {
  // 상태 관리
  const [eligibility, setEligibility] = useState<DiagnosticEligibilityResponse | null>(null);
  const [currentTest, setCurrentTest] = useState<DiagnosticStartResponse | null>(null);
  const [testStatus, setTestStatus] = useState<DiagnosticStatusResponse | null>(null);
  const [timeoutInfo, setTimeoutInfo] = useState<DiagnosticTimeoutResponse | null>(null);
  const [currentProblem, setCurrentProblem] = useState<any>(null); // 현재 문제 정보
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 진단 자격 확인
  const checkEligibility = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.diagnostics.checkEligibility(userId);
      setEligibility(response);
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. 진단 테스트 시작
  const startDiagnostic = useCallback(async (userId: number, data: DiagnosticStartRequest) => {
    console.log('🔍 useDiagnosticsAPI - startDiagnostic 호출됨');
    console.log('👤 userId:', userId);
    console.log('📊 요청 데이터:', data);
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('📡 1-2 API 호출 시작...');
      const response = await apiClient.diagnostics.start(userId, data);
      console.log('📥 1-2 API 응답 받음:', response);
      
      // firstProblemId가 있으면 2-1 API 호출하여 첫 번째 문제 조회
      if (response.firstProblemId) {
        console.log('🎯 첫 번째 문제 ID:', response.firstProblemId);
        try {
          // 2-1 API: 문제 단건 조회
          const problemResponse = await apiClient.problems.getProblem(response.firstProblemId);
          console.log('📚 2-1 API 응답 (첫 번째 문제):', problemResponse);
          
          // 현재 문제 정보 저장
          console.log('💾 currentProblem 상태 업데이트:', problemResponse);
          setCurrentProblem(problemResponse);
        } catch (problemErr) {
          console.error('❌ 2-1 API 호출 실패:', problemErr);
          throw problemErr;
        }
      } else {
        console.warn('⚠️ firstProblemId가 응답에 없습니다');
      }
      
      setCurrentTest(response);
      return response;
    } catch (err) {
      console.error('💥 API 호출 실패:', err);
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
      console.log('🏁 startDiagnostic 완료');
    }
  }, []);

  // 3. 문제 조회 (다음 문제로 진행할 때)
  const getProblem = useCallback(async (problemId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📚 2-1 API 호출 (문제 조회):', problemId);
      const response = await apiClient.problems.getProblem(problemId);
      console.log('📥 2-1 API 응답:', response);
      
      setCurrentProblem(response);
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. 진단 상태 조회
  const getTestStatus = useCallback(async (testId: string, userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.diagnostics.getStatus(testId, userId);
      setTestStatus(response);
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  // 5. 답안 제출
  const submitAnswer = useCallback(async (testId: string, userId: number, data: DiagnosticSubmitRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📝 1-4 API 호출 (답안 제출):', data);
      const response = await apiClient.diagnostics.submit(testId, userId, data);
      console.log('📥 1-4 API 응답:', response);
      
      // 상태 업데이트
      if (testStatus) {
        setTestStatus({
          ...testStatus,
          answeredCount: response.answeredCount,
          remainingCount: response.remainingCount,
          currentProblemId: response.nextProblemId || testStatus.currentProblemId
        });
      }
      
      // 다음 문제가 있으면 자동으로 로드
      if (response.nextProblemId) {
        console.log('🔄 다음 문제 자동 로드:', response.nextProblemId);
        try {
          const nextProblem = await apiClient.problems.getProblem(response.nextProblemId);
          setCurrentProblem(nextProblem);
        } catch (nextProblemErr) {
          console.error('❌ 다음 문제 로드 실패:', nextProblemErr);
        }
      }
      
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [testStatus]);

  // 6. 타임아웃 체크
  const checkTimeout = useCallback(async (testId: string, userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.diagnostics.checkTimeout(testId, userId);
      setTimeoutInfo(response);
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  // 7. 상태 초기화
  const resetDiagnostics = useCallback(() => {
    setEligibility(null);
    setCurrentTest(null);
    setTestStatus(null);
    setTimeoutInfo(null);
    setCurrentProblem(null);
    setError(null);
  }, []);

  // 8. 현재 테스트 상태 계산
  const getCurrentTestStatus = useCallback((): DiagnosticStatus => {
    if (!testStatus) return DiagnosticStatus.NOT_STARTED;
    
    if (testStatus.completed) return DiagnosticStatus.COMPLETED;
    if (timeoutInfo?.timedOut) return DiagnosticStatus.TIMED_OUT;
    if (testStatus.answeredCount > 0) return DiagnosticStatus.IN_PROGRESS;
    
    return DiagnosticStatus.NOT_STARTED;
  }, [testStatus, timeoutInfo]);

  // 9. 진행률 계산
  const getProgress = useCallback(() => {
    if (!testStatus) return 0;
    
    const total = testStatus.answeredCount + testStatus.remainingCount;
    return total > 0 ? Math.round((testStatus.answeredCount / total) * 100) : 0;
  }, [testStatus]);

  // 10. 테스트 완료 여부 확인
  const isTestCompleted = useCallback(() => {
    if (!currentTest || !testStatus) return false;
    
    // answeredCount가 totalProblems에 도달했는지 확인
    return testStatus.answeredCount >= currentTest.totalProblems;
  }, [currentTest, testStatus]);

  return {
    // 상태
    eligibility,
    currentTest,
    testStatus,
    timeoutInfo,
    currentProblem,
    loading,
    error,
    
    // 메서드
    checkEligibility,
    startDiagnostic,
    getProblem,
    getTestStatus,
    submitAnswer,
    checkTimeout,
    resetDiagnostics,
    
    // 계산된 값
    currentTestStatus: getCurrentTestStatus(),
    progress: getProgress(),
    isCompleted: isTestCompleted(),
    
    // 유틸리티
    isEligible: eligibility?.eligible ?? false,
    isTestInProgress: getCurrentTestStatus() === DiagnosticStatus.IN_PROGRESS,
    isTestCompleted: getCurrentTestStatus() === DiagnosticStatus.COMPLETED,
    isTestTimedOut: getCurrentTestStatus() === DiagnosticStatus.TIMED_OUT
  };
};
