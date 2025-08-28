'use client';

import { useProblemStore } from '@/stores/problem.store';

interface AnswerChoice {
  key: string;
  text: string;
}

interface AnswerChoicesProps {
  choices: AnswerChoice[];
  selectedAnswer: string | number | null;
  isSubmitted: boolean;
  correctAnswer: string | number | null;
  disabled?: boolean;
}

const AnswerChoices: React.FC<AnswerChoicesProps> = ({
  choices,
  selectedAnswer,
  isSubmitted,
  correctAnswer,
  disabled = false,
}) => {
  const { setSelectedAnswer } = useProblemStore();

  const handleChoiceClick = (index: number) => {
    if (disabled || isSubmitted) return;
    setSelectedAnswer(index);
  };

  const getChoiceClassName = (index: number) => {
    const baseClass =
      'w-full p-4 text-left border rounded-lg transition-colors';

    if (disabled || isSubmitted) {
      // 제출 후 상태
      if (selectedAnswer === index) {
        // 선택한 답안
        if (correctAnswer === index) {
          return `${baseClass} border-green-500 bg-green-50 text-green-800`;
        } else {
          return `${baseClass} border-red-500 bg-red-50 text-red-800`;
        }
      }
      // 선택하지 않은 답안
      return `${baseClass} border-gray-200 bg-gray-50 text-gray-600`;
    } else {
      // 제출 전 상태
      if (selectedAnswer === index) {
        return `${baseClass} border-blue-500 bg-blue-50 text-blue-800`;
      }
      return `${baseClass} border-gray-200 hover:border-gray-300 hover:bg-gray-50`;
    }
  };

  return (
    <div className="space-y-3 mb-6">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleChoiceClick(index)}
          disabled={disabled || isSubmitted}
          className={getChoiceClassName(index)}
        >
          <div className="flex items-center">
            <span className="font-medium mr-3">{choice.key}</span>
            <span>{choice.text}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnswerChoices;
