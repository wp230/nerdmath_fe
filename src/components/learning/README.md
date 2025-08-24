# Learning Components

학습 기능을 위한 React 컴포넌트들입니다.

## 구조

```
components/learning/
├── UnitCard.tsx              # 단원 정보 카드
├── GradeSelector.tsx         # 학년 선택 컴포넌트
├── ChapterList.tsx           # 소단원 목록 컴포넌트
├── LearningStartButton.tsx   # 학습 시작 버튼
├── UnitSelectionContainer.tsx # 단원 선택 통합 컨테이너
└── README.md                 # 이 파일
```

## 컴포넌트 설명

### UnitCard

- 단원의 기본 정보를 표시하는 카드 컴포넌트
- 진행률 표시 및 선택 상태 관리
- 클릭 시 해당 단원으로 이동

### GradeSelector

- 학년 선택을 위한 버튼 그룹
- 선택된 학년에 따른 스타일 변경
- 학년 변경 시 자동으로 첫 번째 소단원 선택

### ChapterList

- 선택된 학년의 소단원 목록 표시
- 각 소단원의 상세 정보 (제목, 설명, 학년)
- 선택된 소단원 하이라이트 표시

### LearningStartButton

- 선택된 단원으로 학습을 시작하는 버튼
- 단원 선택 여부에 따른 활성화/비활성화
- 선택된 단원 정보 요약 표시

### UnitSelectionContainer

- 위의 모든 컴포넌트를 통합하는 컨테이너
- 단원 데이터 로딩 및 에러 처리
- 전체 단원 선택 플로우 관리

## 사용법

```tsx
import { UnitSelectionContainer } from '../components/learning/UnitSelectionContainer';

// 단원 선택 페이지에서 사용
<UnitSelectionContainer unitId="unit_01" />;
```

## 향후 확장 계획

- 2단계: 개념 학습 컴포넌트 추가
- 3단계: 문제 풀이 컴포넌트 추가
- 진행률 표시 및 XP 시스템 UI
- 학습 완료 축하 화면
