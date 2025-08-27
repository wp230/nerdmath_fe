'use client';

import { useState } from 'react';

export default function ProblemPage({
  params,
}: {
  params: { majorId: string; minorId: string };
}) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const problems = [
    {
      id: 1,
      question: '2x + 3 = 7일 때, x의 값은?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      explanation: '2x + 3 = 7에서 양변에 3을 빼면 2x = 4, 따라서 x = 2입니다.',
    },
    {
      id: 2,
      question: '다음 중 가장 큰 수는?',
      options: ['1/2', '0.6', '3/5', '0.4'],
      correct: 1,
      explanation:
        '모든 수를 소수로 변환하면 0.5, 0.6, 0.6, 0.4이므로 0.6이 가장 큽니다.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === problems[currentProblem].correct;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const currentProblemData = problems[currentProblem];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {params.majorId} - {params.minorId}
        </h1>
        <p className="text-gray-600">문제 풀이를 통해 실력을 향상시켜보세요.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            문제 {currentProblem + 1} / {problems.length}
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {currentProblemData.question}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {currentProblemData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isCorrect !== null}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                selectedAnswer === index
                  ? isCorrect === null
                    ? 'border-blue-500 bg-blue-50'
                    : index === currentProblemData.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {isCorrect !== null && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <h3 className="font-semibold mb-2">
              {isCorrect ? '정답입니다! 🎉' : '틀렸습니다. 다시 생각해보세요.'}
            </h3>
            <p className="text-sm">{currentProblemData.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentProblem(Math.max(0, currentProblem - 1))}
            disabled={currentProblem === 0}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            이전
          </button>

          {isCorrect === null ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              답안 제출
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {currentProblem === problems.length - 1 ? '완료' : '다음'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
