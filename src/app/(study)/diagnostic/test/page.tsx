'use client';

import { useState } from 'react';

export default function DiagnosticTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      id: 1,
      question: '다음 중 가장 큰 수는?',
      options: ['1/2', '0.6', '3/5', '0.4'],
      correct: 1,
    },
    {
      id: 2,
      question: '2x + 3 = 7일 때, x의 값은?',
      options: ['1', '2', '3', '4'],
      correct: 1,
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitTest = () => {
    // 테스트 결과 제출 로직
    console.log('Test submitted:', answers);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">진단 테스트 완료!</h2>
        <p className="text-gray-600 mb-6">결과를 분석하고 있습니다...</p>
        <button
          onClick={submitTest}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          결과 확인하기
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            문제 {currentQuestion + 1} / {questions.length}
          </div>
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
