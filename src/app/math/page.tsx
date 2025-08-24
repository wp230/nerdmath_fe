import Link from 'next/link';
import { UNIT_DATA } from '../../hooks/math_Unit';
import { UnitCard } from '../../components/learning/UnitCard';

export default function MathMainPage() {
  const units = Object.values(UNIT_DATA);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">수학 학습</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          체계적인 수학 학습을 통해 수학의 기초를 탄탄히 다져보세요. 각 단원을
          선택하여 단계별로 학습할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <Link key={unit.unitId} href={`/math/${unit.unitId}`}>
            <UnitCard unit={unit} />
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            학습 방법
          </h3>
          <ol className="text-sm text-gray-600 space-y-1 text-left">
            <li>1. 원하는 대단원을 선택하세요</li>
            <li>2. 학년과 소단원을 선택하세요</li>
            <li>3. "개념 학습하기" 버튼을 클릭하세요</li>
            <li>4. 개념 학습 후 문제 풀이로 진행됩니다</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
