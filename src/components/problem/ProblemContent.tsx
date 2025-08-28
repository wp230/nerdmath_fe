'use client';

import Image from 'next/image';
import { Problem } from '@/types/problem';

interface ProblemContentProps {
  problem: Problem;
  currentIndex: number;
  totalProblems: number;
}

const ProblemContent: React.FC<ProblemContentProps> = ({
  problem,
  currentIndex,
  totalProblems,
}) => {
  return (
    <div className="mb-6">
      {/* 문제 번호 */}
      <div className="text-sm text-gray-500 mb-2">
        문제 {currentIndex + 1} / {totalProblems}
      </div>

      {/* 문제 제목/내용 */}
      <h2 className="text-xl font-semibold mb-4">
        {problem.content.stem.text}
      </h2>

      {/* 문제 이미지 (있는 경우) */}
      {problem.imageUrl && (
        <div className="mb-4">
          <Image
            src={problem.imageUrl}
            alt="문제 이미지"
            width={400}
            height={300}
            className="rounded-lg border border-gray-200"
          />
        </div>
      )}

      {/* 문제 메타데이터 (선택적) */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {problem.level}
        </span>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
          {problem.cognitiveType}
        </span>
        {problem.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProblemContent;
