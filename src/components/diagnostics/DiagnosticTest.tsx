/**
 * DiagnosticTest 컴포넌트
 * 
 * 책임: 진단 테스트 문제 표시 및 답안 수집
 * - 답안 제출 및 다음 문제 자동 로드
 * - 타이머 관리 및 타임아웃 처리
 * - 진행 상황 실시간 업데이트
 * 
 * Props:
 * - testData: 테스트 시작 응답 데이터 (DiagnosticStartResponse)
 * - userId: 사용자 ID
 * - onComplete: 테스트 완료 콜백
 * - onTimeout: 타임아웃 콜백
 * 
 * 주요 상태:
 * - currentProblem: 현재 문제 데이터
 * - userAnswer: 사용자 답안
 * - timeRemaining: 남은 시간 (30분 제한)
 * - answeredCount: 답변 완료된 문제 수
 * - remainingCount: 남은 문제 수
 * 
 * API 호출:
 * - 문제 조회: GET /v1/problems/{problemId}
 * - 답안 제출: POST /v1/diagnostics/{testId}/submit
 */

'use client';

import { useState, useEffect } from 'react';
import { useDiagnostics } from '@/hooks/useDiagnostics';
import { DiagnosticStartResponse, DiagnosticSubmitRequest, Problem } from '@/types/diagnostics';
import { apiClient } from '@/lib/api';

interface DiagnosticTestProps {
  testData: DiagnosticStartResponse;
  userId: number;
  onComplete: () => void;
  onTimeout: () => void;
}

export const DiagnosticTest = ({ testData, userId, onComplete, onTimeout }: DiagnosticTestProps) => {
  const { submitAnswer, getTestStatus, checkTimeout, loading, error: hookError } = useDiagnostics();
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30분
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProblemId, setCurrentProblemId] = useState(testData.firstProblemId);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(testData.totalProblems);
  const [error, setError] = useState<string | null>(null);

  // 첫 번째 문제 로드
  useEffect(() => {
    loadProblem(testData.firstProblemId);
  }, [testData.firstProblemId]);

  // 문제 로드 함수
  const loadProblem = async (problemId: string) => {
    try {
      console.log('🌐 문제 로드:', problemId);
      const problem = await apiClient.problems.getProblem(problemId);
      
      setCurrentProblem(problem);
      setCurrentProblemId(problemId);
      setError(null);
      
      console.log('📚 문제 로드 완료:', problem);
    } catch (err) {
      console.error('문제 로드 실패:', err);
      setError('문제를 불러오는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  // 타임아웃 체크
  useEffect(() => {
    const timeoutCheck = setInterval(async () => {
      try {
        const timeoutResponse = await checkTimeout(testData.testId, userId);
        if (timeoutResponse.timedOut) {
          onTimeout();
        }
      } catch (err) {
        console.error('타임아웃 체크 실패:', err);
      }
    }, 60000); // 1분마다 체크

    return () => clearInterval(timeoutCheck);
  }, [testData.testId, userId, checkTimeout, onTimeout]);

  // 수동 타임아웃 체크 (테스트용)
  const handleManualTimeoutCheck = async () => {
    try {
      console.log('⏰ 수동 타임아웃 체크 시작');
      console.log('📝 testId:', testData.testId);
      console.log('👤 userId:', userId);
      
      const timeoutResponse = await checkTimeout(testData.testId, userId);
      
      console.log('✅ 타임아웃 체크 응답:', timeoutResponse);
      
      if (timeoutResponse.timedOut) {
        console.log('⏰ 타임아웃 발생!');
        onTimeout();
      } else {
        console.log('⏰ 정상 진행 중:', timeoutResponse.remainingMinutes, '분 남음');
      }
    } catch (err) {
      console.error('❌ 수동 타임아웃 체크 실패:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !currentProblem) return;

    setIsSubmitting(true);
    try {
      console.log('🎯 답안 제출 시작');
      console.log('👤 userId:', userId);
      console.log('📝 testId:', testData.testId);
      console.log('❓ currentProblem:', currentProblem);
      
      const submitData: DiagnosticSubmitRequest = {
        problemId: currentProblem.problemId,
        userAnswer: { value: userAnswer },
        durationSeconds: 30 * 60 - timeRemaining // 임시로 계산
      };
      
      console.log('📤 제출할 데이터:', submitData);
      console.log('🌐 API 호출: submitAnswer()');

      const response = await submitAnswer(testData.testId, userId, submitData);
      
      console.log('✅ API 응답 성공:', response);
      
      // 진행 상황 업데이트
      setAnsweredCount(response.answeredCount);
      setRemainingCount(response.remainingCount);
      
      if (response.remainingCount === 0) {
        console.log('🎉 모든 문제 완료!');
        onComplete();
      } else if (response.nextProblemId) {
        console.log('🔄 다음 문제로 이동:', response.nextProblemId);
        // 다음 문제로 이동
        setUserAnswer('');
        await loadProblem(response.nextProblemId);
      }
    } catch (err) {
      console.error('❌ 답안 제출 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 문제가 로드되지 않았거나 로딩 중인 경우
  if (!currentProblem || !currentProblem.content) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">문제를 불러오는 중...</p>
          {error && (
            <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">진단 테스트</h2>
          <p className="text-sm text-gray-600">
            진행률: {answeredCount + 1}/{testData.totalProblems}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-red-600">
            {formatTime(timeRemaining)}
          </div>
          <div className="text-xs text-gray-500">남은 시간</div>
          {/* 타임아웃 체크 테스트 버튼 */}
          <button
            onClick={handleManualTimeoutCheck}
            className="mt-2 px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            ⏰ 타임아웃 체크
          </button>
        </div>
      </div>

      {/* 문제 정보 */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex flex-wrap gap-2 text-xs text-blue-700">
          <span>학년: {currentProblem.grade}</span>
          <span>•</span>
          <span>단원: {currentProblem.chapter}</span>
          <span>•</span>
          <span>유형: {currentProblem.cognitiveType}</span>
          <span>•</span>
          <span>난이도: {currentProblem.level}</span>
          <span>•</span>
          <span>문제유형: {currentProblem.type}</span>
        </div>
      </div>

      {/* 문제 내용 */}
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">문제</h3>
          <p className="text-gray-700">{currentProblem.content.stem?.text || '문제 내용을 불러올 수 없습니다.'}</p>
        </div>

        {/* 이미지가 있는 경우 */}
        {currentProblem.imageUrl && (
          <div className="mb-4 text-center">
            <img 
              src={currentProblem.imageUrl} 
              alt="문제 이미지" 
              className="max-w-full h-auto rounded-lg border"
            />
          </div>
        )}

        {/* 객관식 선택지 */}
        {currentProblem.content.choices && currentProblem.content.choices.length > 0 && (
          <div className="space-y-2">
            {currentProblem.content.choices.map((choice) => (
              <label
                key={choice.key}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="answer"
                  value={choice.text}
                  checked={userAnswer === choice.text}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {choice.key}. {choice.text}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* 주관식 답안 입력 */}
        {(!currentProblem.content.choices || currentProblem.content.choices.length === 0) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              답안
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="답을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
      </div>

      {/* 답안 제출 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={!userAnswer.trim() || isSubmitting || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting || loading ? '제출 중...' : '답안 제출'}
        </button>
      </form>

      {/* 에러 메시지 */}
      {(error || hookError) && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mt-4">
          {error || hookError}
        </div>
      )}

      {/* 진행 상황 */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <span>시작 시간: {new Date(testData.startedAt).toLocaleTimeString()}</span>
          <span>총 문제: {testData.totalProblems}문제</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>답변 완료: {answeredCount}문제</span>
          <span>남은 문제: {remainingCount}문제</span>
        </div>
      </div>
    </div>
  );
};
