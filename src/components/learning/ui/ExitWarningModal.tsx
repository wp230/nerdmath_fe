import React from 'react';

interface ExitWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'concept' | 'problem';
  progress: number;
  title?: string;
}

export const ExitWarningModal: React.FC<ExitWarningModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  progress,
  title = '경고'
}) => {
  if (!isOpen) return null;

  const getWarningMessage = () => {
    if (type === 'concept') {
      if (progress === 0) {
        return '아직 학습을 시작하지 않았습니다. 정말 나가시겠습니까?';
      } else if (progress < 100) {
        return `개념 학습 진행률이 ${progress}%입니다. 진행 상태가 저장되지 않습니다. 정말 나가시겠습니까?`;
      } else {
        return '개념 학습이 완료되었습니다. 나가시겠습니까?';
      }
    } else {
      if (progress < 100) {
        return `문제 풀이 진행률이 ${progress}%입니다. 아쉽다! 계속 진행하시겠습니까?`;
      } else {
        return '문제 풀이가 완료되었습니다. 나가시겠습니까?';
      }
    }
  };

  const getWarningIcon = () => {
    if (type === 'concept') {
      if (progress === 0) return '⚠️';
      if (progress < 100) return '❌';
      return '✅';
    } else {
      if (progress < 100) return '😢';
      return '🎉';
    }
  };

  const getConfirmButtonText = () => {
    if (type === 'concept') {
      if (progress === 0) return '나가기';
      if (progress < 100) return '나가기 (진행상태 손실)';
      return '나가기';
    } else {
      if (progress < 100) return '계속 진행';
      return '나가기';
    }
  };

  const getConfirmButtonStyle = () => {
    if (type === 'concept') {
      if (progress === 0) return 'bg-gray-600 hover:bg-gray-700';
      if (progress < 100) return 'bg-red-600 hover:bg-red-700';
      return 'bg-blue-600 hover:bg-blue-700';
    } else {
      if (progress < 100) return 'bg-green-600 hover:bg-green-700';
      return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 w-full">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{getWarningIcon()}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        </div>

        {/* 메시지 */}
        <div className="mb-8">
          <p className="text-gray-700 text-center leading-relaxed">
            {getWarningMessage()}
          </p>
          
          {/* 진행률 표시 */}
          {progress > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">현재 진행률</span>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors font-medium ${getConfirmButtonStyle()}`}
          >
            {getConfirmButtonText()}
          </button>
        </div>

        {/* 추가 안내 */}
        {type === 'concept' && progress > 0 && progress < 100 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 text-center">
              💡 <strong>팁:</strong> 학습을 완료하면 XP를 획득할 수 있습니다!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
