'use client';

import React, { useState } from 'react';
import { VocabularyProblem } from '@/types/vocabulary';
import { Button, Modal } from '@/components/common';

interface QuizQuestionProps {
  problem: VocabularyProblem;
  onNext: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ problem, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In a real scenario, choices would be provided by the API.
  // For now, we'll create dummy choices.
  const choices = [problem.correctAnswer, '오답 1', '오답 2', '오답 3'].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerSubmit = () => {
    setIsSubmitted(true);
    // Automatically move to the next question after a delay.
    setTimeout(() => {
      onNext(selectedAnswer === problem.correctAnswer);
      setIsSubmitted(false);
      setSelectedAnswer(null);
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-xl mb-4">{problem.question}</h3>
      <div className="space-y-2">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => setSelectedAnswer(choice)}
            disabled={isSubmitted}
            className={`block w-full text-left p-3 rounded-lg border ${
              selectedAnswer === choice
                ? 'bg-blue-100 border-blue-300'
                : 'bg-white'
            } ${
              isSubmitted && choice === problem.correctAnswer
                ? 'bg-green-200'
                : ''
            } ${
              isSubmitted &&
              selectedAnswer === choice &&
              choice !== problem.correctAnswer
                ? 'bg-red-200'
                : ''
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
        제출
      </Button>
    </div>
  );
};

interface VocabularyTestModalProps {
  problems: VocabularyProblem[];
  onClose: () => void;
}

export const VocabularyTestModal: React.FC<VocabularyTestModalProps> = ({
  problems,
  onClose,
}) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNextProblem = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  if (currentProblemIndex >= problems.length) {
    return (
      <Modal isOpen={true} onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4">테스트 완료!</h2>
        <p>
          총 {problems.length}문제 중 {score}문제를 맞혔습니다.
        </p>
        <Button onClick={onClose}>닫기</Button>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">
        어휘 테스트 ({currentProblemIndex + 1} / {problems.length})
      </h2>
      <QuizQuestion
        problem={problems[currentProblemIndex]}
        onNext={handleNextProblem}
      />
    </Modal>
  );
};
