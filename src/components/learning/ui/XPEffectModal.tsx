import React, { useEffect, useState } from 'react';

interface XPEffectModalProps {
  isVisible: boolean;
  xpGained: number;
  isCorrect: boolean;
  onComplete: () => void;
}

export const XPEffectModal: React.FC<XPEffectModalProps> = ({
  isVisible,
  xpGained,
  isCorrect,
  onComplete,
}) => {
  const [showEffect, setShowEffect] = useState(false);
  const [showXP, setShowXP] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowEffect(true);

      // XP 애니메이션 순서
      const timer1 = setTimeout(() => setShowXP(true), 300);
      const timer2 = setTimeout(() => {
        setShowEffect(false);
        setShowXP(false);
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isVisible, onComplete]);

  if (!showEffect) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* XP 이펙트 모달 */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 transform transition-all duration-500 scale-100">
        {/* 결과 아이콘 */}
        <div className="text-center mb-4">
          <div
            className={`text-6xl mb-2 animate-bounce ${
              isCorrect ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isCorrect ? '✅' : '❌'}
          </div>
          <h3
            className={`text-xl font-bold ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isCorrect ? '정답입니다!' : '틀렸습니다'}
          </h3>
        </div>

        {/* XP 획득 애니메이션 */}
        {showXP && (
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-yellow-500 animate-ping mb-2">
              +{xpGained} XP
            </div>
            <div className="text-2xl text-yellow-400 animate-bounce">🎉</div>
          </div>
        )}

        {/* 진행률 표시 */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">XP 획득!</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(xpGained * 10, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* 추가 메시지 */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isCorrect
              ? '잘 풀었어요! 계속해서 다음 문제를 풀어보세요.'
              : '틀렸지만 XP는 획득했어요! 해설을 확인해보세요.'}
          </p>
        </div>
      </div>
    </div>
  );
};
