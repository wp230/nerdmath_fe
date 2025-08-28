export interface RealExampleBlock {
  type: 'realExample';
  title: string;
  text: string;
  imageUrl: string;
  examples: string[];
}

export interface ExplanationBlock {
  type: 'explanation';
  title: string;
  text: string;
  latex: string;
  imageUrl: string;
  steps: string[];
}

export interface PracticeProblem {
  id: number;
  type: 'math';
  question: string;
  answer: string;
  explanation: string;
}

export interface PracticeProblemBlock {
  type: 'practiceProblems';
  title: string;
  text: string;
  problems: PracticeProblem[];
}

export type ConceptBlock =
  | RealExampleBlock
  | ExplanationBlock
  | PracticeProblemBlock;

export interface ConceptData {
  conceptId: string;
  unitId: string;
  blocks: ConceptBlock[];
  createdAt: string;
}

export interface CompleteConceptLearningResponse {
  unitId: string;
  conceptProgress: number;
  message: string;
  updatedProgress: {
    conceptProgress: number;
    status: string;
  };
  xpGained: number;
  gamificationUpdate: any; // 필요시 더 상세한 타입 정의
}
