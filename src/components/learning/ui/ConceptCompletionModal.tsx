import React from 'react';
import { ConceptLearningResult } from '@/types/learning';

interface ConceptCompletionModalProps {
  result: ConceptLearningResult;
  onGoToDashboard: () => void;
  onGoToProblemSolving: () => void;
}

export const ConceptCompletionModal: React.FC<ConceptCompletionModalProps> = ({
  result,
  onGoToDashboard,
  onGoToProblemSolving,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-4 w-full">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">개념 학습 완료!</h1>
          <p className="text-lg text-blue-700">영어로 수학 개념을 모두 마쳤습니다!</p>
        </div>

        {/* 결과 요약 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 mb-2">{result.xpGained} XP</div>
          <div className="text-blue-700">개념 학습 완료 보상</div>
        </div>

        {/* 게이미피케이션 정보 */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎮 레벨 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Lv.{result.gamificationUpdate.level}</div>
              <div className="text-gray-600">현재 레벨</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{result.gamificationUpdate.xp}</div>
              <div className="text-gray-600">현재 XP</div>
            </div>
          </div>
          {result.gamificationUpdate.leveledUp && (
            <div className="mt-4 text-center">
              <div className="text-lg font-bold text-yellow-600">🎉 레벨업!</div>
            </div>
          )}
        </div>

        {/* 선택지 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onGoToDashboard}
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            🏠 대시보드로
          </button>
          <button
            onClick={onGoToProblemSolving}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            ✏️ 문제 풀이
          </button>
        </div>
      </div>
    </div>
  );
};
