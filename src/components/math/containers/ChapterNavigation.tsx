import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChapterData } from '../../types/math';
import { ChapterDropdown } from '../ui/ChapterDropdown';
import { StartButton } from '../ui/StartButton';
import { useMathStore } from '../../../stores/mathStore';

interface ChapterNavigationProps {
  chapters: ChapterData[];
  unitId: string;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  chapters,
  unitId,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );
  const router = useRouter();
  const { setCurrentChapter } = useMathStore();

  const handleChapterSelect = (chapter: ChapterData) => {
    setSelectedChapter(chapter);
    setCurrentChapter(chapter);
  };

  const handleStart = (chapter: ChapterData) => {
    // 화면2로 이동: /learning/[unitId]/[chapterId]
    if (chapter) {
      router.push(`/learning/${unitId}/${chapter.chapter}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          소단원을 선택하고 학습을 시작하세요
        </h2>
        <p className="text-lg text-gray-600">
          총 {chapters.length}개의 소단원이 준비되어 있습니다
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            소단원 선택
          </label>
          <ChapterDropdown
            chapters={chapters}
            selectedChapter={selectedChapter}
            onChapterSelect={handleChapterSelect}
            placeholder="학습할 소단원을 선택하세요"
          />
        </div>

        <div className="mb-6">
          <StartButton chapter={selectedChapter} onStart={handleStart} />
        </div>

        {/* 선택된 소단원 정보 */}
        {selectedChapter && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📖 {selectedChapter.title}
            </h3>
            <p className="text-blue-800 mb-4">{selectedChapter.description}</p>
            <div className="flex items-center gap-4 text-sm text-blue-700">
              <span>학년: {selectedChapter.grade}학년</span>
              <span>진행률: {selectedChapter.progress || 0}%</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedChapter.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : selectedChapter.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {selectedChapter.status === 'completed'
                  ? '완료'
                  : selectedChapter.status === 'in_progress'
                    ? '진행중'
                    : '미시작'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 전체 소단원 목록 미리보기 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          전체 소단원 목록
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.chapter}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedChapter?.chapter === chapter.chapter
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleChapterSelect(chapter)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                  {chapter.chapter}장
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    chapter.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : chapter.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chapter.status === 'completed'
                    ? '완료'
                    : chapter.status === 'in_progress'
                      ? '진행중'
                      : '미시작'}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">
                {chapter.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {chapter.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
