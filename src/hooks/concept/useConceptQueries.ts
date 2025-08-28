import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getConceptByUnitId,
  completeConceptLearning,
} from '@/services/concept';

export const queryKeys = {
  concept: (unitId: string, chapterId?: string) => [
    'concept',
    unitId,
    chapterId,
  ],
};

export const useGetConceptQuery = (unitId: string, chapterId?: string) => {
  return useQuery({
    queryKey: queryKeys.concept(unitId, chapterId),
    queryFn: () => getConceptByUnitId(unitId, chapterId),
    enabled: !!unitId, // unitId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useCompleteConceptMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      unitId,
      learningTimeId,
      chapterId,
    }: {
      unitId: string;
      learningTimeId: string;
      chapterId?: string;
    }) => completeConceptLearning(unitId, learningTimeId),
    onSuccess: (_, variables) => {
      // 개념 학습 완료 시 관련 쿼리를 무효화하여 최신 상태를 반영할 수 있습니다.
      queryClient.invalidateQueries({
        queryKey: queryKeys.concept(variables.unitId, variables.chapterId),
      });
    },
  });
};
