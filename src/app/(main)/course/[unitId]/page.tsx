'use client';

import {
  useGetUnitsQuery,
  useGetUnitGradeNamesQuery,
  useGetAllUnitChaptersQuery,
} from '@/hooks/course/useCourseQueries';
import {
  useProfileQuery,
  useMyCharacterQuery,
  useOverallProgressQuery,
  useActivityStatsQuery,
} from '@/hooks/dashboard/useDashboardQueries';
import { UnitBanner, UnitCard } from '@/components/course';
import { ProfileCard, TodayStats } from '@/components/dashboard';
import Spinner from '@/components/common/Spinner';
import { useParams } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const unitId = params.unitId as string;

  // Course 데이터
  const { data: units, isLoading: unitsLoading } = useGetUnitsQuery();
  const { data: unitGradeNames, isLoading: gradeNamesLoading } =
    useGetUnitGradeNamesQuery();
  const { data: allUnitChapters, isLoading: chaptersLoading } =
    useGetAllUnitChaptersQuery();

  // Dashboard 데이터 (오른쪽 사이드바용)
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: character, isLoading: characterLoading } =
    useMyCharacterQuery();
  const { data: overallProgress, isLoading: progressLoading } =
    useOverallProgressQuery();
  const { data: activityStats, isLoading: statsLoading } =
    useActivityStatsQuery();

  const isLoading = unitsLoading || gradeNamesLoading || chaptersLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!units || !unitGradeNames || !allUnitChapters) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  // 현재 unitId에 해당하는 unit 찾기
  const currentUnit = units.find((unit) => unit.unitId === unitId);
  const unitGradeInfo = currentUnit ? unitGradeNames[currentUnit.unitId] : null;

  if (!currentUnit || !unitGradeInfo) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">해당 단원을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnitBanner
        unit={currentUnit}
        chapters={allUnitChapters[currentUnit.unitId]}
      />
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* 왼쪽 섹션 - 메인 콘텐츠 */}
        <div className="flex-1 space-y-6">
          {/* UnitBanner - CourseHeader 스타일 */}

          {/* UnitCard - GradeChapterList 스타일 */}
          <UnitCard unit={currentUnit} unitGradeInfo={unitGradeInfo} />
        </div>

        {/* 오른쪽 섹션 - 사이드바 */}
        <div className="w-80 space-y-6">
          {/* ProfileCard (작게) */}
          <ProfileCard
            profile={profile}
            character={character}
            overallProgress={overallProgress}
            isLoading={profileLoading || characterLoading || progressLoading}
          />

          {/* TodayStats */}
          <TodayStats activityStats={activityStats} isLoading={statsLoading} />
        </div>
      </div>
    </div>
  );
}
