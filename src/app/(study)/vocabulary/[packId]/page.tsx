'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

const VocabularyCard = ({ voca }: { voca: any }) => {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md min-h-[150px] flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold">{voca.word}</h3>
        {showMeaning && <p className="text-gray-700 mt-2">{voca.meaning}</p>}
      </div>
      <button
        onClick={() => setShowMeaning(!showMeaning)}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded self-start hover:bg-gray-300"
      >
        {showMeaning ? '숨기기' : '뜻 보기'}
      </button>
    </div>
  );
};

const VocabularyDetailPage = () => {
  const params = useParams();
  const packId = params.packId as string;
  const [isTestMode, setIsTestMode] = useState(false);

  const { type, id } = useMemo(() => {
    if (!packId) return { type: null, id: null };
    const [packType, ...rest] = packId.split('-');
    return { type: packType, id: rest.join('-') };
  }, [packId]);

  const {
    data: unitVocaData,
    isLoading: isUnitVocaLoading,
    isError: isUnitVocaError,
  } = useUnitVocabularyQuery(id as string, type === 'unit');

  const {
    data: commonVocaData,
    isLoading: isCommonVocaLoading,
    isError: isCommonVocaError,
  } = useCommonVocabularyQuery(id as string, type === 'common');

  const {
    data: testData,
    isLoading: isTestLoading,
    isError: isTestError,
  } = useVocabularyTestQuery(id as string, type === 'unit' && isTestMode);

  const isLoading = isUnitVocaLoading || isCommonVocaLoading;
  const isError = isUnitVocaError || isCommonVocaError;

  const vocabularyData =
    type === 'unit' ? unitVocaData?.data : commonVocaData?.data;

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading vocabulary pack.</div>;
  if (!vocabularyData) return <div>No vocabulary found.</div>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          {type === 'unit' ? '단원별' : '주제별'} 어휘 학습
        </h1>
      </header>
      <main>
        <div className="flex justify-end mb-4">
          {type === 'unit' && (
            <button
              onClick={() => setIsTestMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              테스트 시작
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabularyData.vocabularies.map((voca) => (
            <VocabularyCard key={voca.vocaId} voca={voca} />
          ))}
        </div>
        {isTestLoading && <Spinner />}
        {isTestError && <div>테스트를 불러오는 중 오류가 발생했습니다.</div>}
        {testData && isTestMode && (
          <VocabularyTestModal
            problems={testData.data.testSet.problems}
            onClose={() => setIsTestMode(false)}
          />
        )}
      </main>
    </div>
  );
};

export default VocabularyDetailPage;
