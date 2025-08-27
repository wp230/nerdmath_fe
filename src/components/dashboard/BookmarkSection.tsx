import React, { useState } from 'react';
import { Button } from '@/components/common';
import BookmarkModal from './BookmarkModal';
import type { BookmarkList } from '@/types/dashboard';

interface BookmarkSectionProps {
  bookmarks?: BookmarkList;
  isLoading?: boolean;
  error?: any;
}

const BookmarkSection: React.FC<BookmarkSectionProps> = ({
  bookmarks,
  isLoading,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            내 북마크
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading || !bookmarks?.bookmarks?.length}
          >
            전체 보기
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-4">
            <p className="text-sm">북마크를 불러올 수 없습니다.</p>
          </div>
        ) : !bookmarks?.bookmarks || bookmarks.bookmarks.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <p className="text-gray-500 text-sm">저장된 북마크가 없습니다</p>
            <p className="text-gray-400 text-xs mt-1">
              어려운 문제를 북마크로 저장해보세요
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {bookmarks.bookmarks.slice(0, 5).map((bookmark, index) => (
                <div
                  key={bookmark.bookmarkId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {bookmark.problemTitle}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">
                      {bookmark.unitTitle}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <span className="text-xs text-gray-500">
                      {formatDate(bookmark.bookmarkedAt)}
                    </span>
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* 통계 정보 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                총 {bookmarks.totalCount}개의 북마크
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                복습 시작하기
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 북마크 모달 */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookmarks={bookmarks}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default BookmarkSection;
