import React from 'react';

interface VocabResult {
  accuracy: number;
  wrongWords: string[];
  totalXP: number;
}

interface PracticeResult {
  accuracy: number;
  totalXP: number;
}

interface ResultSummaryModalProps {
  isOpen: boolean;
  vocabResults: VocabResult;
  practiceResults: PracticeResult;
  onGoToDashboard: () => void;
  onNextUnit: () => void;
  onClose: () => void;
}

export const ResultSummaryModal: React.FC<ResultSummaryModalProps> = ({
  isOpen,
  vocabResults,
  practiceResults,
  onGoToDashboard,
  onNextUnit,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalXP = vocabResults.totalXP + practiceResults.totalXP;
  const overallAccuracy = Math.round(
    (vocabResults.accuracy + practiceResults.accuracy) / 2
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">학습 완료!</h2>
          <p className="text-gray-600">
            수고하셨습니다! 이번 단원을 성공적으로 마쳤어요.
          </p>
        </div>

        {/* 전체 요약 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {overallAccuracy}%
              </div>
              <p className="text-sm text-gray-600">전체 정답률</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {totalXP}
              </div>
              <p className="text-sm text-gray-600">총 획득 XP</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">🏆</div>
              <p className="text-sm text-gray-600">단원 완료</p>
            </div>
          </div>
        </div>

        {/* 어휘 테스트 결과 */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            📚 어휘 테스트 결과
          </h3>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {vocabResults.accuracy}%
                </div>
                <p className="text-sm text-purple-700">정답률</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  +{vocabResults.totalXP}
                </div>
                <p className="text-sm text-purple-700">획득 XP</p>
              </div>
            </div>

            {vocabResults.wrongWords.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-purple-800 mb-2">
                  틀린 단어 목록:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {vocabResults.wrongWords.map((word, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 문제 풀이 결과 */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            🔢 문제 풀이 결과
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {practiceResults.accuracy}%
                </div>
                <p className="text-sm text-blue-700">정답률</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  +{practiceResults.totalXP}
                </div>
                <p className="text-sm text-blue-700">획득 XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* XP 획득 애니메이션 */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-yellow-500 animate-pulse">
            +{totalXP} XP 획득! 🎯
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            닫기
          </button>
          <button
            onClick={onNextUnit}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            다음 단원 학습하기
          </button>
          <button
            onClick={onGoToDashboard}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            대시보드로 이동
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h6 className="text-sm font-semibold text-yellow-800 mb-2">
            💡 학습 완료 팁
          </h6>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>• 틀린 문제는 나중에 복습해보세요</div>
            <div>• XP를 모아서 레벨업을 노려보세요</div>
            <div>• 다음 단원도 열심히 학습해보세요</div>
          </div>
        </div>
      </div>
    </div>
  );
};
