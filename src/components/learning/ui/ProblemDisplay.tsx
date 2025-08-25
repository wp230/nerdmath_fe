import React from 'react';
import { PracticeProblem, VocabTestProblem } from '@/types/learning';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface ProblemDisplayProps {
  problem: PracticeProblem | VocabTestProblem;
  mode: 'vocab_test' | 'practice';
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  problem,
  mode,
}) => {
  // 수식 렌더링 함수
  const renderMathExpression = (latex: string) => {
    try {
      return katex.renderToString(latex, { displayMode: true });
    } catch (error) {
      console.error('수식 렌더링 오류:', error);
      return `<span class="text-red-500">수식 렌더링 오류: ${latex}</span>`;
    }
  };

  // 문제 타입에 따른 제목과 설명
  const getProblemTypeInfo = () => {
    if (mode === 'vocab_test') {
      return {
        title: '📚 어휘 테스트',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        description: '영어 수학 용어를 학습해보세요',
      };
    } else {
      return {
        title: '🔢 수학 문제',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        description: '수학 문제를 풀어보세요',
      };
    }
  };

  const typeInfo = getProblemTypeInfo();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      {/* 문제 타입 표시 */}
      <div className="mb-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeInfo.bgColor} ${typeInfo.textColor}`}
        >
          {typeInfo.title}
        </span>
        <p className="text-sm text-gray-600 mt-2">{typeInfo.description}</p>
      </div>

      {/* 문제 내용 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">문제</h4>
        <div className="bg-gray-50 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
          {mode === 'vocab_test' ? (
            // 어휘 테스트 문제
            <div className="text-center">
              <p className="text-xl font-medium text-gray-800 mb-2">
                {(problem as VocabTestProblem).question}
              </p>
              <p className="text-sm text-gray-600">
                {(problem as VocabTestProblem).questionType ===
                'word_to_meaning'
                  ? '영어 단어의 뜻을 쓰세요'
                  : '한국어 뜻을 영어로 쓰세요'}
              </p>
            </div>
          ) : (
            // 수학 문제
            <div className="text-center w-full">
              <p className="text-lg text-gray-800 leading-relaxed mb-3">
                {(problem as PracticeProblem).question}
              </p>
              {/* 수식이 있는 경우 Katex 렌더링 */}
              {(problem as PracticeProblem).latex && (
                <div
                  className="mt-3 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: renderMathExpression(
                      (problem as PracticeProblem).latex!
                    ),
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 힌트 */}
      {mode === 'practice' && (problem as PracticeProblem).hint && (
        <div className="mb-6">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              💡 <strong>힌트:</strong> {(problem as PracticeProblem).hint}
            </p>
          </div>
        </div>
      )}

      {/* 답안 입력 안내 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm text-center">
          💡 아래 입력창에 답안을 입력하고 채점 버튼을 눌러주세요
        </p>
      </div>

      {/* 어휘 테스트의 경우 추가 정보 */}
      {mode === 'vocab_test' && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-purple-800 text-xs">
            💡 어휘 테스트는 10문제로 구성되어 있습니다. 정답 시 5XP, 오답 시
            3XP를 획득할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};
