import React from 'react';
import { UnitData } from '../../../types/math';

interface UnitHeroProps {
  unit: UnitData;
}

export const UnitHero: React.FC<UnitHeroProps> = ({ unit }) => {
  return (
    <div 
      className="min-h-[300px] flex items-center justify-center text-white relative overflow-hidden"
      style={{ backgroundColor: unit.backgroundColor }}
    >
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
      
      {/* 내용 */}
      <div className="text-center relative z-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {unit.title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {unit.description}
        </p>
        
        {/* 단원 정보 배지 */}
        <div className="mt-6 flex justify-center gap-4">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            {unit.grade}학년
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            {unit.chapterTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
