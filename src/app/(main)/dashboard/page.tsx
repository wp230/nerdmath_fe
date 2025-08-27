import Link from 'next/link';
//여러 화면 바로가기 및 학습 분석 및 통계 확인 화면
//사용자 간단한 정보 확인 화면
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">학습 진행률</h3>
          <p className="text-gray-600">현재 학습 진행 상황을 확인하세요</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">최근 활동</h3>
          <p className="text-gray-600">최근 학습 활동 내역</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">성취도</h3>
          <p className="text-gray-600">전체 학습 성취도 현황</p>
        </div>
      </div>
    </div>
  );
}
