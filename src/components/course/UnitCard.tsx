'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Unit,
  UnitGradeInfo,
  StudyLink,
  DifficultyLevel,
  Chapter,
} from '@/types/course';
import { useGetAllUnitChaptersQuery } from '@/hooks/course/useCourseQueries';

interface UnitCardProps {
  unit: Unit;
  unitGradeInfo: UnitGradeInfo;
}

export default function UnitCard({ unit, unitGradeInfo }: UnitCardProps) {
  const [expandedGrades, setExpandedGrades] = useState<Set<number>>(new Set());
  const { data: allUnitChapters } = useGetAllUnitChaptersQuery();

  const toggleGrade = (gradeId: number) => {
    const newExpanded = new Set(expandedGrades);
    if (newExpanded.has(gradeId)) {
      newExpanded.delete(gradeId);
    } else {
      newExpanded.add(gradeId);
    }
    setExpandedGrades(newExpanded);
  };

  // 범위에서 챕터 목록을 추출하는 함수 (예: "1.1~1.6" -> [1, 2, 3, 4, 5, 6], "4.6" -> [6])
  const getChaptersFromRange = (range: string): number[] => {
    if (!range || typeof range !== 'string') {
      return [];
    }

    // 단일 값인 경우 (예: "4.6")
    if (!range.includes('~')) {
      const chapterNumber = parseInt(range.split('.')[1]);
      return isNaN(chapterNumber) ? [] : [chapterNumber];
    }

    // 범위인 경우 (예: "1.1~1.6")
    const [start, end] = range.split('~');
    if (!start || !end) {
      return [];
    }

    const startParts = start.split('.');
    const endParts = end.split('.');

    if (startParts.length < 2 || endParts.length < 2) {
      return [];
    }

    const startChapter = parseInt(startParts[1]);
    const endChapter = parseInt(endParts[1]);

    if (isNaN(startChapter) || isNaN(endChapter)) {
      return [];
    }

    const chapters: number[] = [];
    for (let i = startChapter; i <= endChapter; i++) {
      chapters.push(i);
    }
    return chapters;
  };

  // 특정 학년(단계)에 해당하는 챕터 데이터들을 가져오는 함수
  const getChaptersByGrade = (unitId: string, range: string): Chapter[] => {
    if (!allUnitChapters || !allUnitChapters[unitId] || !range) {
      return [];
    }

    const chapterNumbers = getChaptersFromRange(range);
    if (chapterNumbers.length === 0) {
      return [];
    }

    const unitChapters = allUnitChapters[unitId];
    if (!Array.isArray(unitChapters)) {
      return [];
    }

    return unitChapters.filter(
      (chapter) =>
        chapter &&
        typeof chapter.chapter === 'number' &&
        chapterNumbers.includes(chapter.chapter)
    );
  };

  const generateStudyLinks = (
    unitId: string,
    chapter: Chapter,
    type: 'concept' | 'problem' | 'voca'
  ) => {
    const basePaths = {
      concept: `/concept/${unitId}/${chapter.chapter}`,
      problem: `/problem/${unitId}/${chapter.chapter}`,
      voca: `/vocabulary/${unitId}/${chapter.chapter}`,
    };
    return basePaths[type];
  };

  // 로딩 상태 체크
  if (!allUnitChapters) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="text-center text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          학습 단계별 목록
        </h2>
        <p className="text-gray-600 text-sm">
          단계를 클릭하여 소단원 목록을 확인하고 학습을 시작하세요.
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {Object.entries(unitGradeInfo.gradeNames || {}).map(
          ([gradeKey, gradeName]) => {
            if (!gradeName || !gradeName.range) {
              return null;
            }

            const gradeId = parseInt(gradeKey);
            const chaptersInRange = getChaptersByGrade(
              unit.unitId,
              gradeName.range
            );

            // 챕터가 없으면 해당 그레이드를 표시하지 않음
            if (chaptersInRange.length === 0) {
              return null;
            }

            const isGradeExpanded = expandedGrades.has(gradeId);

            return (
              <div key={gradeId}>
                {/* 단계별 토글 헤더 */}
                <button
                  onClick={() => toggleGrade(gradeId)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                      {gradeKey}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {gradeKey}단계: {gradeName.name}
                      </div>
                      {/* <div className="text-sm text-gray-500 mt-1">
                        범위: {gradeName.range} • {chaptersInRange.length}개
                        소단원
                      </div> */}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">
                      {isGradeExpanded ? '접기' : '펼치기'}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                        isGradeExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* 단계별 토글 콘텐츠 - 소개념 리스트 */}
                {isGradeExpanded && (
                  <div className="bg-gray-50">
                    {chaptersInRange.map((chapter) => {
                      const studyLinks = generateStudyLinks(
                        unit.unitId,
                        chapter,
                        'concept'
                      );

                      return (
                        <div
                          key={chapter.chapter}
                          className="px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            {/* 소개념 정보 */}
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold mr-3">
                                  {unit.unitId.split('_')[1]}.{chapter.chapter}
                                </div>
                                <span className="font-medium text-gray-900">
                                  {chapter.title}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 ml-12">
                                {chapter.subtitle}
                              </div>
                            </div>

                            {/* 오른쪽 학습 버튼들 */}
                            <div className="flex items-center space-x-3 ml-4">
                              {/* 개념공부 버튼 */}
                              <Link
                                href={generateStudyLinks(
                                  unit.unitId,
                                  chapter,
                                  'concept'
                                )}
                                passHref
                              >
                                <button className="flex items-center px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 font-medium">
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                  </svg>
                                  개념공부
                                </button>
                              </Link>

                              {/* 문제풀기 버튼 */}
                              <Link
                                href={generateStudyLinks(
                                  unit.unitId,
                                  chapter,
                                  'problem'
                                )}
                                passHref
                              >
                                <button className="flex items-center px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 font-medium">
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  문제풀기
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
