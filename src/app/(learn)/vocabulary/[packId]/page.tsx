'use client';

import { useState } from 'react';

export default function VocabularyPackPage({
  params,
}: {
  params: { packId: string };
}) {
  const [currentWord, setCurrentWord] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const vocabData = {
    basic: {
      title: '기초 수학 용어',
      words: [
        { term: '자연수', definition: '1, 2, 3, 4, ...와 같이 셀 수 있는 수' },
        { term: '정수', definition: '자연수, 0, 음의 정수를 포함한 수' },
        { term: '유리수', definition: '두 정수의 비로 나타낼 수 있는 수' },
        { term: '무리수', definition: '유리수가 아닌 실수' },
        { term: '실수', definition: '유리수와 무리수를 포함한 모든 수' },
      ],
    },
    algebra: {
      title: '대수학 용어',
      words: [
        { term: '방정식', definition: '미지수를 포함한 등식' },
        {
          term: '함수',
          definition: '한 변수의 값에 따라 다른 변수의 값이 결정되는 관계',
        },
        { term: '도함수', definition: '함수의 변화율을 나타내는 함수' },
        { term: '적분', definition: '함수의 면적이나 부피를 구하는 연산' },
      ],
    },
    geometry: {
      title: '기하학 용어',
      words: [
        { term: '점', definition: '위치만 있고 크기가 없는 기하학적 대상' },
        { term: '선', definition: '점들이 연속적으로 이어진 기하학적 대상' },
        {
          term: '면',
          definition: '선들이 연속적으로 이어진 2차원 기하학적 대상',
        },
        { term: '각', definition: '두 직선이 만나서 이루는 도형' },
      ],
    },
    calculus: {
      title: '미적분학 용어',
      words: [
        { term: '극한', definition: '함수가 특정 값에 가까워질 때의 값' },
        { term: '연속성', definition: '함수가 끊어지지 않고 이어지는 성질' },
        { term: '미분가능성', definition: '함수가 미분 가능한 성질' },
        { term: '정적분', definition: '함수의 그래프와 x축 사이의 면적' },
      ],
    },
  };

  const pack =
    vocabData[params.packId as keyof typeof vocabData] || vocabData.basic;
  const currentVocab = pack.words[currentWord];

  const handleNext = () => {
    if (currentWord < pack.words.length - 1) {
      setCurrentWord(currentWord + 1);
      setShowDefinition(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    // 학습 완료 처리
    console.log('Vocabulary pack completed:', params.packId);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-100 text-green-800 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🎉 용어 학습 완료!</h2>
          <p className="mb-6">{pack.title}의 모든 용어를 학습했습니다.</p>
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            완료하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{pack.title}</h1>
        <p className="text-gray-600">
          용어 {currentWord + 1} / {pack.words.length}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            {currentVocab.term}
          </h2>

          {showDefinition ? (
            <div className="text-lg text-gray-700">
              {currentVocab.definition}
            </div>
          ) : (
            <button
              onClick={() => setShowDefinition(true)}
              className="text-lg text-gray-500 hover:text-gray-700 underline"
            >
              정의 보기
            </button>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentWord(Math.max(0, currentWord - 1));
              setShowDefinition(false);
            }}
            disabled={currentWord === 0}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            이전
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentWord === pack.words.length - 1 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
