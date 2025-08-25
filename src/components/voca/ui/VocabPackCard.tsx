import React from 'react';
import { VocabPack } from '@/types/voca';

interface VocabPackCardProps {
  pack: VocabPack;
  onClick: () => void;
}

export const VocabPackCard: React.FC<VocabPackCardProps> = ({
  pack,
  onClick,
}) => {
  console.log('🎯 VocabPackCard 렌더링:', pack);
  console.log('🎯 VocabPackCard 스타일 확인:', {
    category: pack.category,
    title: pack.title,
    description: pack.description,
    vocabCount: pack.vocabCount,
  });

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-blue-200 overflow-hidden relative min-h-[200px]"
      style={{
        backgroundColor: 'white !important',
        minHeight: '200px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 카드 헤더 - 이미지 대신 텍스트 강조 */}
      <div
        className="h-32 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
        style={{
          background:
            'linear-gradient(to bottom right, #eff6ff, #e0e7ff) !important',
          height: '128px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div className="text-center">
          <div
            className="text-4xl mb-2"
            style={{ fontSize: '36px', marginBottom: '8px' }}
          >
            📚
          </div>
          <div
            className="text-sm text-indigo-600 font-medium"
            style={{ fontSize: '14px', color: '#4f46e5', fontWeight: '500' }}
          >
            {pack.category === 'math_term' ? '수학 용어' : 'SAT/ACT'}
          </div>
        </div>
      </div>

      {/* 카드 내용 */}
      <div
        className="p-4 bg-white"
        style={{
          backgroundColor: 'white !important',
          padding: '16px',
          color: '#1f2937',
        }}
      >
        <h3
          className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937 !important',
            marginBottom: '8px',
          }}
        >
          {pack.title}
        </h3>

        <p
          className="text-sm text-gray-600 mb-3 line-clamp-2"
          style={{
            fontSize: '14px',
            color: '#4b5563 !important',
            marginBottom: '12px',
          }}
        >
          {pack.description}
        </p>

        {/* 카테고리 및 어휘 수 */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            style={{
              backgroundColor: '#e0e7ff !important',
              color: '#3730a3 !important',
            }}
          >
            {pack.category === 'math_term'
              ? '수학 용어'
              : pack.category === 'sat_act'
                ? 'SAT/ACT'
                : '일반'}
          </span>

          <span
            className="text-sm text-gray-500"
            style={{ color: '#6b7280 !important' }}
          >
            {pack.vocabCount}개 어휘
          </span>
        </div>
      </div>

      {/* 디버깅용 정보 */}
      <div
        className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full z-10"
        style={{
          backgroundColor: '#fef3c7 !important',
          color: '#92400e !important',
          zIndex: 10,
        }}
      >
        {pack.unitId ? 'Unit' : 'Type'}
      </div>

      {/* 호버 효과 - 투명도 문제 해결 */}
      <div
        className="absolute inset-0 transition-all duration-200 rounded-lg pointer-events-none"
        style={{
          background: 'transparent',
          opacity: 0,
          pointerEvents: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.opacity = '0';
        }}
      />
    </div>
  );
};
