'use client';

import React from 'react';
import VocabularyPackCard from './VocabularyPackCard';
import { useGetUnitsQuery } from '@/hooks/course/useCourseQueries';
import { useCommonVocabularyQuery } from '@/hooks/vocabulary/useVocabularyQueries';
import { Spinner } from '@/components/common';

const DUMMY_COMMON_VOCA_TYPES = [
  {
    type: 'sat_act',
    name: 'SAT/ACT 빈출 어휘',
    description: 'SAT/ACT 시험에 자주 나오는 어휘를 학습합니다.',
  },
];

const VocabularyPackList = () => {
  const {
    data: unitsData,
    isLoading: isUnitsLoading,
    isError: isUnitsError,
  } = useGetUnitsQuery();

  // For now, we fetch a single predefined common vocabulary pack.
  // This can be extended to fetch a list of available common packs.
  const {
    data: commonVocaData,
    isLoading: isCommonVocaLoading,
    isError: isCommonVocaError,
  } = useCommonVocabularyQuery(DUMMY_COMMON_VOCA_TYPES[0].type);

  if (isUnitsLoading || isCommonVocaLoading) {
    return <Spinner />;
  }

  if (isUnitsError || isCommonVocaError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4">단원별 어휘</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitsData?.items.map((unit) => (
            <VocabularyPackCard
              key={unit.unitId}
              packId={`unit-${unit.unitId}`}
              title={unit.title.ko}
              description={`${unit.chapterTitle} (${unit.grade}학년)`}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4">주제별 어휘</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonVocaData && (
            <VocabularyPackCard
              packId={`common-${commonVocaData.type}`}
              title={DUMMY_COMMON_VOCA_TYPES[0].name}
              description={DUMMY_COMMON_VOCA_TYPES[0].description}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default VocabularyPackList;
