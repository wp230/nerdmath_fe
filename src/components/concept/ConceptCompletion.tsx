'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

interface ConceptCompletionProps {
  unitId: string;
  xpGained: number;
}

const ConceptCompletion: React.FC<ConceptCompletionProps> = ({
  unitId,
  xpGained,
}) => {
  const router = useRouter();

  const handleReturn = () => {
    router.push(`/course/${unitId}`);
  };

  return (
    <div className="max-w-2xl mx-auto text-center p-8">
      <div className="bg-green-100 text-green-800 p-8 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">🎉 학습 완료!</h2>
        <p className="mb-6 text-lg">
          이 단원의 개념 학습을 성공적으로 마쳤습니다.
        </p>

        {xpGained > 0 && (
          <div className="inline-block bg-yellow-200 text-yellow-800 font-bold px-4 py-2 rounded-full mb-8">
            +{xpGained} XP 획득!
          </div>
        )}

        <Button onClick={handleReturn} size="lg">
          단원 페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default ConceptCompletion;
