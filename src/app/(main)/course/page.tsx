import Link from 'next/link';

export default function CoursePage() {
  const courses = [
    {
      id: 'math',
      title: '수학',
      description: '기초부터 고급까지 체계적인 수학 학습',
      icon: '📐',
      color: 'bg-blue-500',
    },
    {
      id: 'concept',
      title: '개념 학습',
      description: '수학 개념을 단계별로 학습',
      icon: '🧠',
      color: 'bg-green-500',
    },
    {
      id: 'problem',
      title: '문제 풀이',
      description: '다양한 문제를 통해 실력 향상',
      icon: '✏️',
      color: 'bg-purple-500',
    },
    {
      id: 'vocabulary',
      title: '수학 용어',
      description: '수학 용어와 개념 정리',
      icon: '📚',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">학습 코스 선택</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/concept/${course.id}`}>
            <div
              className={`${course.color} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm opacity-90">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
