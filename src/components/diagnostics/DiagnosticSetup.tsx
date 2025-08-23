/**
 * DiagnosticSetup 컴포넌트
 * 
 * 책임: 진단 테스트 설정 정보 수집
 * - 학년 범위 설정
 * - 설정 완료 시 진단 테스트 시작 요청
 * 
 * Props:
 * - onStart: 테스트 시작 함수 (DiagnosticStartRequest 데이터 전달)
 * - loading: API 로딩 상태
 * - error: 에러 메시지
 * 
 * 상태:
 * - gradeRange: 학년 범위 (min, max)
 * - isSubmitting: 폼 제출 상태
 */

'use client';

import { useState } from 'react';
import { DiagnosticStartRequest } from '@/types/diagnostics';

interface DiagnosticSetupProps {
  onStart: (data: DiagnosticStartRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const DiagnosticSetup = ({ onStart, loading, error }: DiagnosticSetupProps) => {
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 사용자 입력 데이터 로깅
    const requestData = { gradeRange: { min: 1, max: selectedGrade } };
    console.log('🚀 진단 테스트 시작 요청 데이터:', requestData);
    console.log('📝 선택된 학년:', selectedGrade);
    console.log('🎯 설정된 학년 범위:', requestData.gradeRange);
    
    try {
      const result = await onStart(requestData);
      console.log('✅ 진단 테스트 시작 성공:', result);
    } catch (err) {
      console.error('❌ 진단 테스트 시작 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          진단 테스트 설정
        </h2>
        <p className="text-gray-600">
          테스트 범위를 설정해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 학년 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            학년 선택
          </label>
          <div className="space-y-2">
            {[1, 2, 3].map(grade => (
              <label key={grade} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="grade"
                  value={grade}
                  checked={selectedGrade === grade}
                  onChange={(e) => {
                    const newGrade = Number(e.target.value);
                    console.log('🔄 학년 선택 변경:', `${selectedGrade} → ${newGrade}`);
                    setSelectedGrade(newGrade);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">{grade}학년</span>
              </label>
            ))}
          </div>
        </div>



        {/* 예상 문제 수 계산 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">테스트 범위</p>
            <p className="text-2xl font-bold text-blue-600">
              1학년 ~ {selectedGrade}학년
            </p>
            <p className="text-sm text-gray-500 mt-1">
              서버에서 자동으로 문제 수를 결정합니다
            </p>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 진단 테스트 시작 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting || loading ? '진단 테스트 시작 중...' : '진단 테스트 시작'}
        </button>
      </form>
    </div>
  );
};
