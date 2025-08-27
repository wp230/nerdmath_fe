import Link from 'next/link';
//진단시작 및 결과확인 화면
export default function DiagnosticPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">진단 테스트</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">
            나의 수학 실력 진단하기
          </h2>
          <p className="text-gray-600 mb-8">
            진단 테스트를 통해 현재 수학 실력을 파악하고 맞춤형 학습을
            시작해보세요.
          </p>
          <Link href="/diagnostic/test">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              진단 테스트 시작하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
