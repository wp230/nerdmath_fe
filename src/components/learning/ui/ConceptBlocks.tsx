import React from 'react';

interface ConceptBlock {
  id: string;
  type: string;
  title: string;
  content: string;
  imageUrl?: string;
  examples?: string[];
  countries?: Array<{
    country: string;
    example: string;
  }>;
  connections?: string[];
  steps?: string[];
  latex?: string;
}

interface ConceptBlocksProps {
  blocks: ConceptBlock[];
  onProgressUpdate: (progress: number) => void;
}

export const ConceptBlocks: React.FC<ConceptBlocksProps> = ({
  blocks,
  onProgressUpdate,
}) => {
  const [completedBlocks, setCompletedBlocks] = React.useState<Set<string>>(
    new Set()
  );

  const handleBlockComplete = (blockId: string) => {
    setCompletedBlocks((prev) => new Set([...prev, blockId]));

    // 진행률 계산 및 업데이트
    const newProgress = Math.round(
      ((completedBlocks.size + 1) / blocks.length) * 100
    );
    onProgressUpdate(newProgress);
  };

  const getBlockContent = (block: ConceptBlock) => {
    switch (block.type) {
      case 'explanation':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{block.content}</p>
            {block.latex && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">수식:</p>
                <div className="text-lg font-mono">{block.latex}</div>
              </div>
            )}
          </div>
        );

      case 'realExample':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{block.content}</p>
            {block.examples && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  실생활 예시:
                </p>
                <ul className="space-y-2">
                  {block.examples.map((example, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-blue-700">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'internationalExample':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{block.content}</p>
            {block.countries && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-2">
                  세계 각국의 교육:
                </p>
                <div className="space-y-3">
                  {block.countries.map((country, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-400 pl-3"
                    >
                      <p className="font-medium text-green-800">
                        {country.country}
                      </p>
                      <p className="text-green-700 text-sm">
                        {country.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'relation':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{block.content}</p>
            {block.connections && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-800 mb-2">
                  연결점:
                </p>
                <ul className="space-y-2">
                  {block.connections.map((connection, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-2">🔗</span>
                      <span className="text-purple-700">{connection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{block.content}</p>
            {block.steps && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-800 mb-2">
                  단계별 접근:
                </p>
                <ol className="space-y-2">
                  {block.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-orange-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-700 leading-relaxed">{block.content}</p>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      {/* 헤더 */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">개념 블록</h3>
        <p className="text-sm text-gray-500 mt-1">
          총 {blocks.length}개의 개념을 학습하세요
        </p>
      </div>

      {/* 스크롤 가능한 블록 목록 */}
      <div className="space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`border-l-4 pl-6 pb-6 ${
              completedBlocks.has(block.id)
                ? 'border-green-500'
                : 'border-gray-300'
            }`}
          >
            {/* 블록 제목과 완료 상태 */}
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {index + 1}. {block.title}
              </h4>
              <div className="flex items-center space-x-2">
                {/* 완료 상태 표시 */}
                {completedBlocks.has(block.id) ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    완료 ✅
                  </span>
                ) : (
                  <button
                    onClick={() => handleBlockComplete(block.id)}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    완료하기
                  </button>
                )}
              </div>
            </div>

            {/* 블록 내용 */}
            <div className="text-gray-700">{getBlockContent(block)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
