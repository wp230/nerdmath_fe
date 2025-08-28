'use client';

import React, { useState } from 'react';
import { ConceptBlock } from '@/types/concept';
import RealExampleBlock from './blocks/RealExampleBlock';
import ExplanationBlock from './blocks/ExplanationBlock';
import PracticeProblemBlock from './blocks/PracticeProblemBlock';
import Button from '@/components/common/Button';

interface ConceptViewerProps {
  blocks: ConceptBlock[];
  onComplete: () => void;
}

const ConceptViewer: React.FC<ConceptViewerProps> = ({
  blocks,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = blocks.length;
  const currentBlock = blocks[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const renderBlock = (block: ConceptBlock) => {
    switch (block.type) {
      case 'realExample':
        return <RealExampleBlock block={block} />;
      case 'explanation':
        return <ExplanationBlock block={block} />;
      case 'practiceProblems':
        return <PracticeProblemBlock block={block} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">{renderBlock(currentBlock)}</div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 mt-2 text-right">
          {currentStep + 1} / {totalSteps}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          이전
        </Button>
        <Button onClick={handleNext}>
          {currentStep === totalSteps - 1 ? '학습 완료' : '다음'}
        </Button>
      </div>
    </div>
  );
};

export default ConceptViewer;
