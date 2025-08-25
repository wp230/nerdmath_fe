import React from 'react';

interface ProblemProgressProps {
  progress: number;
  totalProblems: number;
  currentIndex: number;
}

export const ProblemProgress: React.FC<ProblemProgressProps> = ({
  progress,
  totalProblems,
  currentIndex,
}) => {
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
    if (progress === 0) return '실전 문제를 시작해보세요!';
    if (progress < 30) return '첫 문제를 풀어보고 있어요!';
    if (progress < 60) return '차근차근 진행하고 있어요!';
    if (progress < 80) return '절반 이상 완료했어요!';
    if (progress < 100) return '거의 다 왔어요!';
    return '모든 문제 완료! 🎉';
  };

  // 현재 문제 정보
  const getCurrentProblemInfo = () => {
    if (totalProblems === 0) return { current: 0, total: 0 };
    return { current: currentIndex + 1, total: totalProblems };
  };

  const { current, total } = getCurrentProblemInfo();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
      {/* 헤더 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">실전 문제 진행률</h3>
        <p className="text-sm text-gray-500 mt-1">
          문제 {current} / {total}
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

      {/* 문제 네비게이션 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          문제 네비게이션
        </h4>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: total }, (_, index) => {
            const isCompleted = index < completedProblems;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isCurrent
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                disabled={isCurrent}
              >
                {isCompleted ? '✓' : index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* 문제 통계 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">문제 통계</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">완료된 문제</span>
            <span className="font-medium text-green-600">
              {completedProblems}개
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">남은 문제</span>
            <span className="font-medium text-blue-600">
              {total - completedProblems}개
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">현재 문제</span>
            <span className="font-medium text-purple-600">{current}번</span>
          </div>
        </div>
      </div>

      {/* XP 정보 */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="text-sm font-semibold text-blue-800 mb-1">
          XP 획득 정보
        </h5>
        <div className="text-xs text-blue-700 space-y-1">
          <div>✅ 정답: +15 XP</div>
          <div>❌ 오답: +10 XP</div>
          <div>🎯 완료 보너스: +10 XP</div>
        </div>
      </div>

      {/* 완료 시 보너스 정보 */}
      {progress === 100 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-center">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-yellow-800 text-sm font-medium">
              모든 문제를 완료했습니다!
            </p>
            <p className="text-yellow-700 text-xs mt-1">
              단원 보너스 +10 XP 획득!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
