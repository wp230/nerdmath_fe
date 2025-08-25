import { useQuery } from '@tanstack/react-query';
import { VocabTestService } from '@/service/learning/vocabTestService';
import { VocabTestSet } from '@/types/learning';

/**
 * 어휘 테스트 문제 세트 조회 훅
 * GET /v1/vocab/test?unitId={unitId}&testSize=10
 */
export const useVocabTest = (unitId: string, testSize: number = 10) => {
  return useQuery<VocabTestSet>({
    queryKey: ['vocabTest', unitId, testSize],
    queryFn: () => VocabTestService.getVocabTest(unitId, testSize),
    enabled: !!unitId && !!testSize,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * 어휘 테스트 문제 세트 검증 훅
 */
export const useVocabTestValidation = (testSet: VocabTestSet | undefined) => {
  return useQuery({
    queryKey: ['vocabTestValidation', testSet?.testSet?.unitId],
    queryFn: () => {
      if (!testSet) return false;
      return VocabTestService.validateVocabTest(testSet);
    },
    enabled: !!testSet,
    staleTime: Infinity, // 검증 결과는 변경되지 않음
    gcTime: Infinity,
  });
};

/**
 * 어휘 테스트 진행률 계산 훅
 */
export const useVocabTestProgress = (
  testSet: VocabTestSet | undefined,
  completedProblems: Set<string>
) => {
  return useQuery({
    queryKey: [
      'vocabTestProgress',
      testSet?.testSet?.unitId,
      completedProblems.size,
    ],
    queryFn: () => {
      if (!testSet?.testSet?.problems) return 0;

      const totalProblems = testSet.testSet.problems.length;
      const completedCount = completedProblems.size;

      return totalProblems > 0
        ? Math.round((completedCount / totalProblems) * 100)
        : 0;
    },
    enabled: !!testSet,
    staleTime: 0, // 진행률은 실시간으로 업데이트
    gcTime: 1 * 60 * 1000, // 1분
  });
};
