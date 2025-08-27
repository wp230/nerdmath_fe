import React from 'react';
import type { UserProfile } from '@/types/dashboard';

interface NerdMathWelcomeProps {
  profile?: UserProfile;
  isLoading?: boolean;
}

const NerdMathWelcome: React.FC<NerdMathWelcomeProps> = ({
  profile,
  isLoading,
}) => {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    
    if (hour < 6) return '새벽';
    if (hour < 12) return '아침';
    if (hour < 18) return '오후';
    return '저녁';
  };

  const getWelcomeMessage = (): string => {
    const messages = [
      '오늘도 새로운 수학 지식을 탐험해보세요! 🚀',
      '꾸준한 학습으로 실력을 키워나가고 있어요! 💪',
      '수학의 재미를 느끼며 함께 성장해나가요! 📚',
      '어려운 문제도 차근차근 풀어나가면 해결할 수 있어요! ✨',
      '오늘의 학습 목표를 달성해보세요! 🎯',
    ];
    
    // 간단한 로직으로 메시지 선택 (날짜 기반)
    const today = new Date().getDate();
    return messages[today % messages.length];
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  const userName = profile?.nickname || profile?.username || '학습자';
  const greeting = getGreeting();
  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {greeting} 시간이에요, {userName}님! 👋
      </h1>
      <p className="text-lg text-gray-600">
        {welcomeMessage}
      </p>
    </div>
  );
};

export default NerdMathWelcome;
