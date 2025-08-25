import React, { useState } from 'react';

interface PracticeProblem {
  id: string;
  type: 'math' | 'vocab';
  question: string;
  answer: string;
  explanation: string;
  hint: string;
}

interface PracticeProblemsProps {
  problems: PracticeProblem[];
  onProgressUpdate: (progress: number) => void;
}

export const PracticeProblems: React.FC<PracticeProblemsProps> = ({
  problems,
  onProgressUpdate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(
    new Set()
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentProblem = problems[currentIndex];

  const handleSubmit = () => {
    const correct =
      userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setCompletedProblems((prev) => new Set([...prev, currentProblem.id]));

      // 진행률 계산 및 업데이트
      const newProgress = Math.round(
        ((completedProblems.size + 1) / problems.length) * 100
      );
      onProgressUpdate(newProgress);
    }
  };

  const handleNextProblem = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setShowExplanation(false);
      setIsCorrect(null);
    }
  };

  const handlePrevProblem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setUserAnswer('');
      setShowHint(false);
      setShowExplanation(false);
      setIsCorrect(null);
    }
  };

  const resetCurrentProblem = () => {
    setUserAnswer('');
    setShowHint(false);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  if (!currentProblem) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">연습 문제</h3>
        <div className="text-xs text-gray-500">
          {currentIndex + 1} / {problems.length}
        </div>
      </div>

      {/* 진행률 표시 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">진행률</span>
          <span className="text-xs font-bold text-blue-600">
            {Math.round((completedProblems.size / problems.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${(completedProblems.size / problems.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 문제 타입 표시 */}
      <div className="mb-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            currentProblem.type === 'math'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {currentProblem.type === 'math' ? '🔢 수학 문제' : '📚 어휘 문제'}
        </span>
      </div>

      {/* 문제 내용 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">문제</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-800 leading-relaxed">
            {currentProblem.question}
          </p>
        </div>
      </div>

      {/* 답안 입력 */}
      {!showExplanation && (
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            답안을 입력하세요
          </label>
          <input
            type="text"
            id="answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="답을 입력하세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
      )}

      {/* 힌트 */}
      {!showExplanation && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            {showHint ? '힌트 숨기기' : '힌트 보기 💡'}
          </button>
          {showHint && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-xs">{currentProblem.hint}</p>
            </div>
          )}
        </div>
      )}

      {/* 제출 버튼 */}
      {!showExplanation && (
        <button
          onClick={handleSubmit}
          disabled={!userAnswer.trim()}
          className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            userAnswer.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          답안 제출
        </button>
      )}

      {/* 결과 및 해설 */}
      {showExplanation && (
        <div className="mb-4">
          <div
            className={`p-3 rounded-lg mb-3 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
              <span
                className={`font-semibold text-sm ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {isCorrect ? '정답입니다!' : '틀렸습니다'}
              </span>
            </div>
            <p
              className={`text-xs ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {isCorrect ? '훌륭합니다!' : `정답: ${currentProblem.answer}`}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="font-semibold text-blue-800 mb-1 text-sm">해설</h5>
            <p className="text-blue-700 text-xs leading-relaxed">
              {currentProblem.explanation}
            </p>
          </div>
        </div>
      )}

      {/* 컨트롤 버튼 */}
      <div className="space-y-2">
        {/* 네비게이션 */}
        <div className="flex gap-2">
          <button
            onClick={handlePrevProblem}
            disabled={currentIndex === 0}
            className={`flex-1 px-3 py-1.5 rounded-lg transition-colors text-xs ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            이전
          </button>

          <button
            onClick={handleNextProblem}
            disabled={currentIndex === problems.length - 1}
            className={`flex-1 px-3 py-1.5 rounded-lg transition-colors text-xs ${
              currentIndex === problems.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            다음
          </button>
        </div>

        {/* 재시도 버튼 */}
        {showExplanation && !isCorrect && (
          <button
            onClick={resetCurrentProblem}
            className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            다시 시도하기 🔄
          </button>
        )}

        {/* 완료 상태 표시 */}
        {completedProblems.has(currentProblem.id) && (
          <div className="w-full px-3 py-2 bg-green-100 text-green-800 rounded-lg text-center text-sm font-medium">
            완료됨 ✅
          </div>
        )}
      </div>

      {/* 문제 인디케이터 */}
      <div className="mt-3 flex justify-center gap-1.5">
        {problems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-blue-600'
                : index < currentIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
