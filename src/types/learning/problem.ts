// 문제 타입

import {
  BaseEntity,
  ObjectId,
  ProblemType,
  ProblemLevel,
  CognitiveType,
  Subject,
} from '../common/database';

// 문제 콘텐츠 구조
export interface ProblemContent {
  stem: {
    text: string;
    imageUrl?: string;
    latex?: string;
  };
  choices?: Array<{
    key: string;
    text: string;
    imageUrl?: string;
    latex?: string;
  }>;
  imageUrl?: string;
  latex?: string;
}

// 문제 해설
export interface ProblemExplanation {
  text: string;
  imageUrl?: string;
  latex?: string;
  steps?: string[];
}

// 문제 정보
export interface Problem extends BaseEntity {
  problemId: ObjectId;
  unitId: ObjectId;
  grade: number;
  chapter: number;
  context: {
    source: string;
    for: string[];
  };
  cognitiveType: CognitiveType;
  level: ProblemLevel;
  diagnosticTest: boolean;
  diagnosticUnit?: string;
  type: ProblemType;
  tags: string[];
  content: ProblemContent;
  correctAnswer: string;
  explanation: ProblemExplanation;
  imageUrl?: string;
}

// 문제 생성 요청
export interface CreateProblemRequest {
  unitId: ObjectId;
  grade: number;
  chapter: number;
  context: {
    source: string;
    for: string[];
  };
  cognitiveType: CognitiveType;
  level: ProblemLevel;
  diagnosticTest: boolean;
  diagnosticUnit?: string;
  type: ProblemType;
  tags: string[];
  content: ProblemContent;
  correctAnswer: string;
  explanation: ProblemExplanation;
  imageUrl?: string;
}

// 문제 수정 요청
export interface UpdateProblemRequest {
  context?: {
    source: string;
    for: string[];
  };
  cognitiveType?: CognitiveType;
  level?: ProblemLevel;
  diagnosticTest?: boolean;
  diagnosticUnit?: string;
  type?: ProblemType;
  tags?: string[];
  content?: ProblemContent;
  correctAnswer?: string;
  explanation?: ProblemExplanation;
  imageUrl?: string;
}

// 문제 조회 필터
export interface ProblemFilter {
  unitId?: ObjectId;
  grade?: number;
  chapter?: number;
  cognitiveType?: CognitiveType;
  level?: ProblemLevel;
  type?: ProblemType;
  tags?: string[];
  diagnosticTest?: boolean;
  diagnosticUnit?: string;
}

// 문제 상세 응답 (API용)
export interface ProblemDetailResponse {
  problemId: ObjectId;
  unitId: ObjectId;
  grade: number;
  chapter: number;
  context: {
    source: string;
    for: string[];
  };
  cognitiveType: CognitiveType;
  level: ProblemLevel;
  type: ProblemType;
  tags: string[];
  content: ProblemContent;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 문제 세트 내 문제 정보
export interface ProblemInSet {
  problemId: ObjectId;
  problemOrderIndex: number;
  content: ProblemContent;
  type: ProblemType;
  level: ProblemLevel;
}

// 문제 진행률 정보
export interface ProblemProgress {
  completed: number;
  total: number;
  remaining: number;
  percentage: number;
}
