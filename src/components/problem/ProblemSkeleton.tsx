'use client';

const ProblemSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-pulse">
      {/* 헤더 스켈레톤 */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>

      {/* 진행률 바 스켈레톤 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
      </div>

      {/* 문제 카드 스켈레톤 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* 문제 번호 */}
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>

        {/* 문제 제목 */}
        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* 태그들 */}
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-gray-200 rounded w-12"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-14"></div>
        </div>

        {/* 선택지들 */}
        <div className="space-y-3 mb-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between">
          <div className="h-10 bg-gray-200 rounded w-16"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSkeleton;
