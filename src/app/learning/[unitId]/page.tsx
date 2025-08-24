'use client';

import { useLearningStore } from '../../../stores/learningStore';
import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';

export default function LearningPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = use(params);
  const { selectedUnit } = useLearningStore();
  const router = useRouter();

  // 선택된 단원이 없으면 단원 선택 페이지로 리다이렉트
  useEffect(() => {
    if (!selectedUnit || selectedUnit.unitId !== unitId) {
      router.push(`/math/${unitId}`);
    }
  }, [selectedUnit, unitId, router]);

  // 로딩 중이거나 선택된 단원이 없으면 로딩 표시
  if (!selectedUnit || selectedUnit.unitId !== unitId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">학습 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedUnit.unitTitle} - {selectedUnit.chapterTitle}
        </h1>
        <p className="text-gray-600">
          학습 페이지 (개념학습과 문제풀이 기능은 2단계, 3단계에서 구현 예정)
        </p>
      </div>

      {/* 향후 여기에 개념학습과 문제풀이 컴포넌트들이 추가될 예정 */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          구현 예정 기능
        </h2>
        <ul className="space-y-2 text-blue-700">
          <li>• 2단계: 개념 학습 기능</li>
          <li>• 3단계: 문제 풀이 기능</li>
          <li>• XP 시스템 및 진행률 추적</li>
          <li>• 학습 완료 후 자동 진행</li>
        </ul>
      </div>
    </div>
  );
}
