import React from 'react';
import { VocabCard } from '../ui/VocabCard';
import { useVocabPackDetail } from '@/hooks/voca/useVocabPackDetail';
import { useVocaStore } from '@/stores/vocaStore';
import { VocabPack } from '@/types/voca';

interface VocabPackDetailProps {
  pack: VocabPack;
  onBack: () => void;
}

export const VocabPackDetail: React.FC<VocabPackDetailProps> = ({
  pack,
  onBack,
}) => {
  const { vocabularies, isLoading, error } = useVocabPackDetail(pack);
  const { currentVocabularies } = useVocaStore();

  const displayVocabularies =
    vocabularies.length > 0 ? vocabularies : currentVocabularies;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">
          어휘를 불러오는 중 오류가 발생했습니다
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          어휘팩 목록으로
        </button>

        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800">{pack.title}</h2>
          <p className="text-gray-600">{displayVocabularies.length}개 어휘</p>
        </div>
      </div>

      {/* 어휘 목록 */}
      {displayVocabularies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVocabularies.map((vocab) => (
            <VocabCard key={vocab.vocaId} vocab={vocab} showDetails={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            이 어휘팩에 포함된 어휘가 없습니다
          </div>
        </div>
      )}

      {/* 하단 정보 */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>카드를 클릭하여 앞면(영어)과 뒷면(한글)을 확인할 수 있습니다</p>
        {pack.description && <p className="mt-2">{pack.description}</p>}
      </div>
    </div>
  );
};
