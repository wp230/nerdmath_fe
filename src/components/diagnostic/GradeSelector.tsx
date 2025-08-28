'use client';

import { useState } from 'react';
import { GradeRange, GradeOption } from '@/types/diagnostic';
import { Button } from '@/components/common';

interface GradeSelectorProps {
  onSelect: (gradeRange: GradeRange) => void;
  disabled?: boolean;
}

const gradeOptions: GradeOption[] = [
  {
    grade: 1,
    label: '중학교 1학년',
    description: '정수와 유리수, 문자와 식, 함수 등 중1 전 범위',
  },
  {
    grade: 2,
    label: '중학교 2학년',
    description: '중1~중2 전 범위 (유리수와 무리수, 식의 계산, 함수, 확률 등)',
  },
  {
    grade: 3,
    label: '중학교 3학년',
    description: '중1~중3 전 범위 (이차함수, 삼각비, 원의 성질 등 포함)',
  },
];

export default function GradeSelector({
  onSelect,
  disabled = false,
}: GradeSelectorProps) {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
  };

  const handleConfirm = () => {
    if (selectedGrade) {
      const gradeRange: GradeRange = {
        min: 1,
        max: selectedGrade,
      };
      onSelect(gradeRange);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          현재 학년을 선택해주세요
        </h3>
        <p className="text-gray-600">
          선택한 학년까지의 범위에서 진단 문제가 출제됩니다
        </p>
      </div>

      <div className="space-y-3">
        {gradeOptions.map((option) => (
          <div
            key={option.grade}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedGrade === option.grade
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && handleGradeSelect(option.grade)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedGrade === option.grade
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedGrade === option.grade && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {option.label}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-8">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleConfirm}
          disabled={!selectedGrade || disabled}
          size="lg"
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}
