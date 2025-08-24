'use client';

import React from 'react';
import { Unit } from '../../types/learning';

interface UnitCardProps {
  unit: Unit;
  isSelected?: boolean;
  onClick?: () => void;
  progress?: number;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  isSelected = false,
  onClick,
  progress = 0,
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg p-6 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? 'ring-2 ring-blue-500 shadow-lg scale-105'
            : 'hover:shadow-md hover:scale-102'
        }
      `}
      style={{ backgroundColor: unit.backgroundColor }}
      onClick={onClick}
    >
      {/* 진행률 표시 */}
      {progress > 0 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* 단원 제목 */}
      <h3 className="text-xl font-bold text-white mb-2">{unit.title}</h3>

      {/* 단원 설명 */}
      <p className="text-white/90 text-sm leading-relaxed">
        {unit.description}
      </p>

      {/* 진행률 텍스트 */}
      {progress > 0 && (
        <div className="mt-4 text-white/80 text-sm">진행률: {progress}%</div>
      )}

      {/* 선택 표시 */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
