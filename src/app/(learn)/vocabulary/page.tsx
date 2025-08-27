import Link from 'next/link';

export default function VocabularyPage() {
  const vocabPacks = [
    {
      id: 'basic',
      title: '기초 수학 용어',
      description: '수학의 기본 개념과 용어들을 학습합니다.',
      wordCount: 50,
      difficulty: '초급',
      color: 'bg-blue-500',
    },
    {
      id: 'algebra',
      title: '대수학 용어',
      description: '방정식, 함수 등 대수학 관련 용어를 학습합니다.',
      wordCount: 40,
      difficulty: '중급',
      color: 'bg-green-500',
    },
    {
      id: 'geometry',
      title: '기하학 용어',
      description: '도형, 공간 등 기하학 관련 용어를 학습합니다.',
      wordCount: 35,
      difficulty: '중급',
      color: 'bg-purple-500',
    },
    {
      id: 'calculus',
      title: '미적분학 용어',
      description: '미분, 적분 등 고급 수학 용어를 학습합니다.',
      wordCount: 30,
      difficulty: '고급',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">수학 용어 학습</h1>
      <p className="text-gray-600 mb-8">
        수학의 핵심 개념과 용어들을 체계적으로 학습해보세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vocabPacks.map((pack) => (
          <Link key={pack.id} href={`/vocabulary/${pack.id}`}>
            <div
              className={`${pack.color} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <h3 className="text-xl font-semibold mb-2">{pack.title}</h3>
              <p className="text-sm opacity-90 mb-4">{pack.description}</p>
              <div className="flex justify-between text-sm">
                <span>{pack.wordCount}개 단어</span>
                <span className="bg-white/20 px-2 py-1 rounded">
                  {pack.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
