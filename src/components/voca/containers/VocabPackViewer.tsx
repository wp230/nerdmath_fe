import React from 'react';
import { VocabPackList } from './VocabPackList';
import { VocabPackDetail } from './VocabPackDetail';
import { useVocaStore } from '@/stores/vocaStore';

export const VocabPackViewer: React.FC = () => {
  const { selectedPack, viewMode, setViewMode } = useVocaStore();

  const handleBackToList = () => {
    setViewMode('list');
  };

  // 상세 보기 모드일 때
  if (viewMode === 'detail' && selectedPack) {
    return <VocabPackDetail pack={selectedPack} onBack={handleBackToList} />;
  }

  // 목록 보기 모드 (기본)
  return <VocabPackList />;
};
