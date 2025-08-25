import { useState, useEffect, useRef, useCallback } from 'react';
import { UnitData } from '../../types/math';
import { UnitService } from '../../service/math/unitService';
import { useMathStore } from '../../stores/mathStore';

export const useUnitData = (unitId: string) => {
  const [unitData, setUnitData] = useState<UnitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ✅ retryCount를 useRef로 관리하여 불필요한 useEffect 재실행 방지
  const retryCountRef = useRef(0);

  const { setCurrentUnit } = useMathStore();

  // ✅ setCurrentUnit을 useCallback으로 안정화
  const setCurrentUnitStable = useCallback((unit: UnitData) => {
    setCurrentUnit(unit);
  }, []);

  useEffect(() => {
    const loadUnitData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await UnitService.getUnit(unitId);
        setUnitData(data);
        setCurrentUnitStable(data); // Zustand store에 저장
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '단원 데이터를 불러오는데 실패했습니다.';
        setError(errorMessage);

        // API 실패 시 Mock 데이터로 폴백 시도
        if (retryCountRef.current === 0) {
          try {
            const mockData = UnitService.getMockUnit(unitId);
            setUnitData(mockData);
            setCurrentUnitStable(mockData);
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
      loadUnitData();
    }
  }, [unitId, setCurrentUnitStable]); // ✅ 안정화된 의존성만 포함

  // 재시도 함수
  const retry = () => {
    retryCountRef.current += 1;
    // 재시도 시 useEffect 재실행을 위해 unitId 변경 트리거
    if (unitId) {
      const loadUnitData = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const data = await UnitService.getUnit(unitId);
          setUnitData(data);
          setCurrentUnitStable(data);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : '단원 데이터를 불러오는데 실패했습니다.';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      loadUnitData();
    }
  };

  return { unitData, isLoading, error, retry };
};
