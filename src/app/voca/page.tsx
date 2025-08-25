'use client';

import React from 'react';
import { VocabPackViewer } from '@/components/voca/containers/VocabPackViewer';

export default function VocaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">어휘 학습</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            수학 관련 영어 어휘를 체계적으로 학습하고, SAT/ACT 등 시험에 자주
            나오는 수학 용어를 마스터하세요
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <VocabPackViewer />
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            💡 팁: 어휘팩을 선택하여 상세 내용을 확인하고, 카드를 클릭하여 영어
            단어와 한글 뜻을 학습하세요
          </p>
        </div>
      </div>
    </div>
  );
}
