'use client';

import { Unit, Chapter } from '@/types/course';

interface UnitBannerProps {
  unit: Unit;
  chapters?: Chapter[];
}

export default function UnitBanner({ unit, chapters }: UnitBannerProps) {
  return (
    <div
      className="w-full h-[350px] flex flex-col items-center justify-center text-center shadow-md p-8 mb-6"
      style={{ backgroundColor: unit.backgroundColor }}
    >
      <div className="mb-6">
        <h1 className="text-6xl font-bold font-DungGeunMo text-white mb-6">
          {unit.title}
        </h1>
        <p className="text-xl font-DungGeunMo text-white leading-relaxed max-w-3xl mx-auto">
          {unit.description}
        </p>
      </div>
    </div>
  );
}
