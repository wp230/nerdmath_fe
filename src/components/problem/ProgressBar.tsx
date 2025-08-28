'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  percentage,
}) => {
  return (
    <div className="mb-8">
      {/* 진행률 텍스트 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          진행률
        </span>
        <span className="text-sm text-gray-500">
          {current} / {total} ({Math.round(percentage)}%)
        </span>
      </div>

      {/* 진행률 바 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* 단계별 마커 (선택적) */}
      <div className="flex justify-between mt-1">
        {Array.from({ length: Math.min(total, 10) }, (_, index) => {
          const stepPercentage = ((index + 1) / total) * 100;
          const isCompleted = percentage >= stepPercentage;
          
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                isCompleted ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
