import React from 'react';
import { LearningModeSelector as LearningModeSelectorUI } from '../ui/LearningModeSelector';
import { useLearningStore } from '../../../stores/learningStore';

interface LearningModeSelectorProps {
  unitId: string;
  onModeSelect: (mode: 'concept' | 'problem') => void;
}

export const LearningModeSelector: React.FC<LearningModeSelectorProps> = ({
  unitId,
  onModeSelect,
}) => {
  const { startLearning } = useLearningStore();

  const handleModeSelect = (mode: 'concept' | 'problem') => {
    startLearning(unitId, mode);
    onModeSelect(mode); // 부모의 onModeSelect 호출
  };

  return (
    <LearningModeSelectorUI unitId={unitId} onModeSelect={handleModeSelect} />
  );
};
