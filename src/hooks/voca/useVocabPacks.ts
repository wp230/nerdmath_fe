import React, { useEffect, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { VocabServiceFactory } from '@/service/voca/vocabServiceFactory';
import { VocabPackResponse, VocabPack } from '@/types/voca';
import { useVocaStore } from '@/stores/vocaStore';

// 어휘팩 데이터를 VocabPack 형태로 변환하는 함수
const transformVocabPackResponse = (response: VocabPackResponse): VocabPack => {
  console.log('🔄 transformVocabPackResponse: 변환 시작', response);

  if (response.unitId) {
    // 5-1 API 응답 (단원별)
    const result = {
      unitId: response.unitId,
      category: response.category || 'math_term',
      title: `${response.category === 'math_term' ? '수학 용어' : '기타'} - ${response.unitId}`,
      description: '단원별 수학 어휘 모음',
      vocabCount: response.vocabularies.length,
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    };
    console.log('✅ transformVocabPackResponse: 단원별 변환 결과', result);
    return result;
  } else {
    // 5-2 API 응답 (빈출 어휘)
    const typeLabels: Record<string, string> = {
      sat_act: 'SAT/ACT 빈출 어휘',
      common: '일반 빈출 어휘',
    };

    const result = {
      type: response.type || 'common',
      category: 'common',
      title: typeLabels[response.type || 'common'] || '빈출 어휘',
      description: '시험에 자주 나오는 수학 관련 어휘',
      vocabCount: response.vocabularies.length,
      // imageUrl 제거 - 어휘팩 선택 화면에서는 불필요
    };
    console.log('✅ transformVocabPackResponse: 빈출 어휘 변환 결과', result);
    return result;
  }
};

export const useVocabPacks = () => {
  const { setVocabPacks, setLoading } = useVocaStore();
  const queryClient = useQueryClient();

  // ✅ setter 함수들을 useCallback으로 안정화
  const setVocabPacksStable = useCallback((packs: VocabPack[]) => {
    console.log('🔄 useVocabPacks: setVocabPacks 호출됨', packs);
    setVocabPacks(packs);
  }, []);

  const setLoadingStable = useCallback((loading: boolean) => {
    console.log('🔄 useVocabPacks: setLoading 호출됨', loading);
    setLoading(loading);
  }, []);

  // Mock 모드 상태 추적
  const currentMockMode = VocabServiceFactory.isMockMode();
  console.log('🔍 useVocabPacks: Mock 모드 상태', currentMockMode);

  const {
    data: vocabPackResponses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vocabPacks', currentMockMode], // Mock 모드 상태를 쿼리 키에 포함
    queryFn: async () => {
      console.log('🚀 useVocabPacks: API 호출 시작');
      const service = VocabServiceFactory.getInstance();
      console.log('🔧 useVocabPacks: 서비스 타입', service.constructor.name);
      const result = await service.getAllVocabPacks();
      console.log('✅ useVocabPacks: API 호출 결과', result);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (React Query v5)
  });

  // API 응답을 VocabPack 형태로 변환 (메모이제이션)
  const vocabPacks = useMemo(() => {
    console.log('🔄 useVocabPacks: 데이터 변환 시작', vocabPackResponses);
    const transformed =
      vocabPackResponses?.map(transformVocabPackResponse) || [];
    console.log('✅ useVocabPacks: 변환된 데이터', transformed);
    return transformed;
  }, [vocabPackResponses]);

  // 전역 상태 업데이트 (무한 루프 방지)
  useEffect(() => {
    console.log('🔄 useVocabPacks: useEffect - vocabPacks 변경', vocabPacks);
    // 빈 배열이 아닌 경우에만 업데이트
    if (vocabPacks.length > 0) {
      setVocabPacksStable(vocabPacks);
    }
  }, [vocabPacks, setVocabPacksStable]);

  // 로딩 상태만 별도로 관리
  useEffect(() => {
    console.log('🔄 useVocabPacks: useEffect - isLoading 변경', isLoading);
    setLoadingStable(isLoading);
  }, [isLoading, setLoadingStable]);

  // Mock 모드 변경 시 캐시 무효화
  useEffect(() => {
    console.log('🔄 useVocabPacks: Mock 모드 변경 감지, 캐시 무효화');
    queryClient.invalidateQueries({ queryKey: ['vocabPacks'] });
  }, [currentMockMode, queryClient]);

  console.log('🔄 useVocabPacks: 반환값', {
    vocabPacks,
    isLoading,
    error,
    currentMockMode,
  });

  return {
    vocabPacks,
    isLoading,
    error,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['vocabPacks'] }),
    serviceType: VocabServiceFactory.getCurrentServiceType(),
    isApiAvailable: VocabServiceFactory.isApiServiceAvailable(),
    isMockMode: currentMockMode,
  };
};
