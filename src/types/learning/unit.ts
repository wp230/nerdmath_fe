// 소단원 타입

import {
  BaseEntity,
  ObjectId,
  Subject,
  Status,
  LocalizedText,
} from '../common/database';

// 소단원 정보
export interface Unit extends BaseEntity {
  unitId: ObjectId;
  subject: Subject;
  title: LocalizedText;
  grade: number;
  chapter: number;
  chapterTitle: string;
  orderInGrade: number;
  description?: LocalizedText;
  status: Status;
}

// 소단원 생성 요청
export interface CreateUnitRequest {
  subject: Subject;
  title: LocalizedText;
  grade: number;
  chapter: number;
  chapterTitle: string;
  orderInGrade: number;
  description?: LocalizedText;
  status?: Status;
}

// 소단원 수정 요청
export interface UpdateUnitRequest {
  title?: LocalizedText;
  chapterTitle?: string;
  orderInGrade?: number;
  description?: LocalizedText;
  status?: Status;
}

// 소단원 조회 필터
export interface UnitFilter {
  subject?: Subject;
  grade?: number;
  chapter?: number;
  status?: Status;
  cursor?: string;
  limit?: number;
}

// 소단원 목록 응답
export interface UnitListResponse {
  items: Unit[];
  nextCursor?: string;
}

// 소단원 상세 응답
export interface UnitDetailResponse {
  unitId: ObjectId;
  subject: Subject;
  title: LocalizedText;
  grade: number;
  chapter: number;
  chapterTitle: string;
  orderInGrade: number;
  description?: LocalizedText;
  status: Status;
  createdAt: string;
}

// 소단원 진행률 정보
export interface UnitProgress {
  unitId: ObjectId;
  unitTitle: LocalizedText;
  conceptProgress: number;
  problemProgress: number;
  vocabProgress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}
