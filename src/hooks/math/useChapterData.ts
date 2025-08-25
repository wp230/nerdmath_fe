import { useState, useEffect, useRef } from 'react';
import { ChapterData } from '../../types/math';
import { UnitService } from '../../service/math/unitService';

export const useChapterData = (unitId: string) => {
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ✅ retryCount를 useRef로 관리하여 불필요한 useEffect 재실행 방지
  const retryCountRef = useRef(0);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await UnitService.getChapters(unitId);
        setChapters(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '소단원 데이터를 불러오는데 실패했습니다.';
        setError(errorMessage);

        // API 실패 시 Mock 데이터로 폴백 시도
        if (retryCountRef.current === 0) {
          try {
            const mockData = UnitService.getMockChapters(unitId);
            setChapters(mockData);
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
      loadChapters();
    }
  }, [unitId]); // ✅ retryCount 제거

  // 재시도 함수
  const retry = () => {
    retryCountRef.current += 1;
    // 재시도 시 useEffect 재실행을 위해 unitId 변경 트리거
    if (unitId) {
      const loadChapters = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const data = await UnitService.getChapters(unitId);
          setChapters(data);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : '소단원 데이터를 불러오는데 실패했습니다.';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      loadChapters();
    }
  };

  return { chapters, isLoading, error, retry };
};
