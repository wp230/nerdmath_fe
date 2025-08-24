import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LearningService } from '../service/learningService';
import { useLearningStore } from '../stores/learningStore';
import { Unit, Chapter, UnitGradeInfo, SelectedUnit } from '../types/learning';

// 단원 선택 관련 훅
export const useUnitSelection = (unitId: string) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [unitGradeInfo, setUnitGradeInfo] = useState<UnitGradeInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const { selectUnit } = useLearningStore();
  const router = useRouter();

  // 단원 정보 로드
  useEffect(() => {
    const loadUnitData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [unitData, chaptersData, gradeInfo] = await Promise.all([
          LearningService.getUnit(unitId),
          LearningService.getChapters(unitId),
          LearningService.getUnitGradeInfo(unitId),
        ]);

        if (!unitData) {
          setError('단원을 찾을 수 없습니다.');
          return;
        }

        setUnit(unitData);
        setChapters(chaptersData);
        setUnitGradeInfo(gradeInfo);

        // 첫 번째 학년의 첫 번째 챕터를 기본 선택
        if (chaptersData.length > 0) {
          const firstGrade = chaptersData[0].grade;
          setSelectedGrade(firstGrade);
          const firstChapter = chaptersData.find((c) => c.grade === firstGrade);
          if (firstChapter) {
            setSelectedChapter(firstChapter.chapter);
          }
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading unit data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (unitId) {
      loadUnitData();
    }
  }, [unitId]);

  // 선택된 학년의 챕터 목록
  const chaptersByGrade = chapters.filter(
    (chapter) => chapter.grade === selectedGrade
  );

  // 학년 변경 시 첫 번째 챕터 자동 선택 (단, 사용자가 이미 선택한 소단원이 있으면 유지)
  useEffect(() => {
    if (chaptersByGrade.length > 0) {
      // 현재 선택된 소단원이 새 학년에 존재하는지 확인
      const currentChapterExists = chaptersByGrade.some(
        (c) => c.chapter === selectedChapter
      );

      // 현재 선택된 소단원이 새 학년에 없으면 첫 번째로 설정
      if (!currentChapterExists) {
        setSelectedChapter(chaptersByGrade[0].chapter);
      }
    }
  }, [selectedGrade, chaptersByGrade, selectedChapter]);

  // 단원 선택 및 학습 시작
  const startLearning = () => {
    if (!selectedChapter || !unit) return;

    const selectedUnit = LearningService.createSelectedUnit(
      unitId,
      selectedGrade,
      selectedChapter
    );
    if (selectedUnit) {
      selectUnit(selectedUnit);
      router.push(`/learning/${unitId}`);
    }
  };

  // 선택 가능한 학년 목록
  const availableGrades = unitGradeInfo
    ? Object.keys(unitGradeInfo.gradeNames).map(Number).sort()
    : [];

  return {
    unit,
    chapters,
    unitGradeInfo,
    loading,
    error,
    selectedGrade,
    selectedChapter,
    chaptersByGrade,
    availableGrades,
    setSelectedGrade,
    setSelectedChapter,
    startLearning,
  };
};

// 학습 진행 상태 관련 훅
export const useLearningProgress = (unitId: string) => {
  const { progress, totalXP } = useLearningStore();
  const currentProgress = progress[unitId];

  const progressPercentage = currentProgress
    ? Math.round(
        (currentProgress.problemsCompleted / currentProgress.totalProblems) *
          100
      )
    : 0;

  const isConceptCompleted = currentProgress?.conceptCompleted || false;
  const isUnitCompleted =
    currentProgress?.problemsCompleted >= (currentProgress?.totalProblems || 0);

  return {
    currentProgress,
    totalXP,
    progressPercentage,
    isConceptCompleted,
    isUnitCompleted,
  };
};

// 학습 추천 관련 훅
export const useLearningRecommendation = () => {
  const [recommendedUnit, setRecommendedUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(false);

  const loadRecommendation = async () => {
    try {
      setLoading(true);
      const unit = await LearningService.getRecommendedUnit();
      setRecommendedUnit(unit);
    } catch (error) {
      console.error('Error loading recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendation();
  }, []);

  return {
    recommendedUnit,
    loading,
    refreshRecommendation: loadRecommendation,
  };
};
