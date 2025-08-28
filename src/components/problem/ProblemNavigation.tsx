'use client';

interface ProblemNavigationProps {
  canSubmit: boolean;
  canNext: boolean;
  isFirstProblem: boolean;
  isLastProblem: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

const ProblemNavigation: React.FC<ProblemNavigationProps> = ({
  canSubmit,
  canNext,
  isFirstProblem,
  isLastProblem,
  onPrevious,
  onSubmit,
  onNext,
  isSubmitting = false,
}) => {
  return (
    <div className="flex justify-between items-center">
      {/* 이전 버튼 */}
      <button
        onClick={onPrevious}
        disabled={isFirstProblem}
        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        이전
      </button>

      {/* 제출/다음 버튼 */}
      <div className="flex gap-3">
        {!canNext ? (
          // 답안 제출 버튼
          <button
            onClick={onSubmit}
            disabled={!canSubmit || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '제출 중...' : '답안 제출'}
          </button>
        ) : (
          // 다음 문제 버튼
          <button
            onClick={onNext}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {isLastProblem ? '완료' : '다음 문제'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProblemNavigation;
