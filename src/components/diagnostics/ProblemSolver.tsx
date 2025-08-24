'use client';

import React, { useState } from 'react';
import { Problem, AnswerSubmitRequest } from '@/types/diagnostics';
import { useMockProblem } from '@/hooks/useDiagnostics';
import { useDiagnosticsStore } from '@/stores/diagnosticsStore';

interface ProblemSolverProps {
  problemId: string;
  onAnswerSubmit: (answer: AnswerSubmitRequest) => void;
  isLoading?: boolean;
  answeredCount: number;
  totalProblems: number;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  problemId,
  onAnswerSubmit,
  isLoading = false,
  answeredCount,
  totalProblems,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 전체 세션 시간 가져오기
  const { totalSessionTime } = useDiagnosticsStore();

  const { data: problem, isLoading: problemLoading } =
    useMockProblem(problemId);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || !problem) return;

    setIsSubmitting(true);

    const answerData: AnswerSubmitRequest = {
      problemId: problem.id,
      userAnswer: { value: selectedAnswer },
      durationSeconds: 0, // 개별 문제 시간은 사용하지 않음
    };

    try {
      await onAnswerSubmit(answerData);
      setSelectedAnswer('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (problemLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center text-gray-500">
          문제를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 진행률 표시 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            문제 {answeredCount + 1} / {totalProblems}
          </span>
          <span className="text-sm text-gray-600">
            전체 세션 시간: {Math.floor(totalSessionTime / 60)}:
            {(totalSessionTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((answeredCount + 1) / totalProblems) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 문제 내용 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {problem.content}
        </h3>

        {problem.type === 'multiple-choice' && problem.options && (
          <div className="space-y-3">
            {problem.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 답안 제출 버튼 */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setSelectedAnswer('');
          }}
          disabled={isSubmitting || isLoading}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          초기화
        </button>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting || isLoading}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedAnswer && !isSubmitting && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? '제출 중...' : '답안 제출'}
        </button>
      </div>

      {/* 힌트 */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 답안을 선택한 후 제출 버튼을 클릭하세요.
          {answeredCount + 1 < totalProblems
            ? ' 다음 문제로 진행됩니다.'
            : ' 마지막 문제입니다.'}
        </p>
      </div>
    </div>
  );
};
