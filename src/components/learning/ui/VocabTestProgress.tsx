import React from 'react';
import { VocabTestSet } from '@/types/learning';

interface VocabTestProgressProps {
  testData: VocabTestSet | undefined;
  progress: number;
  onComplete: () => void;
}

export const VocabTestProgress: React.FC<VocabTestProgressProps> = ({
  testData,
  progress,
  onComplete,
}) => {
  const isLoading = !testData;
  const totalProblems = testData?.testSet?.problems?.length || 0;
  const completedProblems = Math.round((progress / 100) * totalProblems);

  // 진행률에 따른 색상 결정
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 진행률에 따른 메시지
  const getProgressMessage = (progress: number) => {
    if (progress === 0) return '어휘 테스트를 시작해보세요!';
    if (progress < 50) return '차근차근 진행하고 있어요!';
    if (progress < 80) return '절반 이상 완료했어요!';
    if (progress < 100) return '거의 다 왔어요!';
    return '어휘 테스트 완료! 🎉';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
      {/* 헤더 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">어휘 테스트 진행률</h3>
        <p className="text-sm text-gray-500 mt-1">
          총 {totalProblems}문제 중 {completedProblems}문제 완료
        </p>
      </div>

      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>진행률</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 진행률 메시지 */}
      <div className="mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm text-center">
            {getProgressMessage(progress)}
          </p>
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">문제 목록</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {testData.testSet.problems.map((problem, index) => {
            const isCompleted = index < completedProblems;
            return (
              <div
                key={problem.problemId}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                  isCompleted
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span
                  className={`flex-1 truncate ${
                    isCompleted ? 'text-green-800' : 'text-gray-600'
                  }`}
                >
                  {problem.question.length > 20
                    ? `${problem.question.substring(0, 20)}...`
                    : problem.question}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 완료 버튼 */}
      {progress === 100 && (
        <button
          onClick={onComplete}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          어휘 테스트 완료! 🎉
        </button>
      )}

      {/* XP 정보 */}
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <h5 className="text-sm font-semibold text-purple-800 mb-1">
          XP 획득 정보
        </h5>
        <div className="text-xs text-purple-700 space-y-1">
          <div>✅ 정답: +5 XP</div>
          <div>❌ 오답: +3 XP</div>
          <div>🎯 완료 보너스: +10 XP</div>
        </div>
      </div>
    </div>
  );
};
