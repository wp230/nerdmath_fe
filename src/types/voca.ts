// 어휘팩 기본 정보
export interface VocabPack {
  type?: string; // 5-2용 (sat_act 등)
  unitId?: string; // 5-1용
  category?: string; // math_term 등
  title: string; // 표시용 제목
  description: string; // 설명
  vocabCount: number; // 어휘 개수
  imageUrl?: string; // 이미지 URL
  // thumbnail 제거 - 실제 API와 동일한 구조
}

// 개별 어휘
export interface Vocabulary {
  vocaId: string;
  word: string;
  meaning: string;
  etymology: string;
  imageUrl?: string;
  totalAttempts?: number;
  correctAttempts?: number;
  accuracy?: number;
  lastAttempted?: string;
}

// API 응답 타입들
export interface VocabPackResponse {
  unitId?: string;
  type?: string; // 5-2 API용
  category?: string;
  vocabularies: Vocabulary[];
  imageUrl?: string; // 이미지 URL 추가
  // thumbnail 제거 - 실제 API와 동일한 구조
}

export interface VocabReviewResponse {
  unitId?: string;
  type?: string;
  userId: number;
  incorrectVocabularies: Vocabulary[];
}

// 어휘팩 타입별 구분
export type VocabPackType = 'unit' | 'common';

// 어휘팩 카테고리
export type VocabCategory = 'math_term' | 'sat_act' | 'common';

// 뷰 모드
export type VocabViewMode = 'list' | 'detail';
