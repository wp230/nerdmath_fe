"use client";

import React from 'react';

interface GradeSelectorProps {
  availableGrades: number[];
  selectedGrade: number;
  onGradeChange: (grade: number) => void;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  availableGrades,
  selectedGrade,
  onGradeChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">학년 선택</h3>
      <div className="flex gap-3">
        {availableGrades.map((grade) => (
          <button
            key={grade}
            onClick={() => onGradeChange(grade)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${
                selectedGrade === grade
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {grade}학년
          </button>
        ))}
      </div>
    </div>
  );
};
