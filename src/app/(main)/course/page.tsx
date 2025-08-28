'use client';

import Link from 'next/link';
import { UNIT_DATA, UNIT_GRADE_NAMES } from '@/types/examples/math_Unit';
import { Button } from '@/components/common';

export default function CoursePage() {
  const units = Object.values(UNIT_DATA);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="font-DungGeunMo text-4xl font-bold text-gray-900 mb-4">
              수학 대단원 과정
            </h1>
            <p className="font-DungGeunMo text-lg text-gray-600 max-w-2xl mx-auto">
              중학교 수학의 5개 대단원을 체계적으로 학습해보세요. 각 단원별로
              개념부터 문제까지 단계적으로 학습할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 대단원 카드 섹션 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => {
            const unitGradeInfo =
              UNIT_GRADE_NAMES[unit.unitId as keyof typeof UNIT_GRADE_NAMES];
            const gradeNames = Object.values(unitGradeInfo.gradeNames);

            return (
              <div
                key={unit.unitId}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* 단원 헤더 */}
                <div
                  className="font-DungGeunMo h-24 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: unit.backgroundColor }}
                >
                  {unit.title}
                </div>

                {/* 단원 내용 */}
                <div className="p-6">
                  <p
                    className="font-DungGeunMo text-gray-600 mb-6 overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {unit.description}
                  </p>

                  {/* 학년별 단원 미리보기 */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-DungGeunMo font-semibold text-gray-800 text-sm">
                      학년별 단원 구성:
                    </h4>
                    {gradeNames.map((gradeInfo: any) => (
                      <div
                        key={gradeInfo.id}
                        className="font-DungGeunMo text-sm"
                      >
                        <span className="font-DungGeunMo inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                          {gradeInfo.id}학년
                        </span>
                        <span className="font-DungGeunMo text-gray-700">
                          {gradeInfo.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 시작하기 버튼 */}
                  <Link href={`/course/${unit.unitId}`}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="font-DungGeunMo w-full"
                    >
                      학습 시작하기
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="font-DungGeunMo text-2xl font-bold text-gray-900 mb-4">
              체계적인 수학 학습
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-DungGeunMo font-semibold text-gray-800 mb-2">
                  개념 학습
                </h3>
                <p className="font-DungGeunMo text-gray-600 text-sm">
                  각 단원의 핵심 개념을 쉽고 재미있게 학습할 수 있습니다.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✏️</span>
                </div>
                <h3 className="font-DungGeunMo font-semibold text-gray-800 mb-2">
                  문제 풀이
                </h3>
                <p className="font-DungGeunMo text-gray-600 text-sm">
                  다양한 유형의 문제를 통해 실력을 향상시킬 수 있습니다.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-DungGeunMo font-semibold text-gray-800 mb-2">
                  진도 관리
                </h3>
                <p className="font-DungGeunMo text-gray-600 text-sm">
                  학습 진도와 성과를 체계적으로 관리할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
