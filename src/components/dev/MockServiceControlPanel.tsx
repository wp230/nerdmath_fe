'use client';

import React, { useState, useEffect } from 'react';
import {
  mockServiceManager,
  MockServiceStatus,
} from '@/service/mockServiceManager';

export const MockServiceControlPanel: React.FC = () => {
  const [status, setStatus] = useState<MockServiceStatus | null>(null);

  useEffect(() => {
    // 초기 상태 로드
    setStatus(mockServiceManager.getStatus());

    // 상태 변경 리스너 등록
    const unsubscribe = mockServiceManager.addListener((newStatus) => {
      setStatus(newStatus);
    });

    return unsubscribe;
  }, []);

  if (!status) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Mock 모드 토글 버튼 */}
      <button
        onClick={() => mockServiceManager.toggleMockMode()}
        className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-200 font-medium ${
          status.config.isMockMode
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
        title={`Mock Mode: ${status.config.isMockMode ? 'ON' : 'OFF'}`}
      >
        🔧 Mock: {status.config.isMockMode ? 'ON' : 'OFF'}
      </button>

      {/* 상태 표시 */}
      <div className="mt-2 text-xs text-gray-600 bg-white/90 px-2 py-1 rounded text-center">
        {status.config.isMockMode ? '🟢 Mock Mode' : '🔴 API Mode'}
      </div>
    </div>
  );
};
