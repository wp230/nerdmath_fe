'use client';

import React from 'react';
import { DiagnosticResult } from '@/types/diagnostics';

interface TestResultProps {
  result: DiagnosticResult;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
  result,
  onRetry,
  onGoHome,
}) => {
  const score = Math.round(
    (result.correctAnswers / result.totalProblems) * 100
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '훌륭합니다!';
    if (score >= 80) return '잘 했습니다!';
    if (score >= 70) return '좋습니다!';
    if (score >= 60) return '보통입니다.';
    return '더 노력해보세요.';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          진단 테스트 완료!
        </h2>
        <p className="text-gray-600">
          {getScoreMessage(score)} 결과를 확인해보세요.
        </p>
      </div>

      {/* 점수 표시 */}
      <div className="text-center mb-8">
        <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
          {score}점
        </div>
        <div className="text-lg text-gray-600">
          {result.correctAnswers} / {result.totalProblems} 문제 정답
        </div>
      </div>

      {/* 상세 결과 */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">상세 결과</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {result.correctAnswers}
            </div>
            <div className="text-sm text-gray-600">정답</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {result.incorrectAnswers}
            </div>
            <div className="text-sm text-gray-600">오답</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">소요 시간:</span>
            <span className="font-medium">{result.durationMinutes}분</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">완료 시간:</span>
            <span className="font-medium">
              {new Date(result.completedAt).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      </div>

      {/* 성취도 표시 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">성취도</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">정답률</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(result.correctAnswers / result.totalProblems) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-12 text-right">
                {Math.round(
                  (result.correctAnswers / result.totalProblems) * 100
                )}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex space-x-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            다시 테스트하기
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            홈으로 돌아가기
          </button>
        )}
      </div>

      {/* 추가 정보 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          💡 진단 결과를 바탕으로 개인 맞춤 학습을 진행할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
