import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VocabServiceFactory } from '@/service/voca/vocabServiceFactory';
import { VocabPack, Vocabulary } from '@/types/voca';
import { useVocaStore } from '@/stores/vocaStore';

export const useVocabPackDetail = (pack: VocabPack | null) => {
  const { setVocabularies, setLoading } = useVocaStore();

  // ✅ setter 함수들을 useCallback으로 안정화
  const setVocabulariesStable = useCallback((vocabs: Vocabulary[]) => {
    setVocabularies(vocabs);
  }, []);

  const setLoadingStable = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  // Mock 모드 상태 추적
  const currentMockMode = VocabServiceFactory.isMockMode();

  const {
    data: vocabularies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vocabPackDetail', pack?.unitId || pack?.type, currentMockMode], // Mock 모드 상태를 쿼리 키에 포함
    queryFn: async () => {
      if (!pack) return [];

      try {
        // VocabServiceFactory를 통해 서비스 인스턴스 가져오기
        const service = VocabServiceFactory.getInstance();
        let response;

        if (pack.unitId) {
          // 5-1: 단원별 어휘 조회
          response = await service.getUnitVocab(pack.unitId);
          return response.vocabularies;
        } else if (pack.type) {
          // 5-2: 빈출 어휘 조회
          response = await service.getCommonVocab(pack.type);
          return response.vocabularies;
        }

        return [];
      } catch (error) {
        console.error('Failed to fetch vocab pack detail:', error);
        throw error;
      }
    },
    enabled: !!pack,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (React Query v5)
  });

  // 전역 상태 업데이트 (무한 루프 방지)
  useEffect(() => {
    if (vocabularies) {
      setVocabulariesStable(vocabularies);
    }
    setLoadingStable(isLoading);
  }, [vocabularies, isLoading, setVocabulariesStable, setLoadingStable]);

  return {
    vocabularies: vocabularies || [],
    isLoading,
    error,
    isMockMode: currentMockMode,
  };
};
