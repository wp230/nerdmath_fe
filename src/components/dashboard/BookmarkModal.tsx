import React, { useState } from 'react';
import { Modal, Button, Spinner } from '@/components/common';
import { useStartBookmarkReviewMutation } from '@/hooks/dashboard';
import type { BookmarkList, Bookmark } from '@/types/dashboard';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks?: BookmarkList;
  isLoading?: boolean;
  error?: any;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  isLoading,
  error,
}) => {
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);
  const startReviewMutation = useStartBookmarkReviewMutation();

  const handleSelectAll = () => {
    if (!bookmarks?.bookmarks) return;

    if (selectedBookmarks.length === bookmarks.bookmarks.length) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(
        bookmarks.bookmarks.map((bookmark) => bookmark.bookmarkId)
      );
    }
  };

  const handleSelectBookmark = (bookmarkId: string) => {
    setSelectedBookmarks((prev) => {
      if (prev.includes(bookmarkId)) {
        return prev.filter((id) => id !== bookmarkId);
      } else {
        return [...prev, bookmarkId];
      }
    });
  };

  const handleStartReview = async () => {
    if (selectedBookmarks.length === 0) {
      alert('복습할 북마크를 선택해주세요.');
      return;
    }

    const selectedBookmarkObjects =
      bookmarks?.bookmarks.filter((bm) =>
        selectedBookmarks.includes(bm.bookmarkId)
      ) || [];

    const uniqueUnitIds = new Set(
      selectedBookmarkObjects.map((bm) => bm.unitId)
    );

    if (uniqueUnitIds.size > 1) {
      alert(
        '여러 단원의 북마크를 동시에 복습할 수 없습니다. 하나의 단원에 속한 북마크만 선택해주세요.'
      );
      return;
    }

    const unitId =
      uniqueUnitIds.size === 1
        ? uniqueUnitIds.values().next().value
        : undefined;

    if (!unitId) {
      alert('복습을 시작할 단원을 식별할 수 없습니다.');
      return;
    }

    try {
      await startReviewMutation.mutateAsync({
        mode: 'set',
        unitId: unitId,
      });
      onClose();
      setSelectedBookmarks([]);
    } catch (error) {
      console.error('Failed to start bookmark review:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="북마크 복습" size="lg">
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>북마크를 불러올 수 없습니다.</p>
            <p className="text-sm text-gray-500 mt-2">
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        ) : !bookmarks?.bookmarks || bookmarks.bookmarks.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              저장된 북마크가 없습니다
            </h3>
            <p className="text-gray-500">
              학습 중 어려운 문제를 북마크로 저장하여 나중에 다시 풀어보세요.
            </p>
          </div>
        ) : (
          <>
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  총 {bookmarks.totalCount}개의 북마크 중{' '}
                  {bookmarks.bookmarks.length}개 표시
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedBookmarks.length === bookmarks.bookmarks.length
                  ? '전체 해제'
                  : '전체 선택'}
              </Button>
            </div>

            {/* 북마크 목록 */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {bookmarks.bookmarks.map((bookmark: Bookmark) => (
                <div
                  key={bookmark.bookmarkId}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${
                      selectedBookmarks.includes(bookmark.bookmarkId)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectBookmark(bookmark.bookmarkId)}
                >
                  <div className="flex items-start space-x-3">
                    {/* 체크박스 */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center
                          ${
                            selectedBookmarks.includes(bookmark.bookmarkId)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }
                        `}
                      >
                        {selectedBookmarks.includes(bookmark.bookmarkId) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* 북마크 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {bookmark.problemTitle}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {formatDate(bookmark.bookmarkedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {bookmark.unitTitle}
                      </p>
                    </div>

                    {/* 북마크 아이콘 */}
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 액션 버튼 */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {selectedBookmarks.length > 0 && (
                  <span>{selectedBookmarks.length}개 선택됨</span>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={startReviewMutation.isPending}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  onClick={handleStartReview}
                  disabled={selectedBookmarks.length === 0}
                  isLoading={startReviewMutation.isPending}
                >
                  {startReviewMutation.isPending
                    ? '시작 중...'
                    : `복습 시작 (${selectedBookmarks.length}개)`}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default BookmarkModal;
