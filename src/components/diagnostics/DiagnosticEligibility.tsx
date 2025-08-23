/**
 * DiagnosticEligibility 컴포넌트
 * 
 * 책임: 사용자의 진단 테스트 진행 자격 확인
 * - 진단 테스트 소개 및 안내 정보 제공
 * - 자격 확인 버튼 클릭 시 상위 컴포넌트에 결과 전달
 * 
 * Props:
 * - onCheck: 자격 확인 실행 함수
 * - loading: API 로딩 상태
 * - error: 에러 메시지
 */

'use client';

import { useState } from 'react';

interface DiagnosticEligibilityProps {
  onCheck: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const DiagnosticEligibility = ({ onCheck, loading, error }: DiagnosticEligibilityProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckEligibility = async () => {
    setIsChecking(true);
    try {
      await onCheck();
    } catch (err) {
      console.error('진단 자격 확인 실패:', err);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          진단 테스트
        </h2>
        <p className="text-gray-600">
          수학 실력을 진단하고 맞춤형 학습을 시작해보세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">진단 테스트란?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 현재 수학 실력을 정확히 파악</li>
            <li>• 개인 맞춤형 학습 계획 수립</li>
            <li>• 약점과 강점 분석</li>
            <li>• 효율적인 학습 경로 제시</li>
          </ul>
        </div>

        <button
          onClick={handleCheckEligibility}
          disabled={isChecking || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isChecking || loading ? '확인 중...' : '진단 테스트 시작하기'}
        </button>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
