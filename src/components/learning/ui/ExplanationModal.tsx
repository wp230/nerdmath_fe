import React, { useState, useEffect } from 'react';
import { BookmarkService } from '@/service/learning/bookmarkService';

interface ExplanationModalProps {
  isOpen: boolean;
  explanation: string;
  isCorrect: boolean;
  xpGained: number;
  problemId: string;
  onNext: () => void;
  onClose: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  explanation,
  isCorrect,
  xpGained,
  problemId,
  onNext,
  onClose,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [showXPAnimation, setShowXPAnimation] = useState(false);

  // 북마크 상태 확인
  useEffect(() => {
    if (isOpen && problemId) {
      BookmarkService.getBookmarkStatus(problemId)
        .then(({ bookmarked }) => setIsBookmarked(bookmarked))
        .catch(console.error);
    }
  }, [isOpen, problemId]);

  // XP 애니메이션 표시
  useEffect(() => {
    if (isOpen && xpGained > 0) {
      const timer = setTimeout(() => setShowXPAnimation(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, xpGained]);

  const handleBookmarkToggle = async () => {
    if (isBookmarking) return;

    setIsBookmarking(true);
    try {
      const response = await BookmarkService.toggleBookmark(problemId);
      setIsBookmarked(response.bookmarked);
    } catch (error) {
      console.error('북마크 토글 실패:', error);
    } finally {
      setIsBookmarking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* 결과 표시 */}
        <div
          className={`text-center mb-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
        >
          <div className="text-6xl mb-4 animate-bounce">
            {isCorrect ? '✅' : '❌'}
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {isCorrect ? '정답입니다!' : '틀렸습니다'}
          </h3>
          {isCorrect && (
            <div className="text-lg text-blue-600">+{xpGained} XP 획득! 🎉</div>
          )}
        </div>

        {/* XP 애니메이션 */}
        {showXPAnimation && isCorrect && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-4xl font-bold text-yellow-500 animate-ping">
              +{xpGained} XP
            </div>
          </div>
        )}

        {/* 해설 */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">해설</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">{explanation}</p>
          </div>
        </div>

        {/* 북마크 버튼 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleBookmarkToggle}
            disabled={isBookmarking}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isBookmarked
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } ${isBookmarking ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isBookmarking ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                처리 중...
              </>
            ) : (
              <>{isBookmarked ? '⭐ 북마크 해제' : '⭐ 북마크 추가'}</>
            )}
          </button>
        </div>

        {/* XP 정보 */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="text-sm font-semibold text-blue-800 mb-2">
            XP 획득 정보
          </h5>
          <div className="text-sm text-blue-700">
            <div className="flex justify-between items-center">
              <span>이번 문제:</span>
              <span className="font-medium">+{xpGained} XP</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>누적 XP:</span>
              <span className="font-medium">총 {xpGained} XP</span>
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            닫기
          </button>
          <button
            onClick={onNext}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            다음 문제
          </button>
        </div>

        {/* 추가 팁 */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h6 className="text-sm font-semibold text-yellow-800 mb-2">
            💡 학습 팁
          </h6>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>• 북마크한 문제는 나중에 복습할 수 있습니다</div>
            <div>• 틀린 문제는 더 자세히 공부해보세요</div>
            <div>• XP를 모아서 레벨업을 노려보세요</div>
          </div>
        </div>
      </div>
    </div>
  );
};
