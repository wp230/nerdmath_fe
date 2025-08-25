import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PracticeService } from '@/service/learning/practiceService';
import { SubmitAnswerParams, AnswerResponse } from '@/types/learning';
import { XPCalculator } from '@/lib/xpCalculator';

/**
 * 답안 제출 및 채점 훅
 * POST /v1/answers/check
 */
export const useAnswerSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<AnswerResponse, Error, SubmitAnswerParams>({
    mutationFn: PracticeService.submitAnswer,

    onMutate: async (variables) => {
      // 낙관적 업데이트를 위한 이전 데이터 백업
      const previousProgress = queryClient.getQueryData([
        'progress',
        variables.unitId,
      ]);
      const previousGamification = queryClient.getQueryData(['gamification']);

      // 진행률 낙관적 업데이트
      if (variables.mode === 'vocab_test') {
        queryClient.setQueryData(
          ['vocabTestProgress', variables.unitId],
          (old: any) => {
            if (!old) return 0;
            return Math.min(old + 10, 100); // 임시로 10% 증가
          }
        );
      } else {
        queryClient.setQueryData(
          ['problemProgress', variables.unitId],
          (old: any) => {
            if (!old) return 0;
            return Math.min(old + 10, 100); // 임시로 10% 증가
          }
        );
      }

      return { previousProgress, previousGamification };
    },

    onSuccess: (data, variables) => {
      // XP 업데이트
      queryClient.setQueryData(['gamification'], (old: any) => {
        if (!old) return data.gamificationUpdate;

        return {
          ...old,
          ...data.gamificationUpdate,
          // XP 계산기로 레벨업 체크
          ...XPCalculator.checkLevelUp(old.xp, data.xpGained, old.level),
        };
      });

      // 진행률 업데이트
      queryClient.invalidateQueries(['progress', variables.unitId]);

      // 문제 진행률 업데이트
      if (variables.mode === 'vocab_test') {
        queryClient.invalidateQueries(['vocabTestProgress', variables.unitId]);
      } else {
        queryClient.invalidateQueries(['problemProgress', variables.unitId]);
      }

      // 문제 세트 업데이트
      queryClient.invalidateQueries(['practiceProblem', variables.unitId]);

      // 성공 알림 (실제 구현에서는 toast 등 사용)
      console.log(`답안 제출 성공! ${data.xpGained}XP 획득`);

      if (data.gamificationUpdate.leveledUp) {
        console.log(`🎉 레벨업! ${data.gamificationUpdate.level}레벨 달성`);
      }
    },

    onError: (error, variables, context) => {
      console.error('답안 제출 실패:', error);

      // 낙관적 업데이트 롤백
      if (context?.previousProgress) {
        queryClient.setQueryData(
          ['progress', variables.unitId],
          context.previousProgress
        );
      }

      if (context?.previousGamification) {
        queryClient.setQueryData(
          ['gamification'],
          context.previousGamification
        );
      }

      // 에러 알림 (실제 구현에서는 toast 등 사용)
      console.error('답안 제출에 실패했습니다. 다시 시도해주세요.');
    },

    onSettled: (data, error, variables) => {
      // 항상 실행되는 정리 작업
      queryClient.invalidateQueries(['practiceProblem', variables.unitId]);
    },
  });
};

/**
 * 답안 제출 상태 관리 훅
 */
export const useAnswerSubmissionState = () => {
  const mutation = useAnswerSubmission();

  const isSubmitting = mutation.isPending;
  const isSuccess = mutation.isSuccess;
  const isError = mutation.isError;
  const error = mutation.error;
  const data = mutation.data;

  const submitAnswer = async (params: SubmitAnswerParams) => {
    try {
      await mutation.mutateAsync(params);
      return { success: true, data: mutation.data };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    isSubmitting,
    isSuccess,
    isError,
    error,
    data,
    submitAnswer,
    reset: mutation.reset,
  };
};
