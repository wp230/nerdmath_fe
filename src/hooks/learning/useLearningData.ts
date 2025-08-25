import { useState, useEffect } from 'react';
import { LearningData, LearningProgress } from '../../types/learning';
import { LearningService } from '../../service/learning/learningService';

export const useLearningData = (unitId: string) => {
  const [learningData, setLearningData] = useState<LearningData | null>(null);
  const [learningProgress, setLearningProgress] = useState<LearningProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLearningData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 학습 데이터와 진행률을 병렬로 로드
        const [data, progress] = await Promise.all([
          LearningService.getLearningData(unitId),
          LearningService.getLearningProgress(unitId)
        ]);
        
        setLearningData(data);
        setLearningProgress(progress);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : '학습 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (unitId) {
      loadLearningData();
    }
  }, [unitId]);

  // 진행률 업데이트 함수
  const updateProgress = (section: 'concept' | 'vocab' | 'practice', progress: number) => {
    if (learningProgress) {
      setLearningProgress(prev => {
        if (!prev) return prev;
        
        const updated = { ...prev };
        updated[`${section}Progress`] = progress;
        
        // 전체 진행률 계산 (가중 평균)
        const totalProgress = Math.round(
          (updated.conceptProgress * 0.45) + 
          (updated.vocabProgress * 0.35) + 
          (updated.practiceProgress * 0.20)
        );
        
        updated.overallProgress = totalProgress;
        
        // 상태 업데이트
        if (totalProgress === 100) {
          updated.status = 'completed';
        } else if (totalProgress > 0) {
          updated.status = 'in_progress';
        } else {
          updated.status = 'not_started';
        }
        
        return updated;
      });
    }
  };

  // 특정 섹션 완료 처리
  const completeSection = (section: 'concept' | 'vocab' | 'practice') => {
    updateProgress(section, 100);
  };

  // 학습 완료 처리
  const completeLearning = async () => {
    try {
      const result = await LearningService.completeLearning(unitId);
      // 완료 결과 처리 (XP 획득, 레벨업 등)
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '학습 완료 처리에 실패했습니다.');
      throw err;
    }
  };

  return {
    learningData,
    learningProgress,
    isLoading,
    error,
    updateProgress,
    completeSection,
    completeLearning,
  };
};
