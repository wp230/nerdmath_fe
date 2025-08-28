export interface Vocabulary {
  vocaId: string;
  word: string;
  meaning: string;
  etymology: string;
  imageUrl: string;
  createdAt: string;
}

export interface UnitVocabularyResponse {
  unitId: string;
  category: string;
  vocabularies: Vocabulary[];
}

export interface CommonVocabularyResponse {
  type: string;
  vocabularies: Vocabulary[];
}

export interface VocabularyProblem {
  problemId: string;
  vocaId: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  questionType: 'word_to_meaning' | 'meaning_to_word';
}

export interface VocabularyTestSet {
  unitId: string;
  testSize: number;
  problems: VocabularyProblem[];
}

export interface VocabularyTestResponse {
  testSet: VocabularyTestSet;
  generatedAt: string;
}
