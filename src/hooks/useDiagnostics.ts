// 진단 테스트 관련 커스텀 훅

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

export const useDiagnostics = () => {
  // 상태 관리
  const [eligibility, setEligibility] = useState<DiagnosticEligibilityResponse | null>(null);
  const [currentTest, setCurrentTest] = useState<DiagnosticStartResponse | null>(null);
  const [testStatus, setTestStatus] = useState<DiagnosticStatusResponse | null>(null);
  const [timeoutInfo, setTimeoutInfo] = useState<DiagnosticTimeoutResponse | null>(null);
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
    console.log('🔍 useDiagnostics - startDiagnostic 호출됨');
    console.log('👤 userId:', userId);
    console.log('📊 요청 데이터:', data);
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('📡 API 호출 시작...');
      const response = await apiClient.diagnostics.start(userId, data);
      console.log('📥 API 응답 받음:', response);
      
      // firstProblemId가 있으면 2-2 API 호출하여 문제 + 전체 문제 목록 가져오기
      if (response.firstProblemId) {
        console.log('🎯 첫 번째 문제 ID:', response.firstProblemId);
        try {
          // 2-2 API: 소단원별 첫 번째 문제 조회 (문제 + 전체 problemIds)
          const unitResponse = await apiClient.units.getFirstProblem('unit_001', userId);
          console.log('📚 2-2 API 응답:', unitResponse);
          
          // 문제 정보와 전체 문제 목록을 상태에 저장
          // TODO: 상태에 저장하는 로직 구현
        } catch (unitErr) {
          console.error('❌ 2-2 API 호출 실패:', unitErr);
          
          // 폴백: 기존 방식으로 첫 번째 문제만 로드
          try {
            const firstProblem = await apiClient.problems.getProblem(response.firstProblemId);
            console.log('📚 첫 번째 문제 로드 성공 (폴백):', firstProblem);
          } catch (problemErr) {
            console.error('❌ 첫 번째 문제 로드 실패 (폴백):', problemErr);
          }
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

  // 3. 진단 상태 조회
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

  // 4. 답안 제출
  const submitAnswer = useCallback(async (testId: string, userId: number, data: DiagnosticSubmitRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.diagnostics.submit(testId, userId, data);
      
      // 상태 업데이트
      if (testStatus) {
        setTestStatus({
          ...testStatus,
          answeredCount: response.answeredCount,
          remainingCount: response.remainingCount,
          currentProblemId: response.nextProblemId
        });
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

  // 5. 타임아웃 체크
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

  // 6. 상태 초기화
  const resetDiagnostics = useCallback(() => {
    setEligibility(null);
    setCurrentTest(null);
    setTestStatus(null);
    setTimeoutInfo(null);
    setError(null);
  }, []);

  // 7. 현재 테스트 상태 계산
  const getCurrentTestStatus = useCallback((): DiagnosticStatus => {
    if (!testStatus) return DiagnosticStatus.NOT_STARTED;
    
    if (testStatus.completed) return DiagnosticStatus.COMPLETED;
    if (timeoutInfo?.timedOut) return DiagnosticStatus.TIMED_OUT;
    if (testStatus.answeredCount > 0) return DiagnosticStatus.IN_PROGRESS;
    
    return DiagnosticStatus.NOT_STARTED;
  }, [testStatus, timeoutInfo]);

  // 8. 진행률 계산
  const getProgress = useCallback(() => {
    if (!testStatus) return 0;
    
    const total = testStatus.answeredCount + testStatus.remainingCount;
    return total > 0 ? Math.round((testStatus.answeredCount / total) * 100) : 0;
  }, [testStatus]);

  return {
    // 상태
    eligibility,
    currentTest,
    testStatus,
    timeoutInfo,
    loading,
    error,
    
    // 메서드
    checkEligibility,
    startDiagnostic,
    getTestStatus,
    submitAnswer,
    checkTimeout,
    resetDiagnostics,
    
    // 계산된 값
    currentTestStatus: getCurrentTestStatus(),
    progress: getProgress(),
    
    // 유틸리티
    isEligible: eligibility?.eligible ?? false,
    isTestInProgress: getCurrentTestStatus() === DiagnosticStatus.IN_PROGRESS,
    isTestCompleted: getCurrentTestStatus() === DiagnosticStatus.COMPLETED,
    isTestTimedOut: getCurrentTestStatus() === DiagnosticStatus.TIMED_OUT
  };
};
