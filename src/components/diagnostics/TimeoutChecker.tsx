'use client';

import React, { useEffect, useState } from 'react';
import { useTimeoutCheck } from '@/hooks/useDiagnostics';
import { useDiagnosticsStore } from '@/stores/diagnosticsStore';

interface TimeoutCheckerProps {
  testId: string;
  userId: number;
  onTimeout?: () => void;
}

export const TimeoutChecker: React.FC<TimeoutCheckerProps> = ({
  testId,
  userId,
  onTimeout,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const { data: timeoutData, isLoading } = useTimeoutCheck(testId, userId);
  const { completeTest } = useDiagnosticsStore();

  // 타임아웃 체크 및 경고 표시
  useEffect(() => {
    if (timeoutData) {
      if (timeoutData.timedOut) {
        // 타임아웃 발생
        const mockResult = {
          testId,
          userId,
          totalProblems: 20,
          correctAnswers: Math.floor(Math.random() * 20) + 5,
          incorrectAnswers: 0,
          score: 0,
          completedAt: new Date().toISOString(),
          durationMinutes: 30,
        };
        completeTest(mockResult);
        onTimeout?.();
      } else if (
        timeoutData.remainingMinutes &&
        timeoutData.remainingMinutes <= 5
      ) {
        // 5분 이하 남았을 때 경고 표시
        setShowWarning(true);
      }
    }
  }, [timeoutData, testId, userId, completeTest, onTimeout]);

  // 경고 메시지 자동 숨김
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 10000); // 10초 후 자동 숨김

      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  if (isLoading || !timeoutData) {
    return null;
  }

  if (timeoutData.timedOut) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
        <div className="flex items-center">
          <span className="text-red-500 mr-2">⏰</span>
          <span className="font-medium">진단 테스트가 타임아웃되었습니다.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 타임아웃 경고 */}
      {showWarning && (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">⚠️</span>
            <span className="font-medium">
              {timeoutData.remainingMinutes}분 남았습니다!
            </span>
          </div>
        </div>
      )}

      {/* 남은 시간 표시 */}
      {timeoutData.remainingMinutes !== undefined && (
        <div className="fixed top-4 left-4 bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded-lg shadow-lg z-40">
          <div className="flex items-center text-sm">
            <span className="text-blue-500 mr-2">⏱️</span>
            <span className="font-medium">
              {timeoutData.remainingMinutes}분 남음
            </span>
          </div>
        </div>
      )}
    </>
  );
};
