import { useQuery } from '@tanstack/react-query';
import {
  getUnitVocabulary,
  getCommonVocabulary,
  createVocabularyTest,
} from '@/services/vocabulary';
import { vocabularyQueryKeys } from './queryKeys';

export const useUnitVocabularyQuery = (unitId: string, enabled: boolean) => {
  return useQuery({
    queryKey: vocabularyQueryKeys.list('unit', unitId),
    queryFn: () => getUnitVocabulary(unitId),
    enabled,
  });
};

export const useCommonVocabularyQuery = (type: string, enabled: boolean) => {
  return useQuery({
    queryKey: vocabularyQueryKeys.list('common', type),
    queryFn: () => getCommonVocabulary(type),
    enabled,
  });
};

export const useVocabularyTestQuery = (unitId: string, enabled: boolean) => {
  return useQuery({
    queryKey: vocabularyQueryKeys.test(unitId),
    queryFn: () => createVocabularyTest(unitId),
    enabled,
  });
};
