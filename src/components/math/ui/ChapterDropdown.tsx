import React, { useState, useRef, useEffect } from 'react';
import { ChapterData } from '../../../types/math';

interface ChapterDropdownProps {
  chapters: ChapterData[];
  selectedChapter: ChapterData | null;
  onChapterSelect: (chapter: ChapterData) => void;
  placeholder?: string;
}

export const ChapterDropdown: React.FC<ChapterDropdownProps> = ({ 
  chapters, 
  selectedChapter, 
  onChapterSelect,
  placeholder = "소단원을 선택하세요" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChapterSelect = (chapter: ChapterData) => {
    onChapterSelect(chapter);
    setIsOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'in_progress': return '진행중';
      default: return '미시작';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 트리거 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className={selectedChapter ? 'text-gray-900' : 'text-gray-500'}>
            {selectedChapter ? selectedChapter.title : placeholder}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {chapters.map((chapter) => (
            <div
              key={chapter.chapter}
              onClick={() => handleChapterSelect(chapter)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{chapter.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{chapter.subtitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chapter.status || 'not_started')}`}>
                    {getStatusText(chapter.status || 'not_started')}
                  </span>
                  {chapter.progress !== undefined && (
                    <span className="text-xs text-gray-500">
                      {chapter.progress}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
