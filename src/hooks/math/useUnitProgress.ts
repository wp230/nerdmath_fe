import { useState, useEffect, useRef, useCallback } from 'react';
import { UnitProgress } from '../../types/math';
import { ProgressService } from '../../service/math/progressService';
import { useMathStore } from '../../stores/mathStore';

export const useUnitProgress = (unitId: string) => {
  const [unitProgress, setUnitProgress] = useState<UnitProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ✅ retryCount를 useRef로 관리하여 불필요한 useEffect 재실행 방지
  const retryCountRef = useRef(0);

  const { updateUnitProgress } = useMathStore();

  // ✅ updateUnitProgress를 useCallback으로 안정화
  const updateUnitProgressStable = useCallback(
    (id: string, progress: UnitProgress) => {
      updateUnitProgress(id, progress);
    },
    []
  );

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await ProgressService.getUnitProgress(unitId);
        setUnitProgress(data);
        updateUnitProgressStable(unitId, data); // Zustand store에 저장
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '진행률을 불러오는데 실패했습니다.';
        setError(errorMessage);

        // API 실패 시 Mock 데이터로 폴백 시도
        if (retryCountRef.current === 0) {
          try {
            const mockData = ProgressService.getMockProgress(unitId);
            setUnitProgress(mockData);
            updateUnitProgressStable(unitId, mockData);
            setError(null); // 에러 해제
          } catch (mockErr) {
            console.error('Mock 데이터 로드도 실패:', mockErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (unitId) {
      loadProgress();
    }
  }, [unitId, updateUnitProgressStable]); // ✅ 안정화된 의존성만 포함

  // 재시도 함수
  const retry = () => {
    retryCountRef.current += 1;
    // 재시도 시 useEffect 재실행을 위해 unitId 변경 트리거
    if (unitId) {
      const loadProgress = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const data = await ProgressService.getUnitProgress(unitId);
          setUnitProgress(data);
          updateUnitProgressStable(unitId, data);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : '진행률을 불러오는데 실패했습니다.';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      loadProgress();
    }
  };

  return { unitProgress, isLoading, error, retry };
};
