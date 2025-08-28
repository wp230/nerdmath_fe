'use client';

import { useRouter } from 'next/navigation';
import { Progress } from '@/types/problem';
import { useIncorrectProblems } from '@/stores/problem.store';
import BookmarkRecommendation from './BookmarkRecommendation';

interface ProblemCompleteProps {
  unitId: string;
  progress: Progress;
}

const ProblemComplete: React.FC<ProblemCompleteProps> = ({ 
  unitId, 
  progress 
}) => {
  const router = useRouter();
  const incorrectProblems = useIncorrectProblems();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleRetryUnit = () => {
    // 세션 클리어 후 재시작
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      {/* 완료 아이콘 */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* 완료 메시지 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        단원 학습 완료! 🎉
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        모든 문제를 풀이하셨습니다. 수고하셨습니다!
      </p>

      {/* 진행률 요약 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">학습 결과</h2>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {progress.completed}
            </div>
            <div className="text-sm text-gray-600">해결한 문제</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(progress.percentage)}%
            </div>
            <div className="text-sm text-gray-600">완료율</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {incorrectProblems.length}
            </div>
            <div className="text-sm text-gray-600">틀린 문제</div>
          </div>
        </div>
      </div>

      {/* 틀린 문제 북마크 추천 */}
      {incorrectProblems.length > 0 && (
        <BookmarkRecommendation 
          incorrectProblems={incorrectProblems}
          className="mb-8"
        />
      )}

      {/* 액션 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleGoToDashboard}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          대시보드로 이동
        </button>
        
        <button
          onClick={handleRetryUnit}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          다시 풀어보기
        </button>
      </div>
    </div>
  );
};

export default ProblemComplete;
