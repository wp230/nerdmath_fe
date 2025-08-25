import React from 'react';

interface LearningModeSelectorProps {
  onModeSelect: (mode: 'concept' | 'problem') => void;
  unitId: string;
}

export const LearningModeSelector: React.FC<LearningModeSelectorProps> = ({
  onModeSelect,
  unitId,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            학습 모드를 선택하세요
          </h1>
          <p className="text-xl text-gray-600">
            {unitId} 단원을 어떻게 학습하시겠습니까?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 개념 학습 카드 */}
          <div
            onClick={() => onModeSelect('concept')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                개념 학습
              </h3>
              <p className="text-lg text-blue-700 mb-6">
                영어로 수학 개념을 공부해요~
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  • 수학 개념 설명
                  <br />
                  • 실생활 예시
                  <br />• 연습 문제 풀이
                </p>
              </div>
            </div>
          </div>

          {/* 문제 풀이 카드 */}
          <div
            onClick={() => onModeSelect('problem')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-green-200"
          >
            <div className="text-center">
              <div className="text-6xl mb-6">✏️</div>
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                문제 풀이
              </h3>
              <p className="text-lg text-green-700 mb-6">
                어휘 테스트와 실전 문제가 준비되어있습니다~
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  • 어휘 테스트
                  <br />
                  • 실전 문제
                  <br />• XP 획득
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            💡 <strong>팁:</strong> 개념 학습을 먼저 완료하면 문제 풀이가 더
            쉬워집니다!
          </p>
        </div>
      </div>
    </div>
  );
};
