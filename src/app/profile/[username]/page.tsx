export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {params.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{params.username}</h1>
              <p className="text-gray-600">수학 학습자</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-600">전체 진행률</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">42</div>
              <div className="text-sm text-gray-600">완료한 단원</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,250</div>
              <div className="text-sm text-gray-600">획득한 XP</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">최근 학습 활동</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>대수학 - 방정식 풀이</span>
                  <span className="text-sm text-gray-500">2시간 전</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>기하학 - 도형의 성질</span>
                  <span className="text-sm text-gray-500">1일 전</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>수학 용어 - 기초 개념</span>
                  <span className="text-sm text-gray-500">3일 전</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">학습 통계</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">주간 학습 시간</h3>
                  <div className="text-2xl font-bold text-blue-600">12시간</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">월간 학습 시간</h3>
                  <div className="text-2xl font-bold text-green-600">
                    48시간
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
