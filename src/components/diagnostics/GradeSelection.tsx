'use client';

import React, { useState } from 'react';
import { GradeRange } from '@/types/diagnostics';

interface GradeSelectionProps {
  onGradeSelect: (gradeRange: GradeRange) => void;
  isLoading?: boolean;
}

const GRADE_OPTIONS = [
  { label: '중학교 1학년', value: { min: 1, max: 1 } },
  { label: '중학교 2학년', value: { min: 1, max: 2 } },
  { label: '중학교 3학년', value: { min: 1, max: 3 } },
];

export const GradeSelection: React.FC<GradeSelectionProps> = ({
  onGradeSelect,
  isLoading = false,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeRange | null>(null);

  const handleGradeSelect = (gradeRange: GradeRange) => {
    setSelectedGrade(gradeRange);
  };

  const handleStartTest = () => {
    if (selectedGrade) {
      onGradeSelect(selectedGrade);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        진단 테스트 시작
      </h2> */}

      <p className="text-gray-600 text-center mb-6">
        사용자의 학년을 선택해주세요
      </p>

      <div className="space-y-3 mb-6">
        {GRADE_OPTIONS.map((option) => (
          <label
            key={`${option.value.min}-${option.value.max}`}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedGrade?.min === option.value.min &&
              selectedGrade?.max === option.value.max
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="grade"
              value={`${option.value.min}-${option.value.max}`}
              checked={
                selectedGrade?.min === option.value.min &&
                selectedGrade?.max === option.value.max
              }
              onChange={() => handleGradeSelect(option.value)}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">{option.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleStartTest}
        disabled={!selectedGrade || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          selectedGrade && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? '테스트 시작 중...' : '진단 테스트 시작'}
      </button>

      {selectedGrade && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          선택된 학년:{' '}
          {selectedGrade.min === selectedGrade.max
            ? `중학교 ${selectedGrade.min}학년`
            : `중학교 ${selectedGrade.min}-${selectedGrade.max}학년`}
        </p>
      )}
    </div>
  );
};
