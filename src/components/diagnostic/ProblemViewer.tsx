'use client';

import { ProblemResponse, ProblemChoice } from '@/types/diagnostic';
import Image from 'next/image';
import { useState } from 'react';

interface ProblemViewerProps {
  problem: ProblemResponse;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  problemNumber?: number;
  totalProblems?: number;
}

export default function ProblemViewer({
  problem,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  isSubmitting = false,
  problemNumber,
  totalProblems,
}: ProblemViewerProps) {
  const [textAnswer, setTextAnswer] = useState('');

  const handleTextAnswerChange = (value: string) => {
    setTextAnswer(value);
    onSelectAnswer(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedAnswer && onSubmit && !isSubmitting) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 문제 헤더 */}
      {(problemNumber || totalProblems) && (
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              문제 {problemNumber} / {totalProblems}
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>학년: {problem.grade}학년</span>
              <span>난이도: {problem.level}</span>
              <span>유형: {problem.type}</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* 문제 본문 */}
        <div className="mb-6">
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
            {problem.content.stem.text}
          </div>

          {/* 문제 이미지 */}
          {problem.imageUrl && (
            <div className="relative w-full h-64 mb-4 mt-6">
              <Image
                src={problem.imageUrl}
                alt="문제 이미지"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        {/* 답안 선택 영역 */}
        <div className="space-y-4">
          {problem.type === '객관식' && problem.content.choices ? (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                보기를 선택하세요
              </h3>
              {problem.content.choices.map((choice: ProblemChoice, index) => (
                <label
                  key={choice.key}
                  className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswer === choice.key
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isSubmitting ? 'pointer-events-none opacity-70' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={choice.key}
                    checked={selectedAnswer === choice.key}
                    onChange={() => onSelectAnswer(choice.key)}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-start space-x-3 w-full">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        selectedAnswer === choice.key
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswer === choice.key && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700 mr-2">
                        {choice.key}
                      </span>
                      <span className="text-gray-800">{choice.text}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            // 주관식 답안 입력
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">
                답을 입력하세요
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => handleTextAnswerChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="답을 입력해주세요..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isSubmitting ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                />
                {textAnswer && (
                  <div className="absolute right-3 top-3 text-green-500">✓</div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Enter 키를 누르면 답을 제출할 수 있습니다
              </p>
            </div>
          )}
        </div>

        {/* 문제 메타 정보 */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
