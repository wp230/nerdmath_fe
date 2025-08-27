// 유틸리티 타입

// 부분 타입 (Partial)
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 필수 타입 (Required)
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

// 조건부 타입
export type Conditional<T, U, V> = T extends U ? V : never;

// 유니온에서 특정 타입 제외
export type ExcludeFromUnion<T, U> = T extends U ? never : T;

// 유니온에서 특정 타입만 추출
export type ExtractFromUnion<T, U> = T extends U ? T : never;

// 중첩 객체의 모든 속성을 옵셔널로
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 중첩 객체의 모든 속성을 필수로
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 타입 가드 함수 타입
export type TypeGuard<T> = (value: any) => value is T;

// 함수의 반환 타입
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 함수의 매개변수 타입
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 배열 요소 타입
export type ArrayElement<T> = T extends Array<infer U> ? U : never;

// Promise의 결과 타입
export type Awaited<T> = T extends Promise<infer U> ? U : T;
