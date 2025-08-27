'use client';

import { useState } from 'react';

export default function ConceptPage({
  params,
}: {
  params: { majorId: string; minorId: string };
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const conceptSteps = [
    {
      title: '개념 이해',
      content: '이 단원의 핵심 개념을 학습합니다.',
      duration: '5분',
    },
    {
      title: '예제 풀이',
      content: '개념을 바탕으로 예제 문제를 풀어봅니다.',
      duration: '10분',
    },
    {
      title: '연습 문제',
      content: '학습한 내용을 바탕으로 연습 문제를 풀어봅니다.',
      duration: '15분',
    },
  ];

  const handleNext = () => {
    if (currentStep < conceptSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    // 학습 완료 처리
    console.log('Concept completed:', params);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-100 text-green-800 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🎉 학습 완료!</h2>
          <p className="mb-6">이 단원의 개념 학습을 완료했습니다.</p>
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            다음 단계로
          </button>
        </div>
      </div>
    );
  }

  const currentConcept = conceptSteps[currentStep];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {params.majorId} - {params.minorId}
        </h1>
        <p className="text-gray-600">단계별 개념 학습을 진행합니다.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{currentConcept.title}</h2>
            <span className="text-sm text-gray-500">
              {currentConcept.duration}
            </span>
          </div>
          <p className="text-gray-700">{currentConcept.content}</p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / conceptSteps.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {currentStep + 1} / {conceptSteps.length}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentStep === conceptSteps.length - 1 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
