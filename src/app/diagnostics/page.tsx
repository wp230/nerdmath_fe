'use client';

import React from 'react';
import { DiagnosticsContainer } from '@/components/diagnostics/DiagnosticsContainer';

// 실제 환경에서는 사용자 인증 정보를 가져와야 함
const MOCK_USER_ID = 12345;

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">진단 테스트</h1>
          <p className="text-lg text-gray-600">
            수학 실력을 진단하고 맞춤 학습을 시작해보세요
          </p>
        </div>

        <DiagnosticsContainer userId={MOCK_USER_ID} />
      </div>
    </div>
  );
}
