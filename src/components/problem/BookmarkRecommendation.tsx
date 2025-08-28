'use client';

import { useState } from 'react';
import { useProblemMutations } from '@/hooks/problem';
import { useAuthStore } from '@/stores/auth.store';

interface BookmarkRecommendationProps {
  incorrectProblems: string[];
  className?: string;
}

const BookmarkRecommendation: React.FC<BookmarkRecommendationProps> = ({
  incorrectProblems,
  className = '',
}) => {
  const { user } = useAuthStore();
  const { useToggleBookmark } = useProblemMutations;
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(
    new Set()
  );

  const toggleBookmarkMutation = useToggleBookmark();

  const handleBookmarkAll = async () => {
    if (!user) return;

    try {
      for (const problemId of incorrectProblems) {
        if (!bookmarkedProblems.has(problemId)) {
          await toggleBookmarkMutation.mutateAsync({
            problemId,
            userId: user.id,
          });
          setBookmarkedProblems((prev) => new Set(prev).add(problemId));
        }
      }
    } catch (error) {
      console.error('Failed to bookmark problems:', error);
    }
  };

  const handleSkip = () => {
    // 북마크 건너뛰기 - 특별한 액션 없음
  };

  if (incorrectProblems.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-orange-50 border border-orange-200 rounded-lg p-6 ${className}`}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">
          틀린 문제를 북마크하시겠습니까?
        </h3>

        <p className="text-sm text-orange-700 mb-4">
          틀린 문제 {incorrectProblems.length}개를 북마크에 추가하여 나중에 다시
          풀어볼 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleBookmarkAll}
            disabled={toggleBookmarkMutation.isPending}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {toggleBookmarkMutation.isPending
              ? '추가 중...'
              : '모두 북마크 추가'}
          </button>

          <button
            onClick={handleSkip}
            className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {bookmarkedProblems.size > 0 && (
          <p className="text-sm text-green-600 mt-3">
            ✅ {bookmarkedProblems.size}개 문제가 북마크에 추가되었습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkRecommendation;
