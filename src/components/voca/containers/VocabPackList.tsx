import React from 'react';
import { VocabPackCard } from '../ui/VocabPackCard';
import { useVocabPacks } from '@/hooks/voca/useVocabPacks';
import { useVocaStore } from '@/stores/vocaStore';

export const VocabPackList: React.FC = () => {
  // 로컬 상태 우선 사용, 전역 상태는 선택 시에만 사용
  const { vocabPacks, isLoading, error } = useVocabPacks();
  const { selectPack } = useVocaStore();

  console.log('🔍 VocabPackList: 렌더링', { vocabPacks, isLoading, error });

  if (isLoading) {
    console.log('🔄 VocabPackList: 로딩 중 표시');
    return (
      <div className="flex items-center justify-center min-h-64 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-yellow-700">어휘팩을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('❌ VocabPackList: 에러 상태 표시', error);
    return (
      <div className="text-center py-12 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="text-red-500 text-lg mb-2">
          어휘팩을 불러오는 중 오류가 발생했습니다
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!vocabPacks || vocabPacks.length === 0) {
    console.log('⚠️ VocabPackList: 데이터 없음 표시', vocabPacks);
    return (
      <div className="text-center py-12 bg-gray-50 border-2 border-gray-200 rounded-lg">
        <div className="text-gray-500 text-lg">
          사용 가능한 어휘팩이 없습니다
        </div>
      </div>
    );
  }

  console.log('✅ VocabPackList: 정상 데이터 표시', vocabPacks);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border-2 border-green-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">어휘팩 선택</h2>
        <p className="text-gray-600">학습하고 싶은 어휘팩을 선택하세요</p>
        <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          📊 총 {vocabPacks.length}개의 어휘팩이 로드되었습니다
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vocabPacks.map((pack, index) => {
          console.log(`🎯 VocabPackCard ${index} 렌더링:`, pack);
          return (
            <VocabPackCard
              key={pack.unitId || pack.type || pack.category || index}
              pack={pack}
              onClick={() => selectPack(pack)}
            />
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        총 {vocabPacks.length}개의 어휘팩이 있습니다
      </div>
    </div>
  );
};
