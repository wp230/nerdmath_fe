import React from 'react';

interface WarningModalProps {
  isOpen: boolean;
  currentProgress: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  currentProgress,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        {/* 경고 아이콘 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-pulse">⚠️</div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            잠깐! 아직 완료되지 않았어요
          </h3>
        </div>

        {/* 진행률 표시 */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {currentProgress}%
            </div>
            <p className="text-sm text-gray-600">현재 진행률</p>
          </div>

          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-center">목표: 100%</p>
        </div>

        {/* 경고 메시지 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 text-xl">💡</div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                아직 학습이 완료되지 않았습니다
              </h4>
              <div className="text-xs text-yellow-700 space-y-1">
                <div>• 어휘 테스트: {currentProgress >= 50 ? '✅' : '❌'}</div>
                <div>• 실전 문제: {currentProgress >= 100 ? '✅' : '❌'}</div>
                <div>• 완료 보너스 XP를 놓칠 수 있어요!</div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            계속 학습하기
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            그래도 나가기
          </button>
        </div>

        {/* 추가 안내 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            완료까지 약 {Math.ceil((100 - currentProgress) / 10)}문제 남았어요!
          </p>
        </div>
      </div>
    </div>
  );
};
