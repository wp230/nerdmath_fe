'use client';

import React, { use } from 'react';
import { UnitHero } from '../../../components/math/ui/UnitHero';
import { ChapterNavigation } from '../../../components/math/containers/ChapterNavigation';
import { useUnitData } from '../../../hooks/math/useUnitData';
import { useChapterData } from '../../../hooks/math/useChapterData';
import { useUnitProgress } from '../../../hooks/math/useUnitProgress';

interface MathPageProps {
  params: Promise<{
    unitId: string;
  }>;
}

export default function MathPage({ params }: MathPageProps) {
  const { unitId } = use(params);
  const {
    unitData,
    isLoading: unitLoading,
    error: unitError,
    retry: retryUnit,
  } = useUnitData(unitId);
  const {
    chapters,
    isLoading: chaptersLoading,
    error: chaptersError,
    retry: retryChapters,
  } = useChapterData(unitId);
  const {
    unitProgress,
    isLoading: progressLoading,
    error: progressError,
    retry: retryProgress,
  } = useUnitProgress(unitId);

  // 로딩 상태
  if (unitLoading || chaptersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">단원 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (unitError || chaptersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            오류가 발생했습니다
          </h1>
          <p className="text-red-600 mb-6">{unitError || chaptersError}</p>
          <div className="space-x-4">
            <button
              onClick={() => {
                if (unitError) retryUnit();
                if (chaptersError) retryChapters();
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!unitData || !chapters.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-4">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            단원을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 단원 정보가 존재하지 않습니다.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <UnitHero unit={unitData} />

      {/* 소단원 네비게이션 */}
      <ChapterNavigation chapters={chapters} unitId={unitId} />

      {/* 진행률 정보 (선택사항) */}
      {unitProgress && !progressLoading && (
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              📊 {unitData.title} 전체 진행률
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {unitProgress.conceptProgress}%
                </div>
                <div className="text-sm text-gray-600">개념 학습</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {unitProgress.problemProgress}%
                </div>
                <div className="text-sm text-gray-600">문제 풀이</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {unitProgress.vocabProgress}%
                </div>
                <div className="text-sm text-gray-600">어휘 학습</div>
              </div>
            </div>

            {/* 진행률 에러가 있는 경우 재시도 버튼 표시 */}
            {progressError && (
              <div className="mt-4 text-center">
                <p className="text-sm text-red-600 mb-2">
                  진행률 정보를 불러오는데 실패했습니다
                </p>
                <button
                  onClick={retryProgress}
                  className="bg-blue-500 text-white py-1 px-4 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
