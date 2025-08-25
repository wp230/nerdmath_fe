import React, { useState } from 'react';

interface VocabCard {
  id: string;
  word: string;
  meaning: string;
  etymology: string;
  imageUrl?: string;
}

interface VocabCardsProps {
  vocabularies: VocabCard[];
  onProgressUpdate: (progress: number) => void;
}

export const VocabCards: React.FC<VocabCardsProps> = ({
  vocabularies,
  onProgressUpdate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = vocabularies[currentIndex];

  const handleCardComplete = (cardId: string) => {
    setCompletedCards((prev) => new Set([...prev, cardId]));

    // 진행률 계산 및 업데이트
    const newProgress = Math.round(
      ((completedCards.size + 1) / vocabularies.length) * 100
    );
    onProgressUpdate(newProgress);

    // 다음 카드로 이동
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  const handleNextCard = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (!currentCard) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">어휘 학습</h3>
        <div className="text-xs text-gray-500">
          {currentIndex + 1} / {vocabularies.length}
        </div>
      </div>

      {/* 진행률 표시 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">진행률</span>
          <span className="text-xs font-bold text-blue-600">
            {Math.round((completedCards.size / vocabularies.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${(completedCards.size / vocabularies.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="mb-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 text-center">
          <h4 className="text-lg font-bold text-gray-900 mb-3">
            {currentCard.word}
          </h4>

          {showAnswer ? (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">의미</p>
                <p className="text-sm text-gray-700">{currentCard.meaning}</p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">어원</p>
                <p className="text-xs text-gray-700">{currentCard.etymology}</p>
              </div>

              {currentCard.imageUrl && (
                <div className="bg-white rounded-lg p-3">
                  <img
                    src={currentCard.imageUrl}
                    alt={currentCard.word}
                    className="w-full h-24 object-cover rounded-lg mx-auto"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  카드를 클릭하여 답을 확인하세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="space-y-2">
        <button
          onClick={toggleAnswer}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {showAnswer ? '답 숨기기' : '답 보기'}
        </button>

        {/* 네비게이션 */}
        <div className="flex gap-2">
          <button
            onClick={handlePrevCard}
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
            onClick={handleNextCard}
            disabled={currentIndex === vocabularies.length - 1}
            className={`flex-1 px-3 py-1.5 rounded-lg transition-colors text-xs ${
              currentIndex === vocabularies.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            다음
          </button>
        </div>

        {/* 완료 버튼 */}
        {!completedCards.has(currentCard.id) && (
          <button
            onClick={() => handleCardComplete(currentCard.id)}
            className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            이 단어 완료하기 ✅
          </button>
        )}

        {completedCards.has(currentCard.id) && (
          <div className="w-full px-3 py-2 bg-green-100 text-green-800 rounded-lg text-center text-sm font-medium">
            완료됨 ✅
          </div>
        )}
      </div>

      {/* 카드 인디케이터 */}
      <div className="mt-3 flex justify-center gap-1.5">
        {vocabularies.map((_, index) => (
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
