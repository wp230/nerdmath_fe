"use client";

import React from 'react';
import { Chapter } from '../../types/learning';

interface ChapterListProps {
  chapters: Chapter[];
  selectedChapter: number | null;
  onChapterSelect: (chapter: number) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  selectedChapter,
  onChapterSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">소단원 선택</h3>
      <div className="grid gap-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.chapter}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${
                selectedChapter === chapter.chapter
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            onClick={() => onChapterSelect(chapter.chapter)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {chapter.chapter}단원
                  </span>
                  <span className="text-sm text-gray-500">
                    {chapter.grade}학년
                  </span>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">
                  {chapter.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {chapter.description}
                </p>
              </div>

              {/* 선택 표시 */}
              {selectedChapter === chapter.chapter && (
                <div className="ml-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
