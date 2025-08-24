import { Problem } from '@/types/diagnostics';

export const mockProblemsData: Record<string, Problem> = {
  // 첫 번째 문제 (1-2 API 응답의 firstProblemId)
  '64fa0p111111111111111111': {
    problemId: '64fa0p111111111111111111',
    unitId: 'unit_001',
    grade: 1,
    chapter: 1,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['덧셈', '기초'],
    content: {
      stem: { text: '5 + 3 = ?' },
      choices: [
        { key: '①', text: '7' },
        { key: '②', text: '8' },
        { key: '③', text: '9' },
        { key: '④', text: '10' }
      ]
    },
    imageUrl: '/images/problems/addition_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 두 번째 문제 (1-4 API 응답의 nextProblemId)
  '64fa0p222222222222222222': {
    problemId: '64fa0p222222222222222222',
    unitId: 'unit_001',
    grade: 1,
    chapter: 1,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['뺄셈', '기초'],
    content: {
      stem: { text: '10 - 4 = ?' },
      choices: [
        { key: '①', text: '4' },
        { key: '②', text: '5' },
        { key: '③', text: '6' },
        { key: '④', text: '7' }
      ]
    },
    imageUrl: '/images/problems/subtraction_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 세 번째 문제
  '64fa0p333333333333333333': {
    problemId: '64fa0p333333333333333333',
    unitId: 'unit_001',
    grade: 1,
    chapter: 2,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['도형', '기초'],
    content: {
      stem: { text: '몇 개의 모서리를 가진 도형인가요?' },
      choices: [
        { key: '①', text: '3개' },
        { key: '②', text: '4개' },
        { key: '③', text: '5개' },
        { key: '④', text: '6개' }
      ]
    },
    imageUrl: '/images/problems/shape_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 네 번째 문제
  '64fa0p444444444444444444': {
    problemId: '64fa0p444444444444444444',
    unitId: 'unit_001',
    grade: 1,
    chapter: 2,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['수', '기초'],
    content: {
      stem: { text: '1부터 10까지의 수 중에서 짝수는 몇 개인가요?' },
      choices: [
        { key: '①', text: '4개' },
        { key: '②', text: '5개' },
        { key: '③', text: '6개' },
        { key: '④', text: '7개' }
      ]
    },
    imageUrl: '/images/problems/numbers_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 다섯 번째 문제
  '64fa0p555555555555555555': {
    problemId: '64fa0p555555555555555555',
    unitId: 'unit_001',
    grade: 1,
    chapter: 3,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['측정', '길이'],
    content: {
      stem: { text: '연필의 길이는 몇 cm인가요?' },
      choices: [
        { key: '①', text: '15cm' },
        { key: '②', text: '18cm' },
        { key: '③', text: '20cm' },
        { key: '④', text: '25cm' }
      ]
    },
    imageUrl: '/images/problems/measurement_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 여섯 번째 문제
  '64fa0p666666666666666666': {
    problemId: '64fa0p666666666666666666',
    unitId: 'unit_001',
    grade: 1,
    chapter: 3,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['시간', '기초'],
    content: {
      stem: { text: '1시간은 몇 분인가요?' },
      choices: [
        { key: '①', text: '30분' },
        { key: '②', text: '45분' },
        { key: '③', text: '60분' },
        { key: '④', text: '90분' }
      ]
    },
    imageUrl: '/images/problems/time_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 일곱 번째 문제
  '64fa0p777777777777777777': {
    problemId: '64fa0p777777777777777777',
    unitId: 'unit_001',
    grade: 1,
    chapter: 4,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['돈', '기초'],
    content: {
      stem: { text: '100원짜리 동전 3개와 50원짜리 동전 2개는 모두 몇 원인가요?' },
      choices: [
        { key: '①', text: '300원' },
        { key: '②', text: '350원' },
        { key: '③', text: '400원' },
        { key: '④', text: '450원' }
      ]
    },
    imageUrl: '/images/problems/money_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 여덟 번째 문제
  '64fa0p888888888888888888': {
    problemId: '64fa0p888888888888888888',
    unitId: 'unit_001',
    grade: 1,
    chapter: 4,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['패턴', '기초'],
    content: {
      stem: { text: '다음 패턴에서 빈칸에 들어갈 수는 무엇인가요? 2, 4, 6, 8, ?' },
      choices: [
        { key: '①', text: '9' },
        { key: '②', text: '10' },
        { key: '③', text: '11' },
        { key: '④', text: '12' }
      ]
    },
    imageUrl: '/images/problems/pattern_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 아홉 번째 문제
  '64fa0p999999999999999999': {
    problemId: '64fa0p999999999999999999',
    unitId: 'unit_001',
    grade: 1,
    chapter: 5,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['분류', '기초'],
    content: {
      stem: { text: '다음 중 동물이 아닌 것은 무엇인가요?' },
      choices: [
        { key: '①', text: '강아지' },
        { key: '②', text: '고양이' },
        { key: '③', text: '나무' },
        { key: '④', text: '토끼' }
      ]
    },
    imageUrl: '/images/problems/classification_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열 번째 문제
  '64fa0p101010101010101010': {
    problemId: '64fa0p101010101010101010',
    unitId: 'unit_001',
    grade: 1,
    chapter: 5,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['비교', '기초'],
    content: {
      stem: { text: '다음 중 가장 큰 수는 무엇인가요?' },
      choices: [
        { key: '①', text: '15' },
        { key: '②', text: '25' },
        { key: '③', text: '35' },
        { key: '④', text: '45' }
      ]
    },
    imageUrl: '/images/problems/comparison_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열한 번째 문제
  '64fa0p111111111111111112': {
    problemId: '64fa0p111111111111111112',
    unitId: 'unit_001',
    grade: 1,
    chapter: 6,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['그래프', '기초'],
    content: {
      stem: { text: '막대그래프에서 가장 높은 막대는 무엇을 나타내나요?' },
      choices: [
        { key: '①', text: '가장 적은 수' },
        { key: '②', text: '가장 많은 수' },
        { key: '③', text: '평균' },
        { key: '④', text: '중간값' }
      ]
    },
    imageUrl: '/images/problems/graph_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열두 번째 문제
  '64fa0p111111111111111113': {
    problemId: '64fa0p111111111111111113',
    unitId: 'unit_001',
    grade: 1,
    chapter: 6,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['확률', '기초'],
    content: {
      stem: { text: '주사위를 던졌을 때 6이 나올 확률은?' },
      choices: [
        { key: '①', text: '1/2' },
        { key: '②', text: '1/3' },
        { key: '③', text: '1/6' },
        { key: '④', text: '1/12' }
      ]
    },
    imageUrl: '/images/problems/probability_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열세 번째 문제
  '64fa0p111111111111111114': {
    problemId: '64fa0p111111111111111114',
    unitId: 'unit_001',
    grade: 1,
    chapter: 7,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['공간', '기초'],
    content: {
      stem: { text: '왼쪽에서 오른쪽으로 가는 방향은?' },
      choices: [
        { key: '①', text: '동쪽' },
        { key: '②', text: '서쪽' },
        { key: '③', text: '남쪽' },
        { key: '④', text: '북쪽' }
      ]
    },
    imageUrl: '/images/problems/space_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열네 번째 문제
  '64fa0p111111111111111115': {
    problemId: '64fa0p111111111111111115',
    unitId: 'unit_001',
    grade: 1,
    chapter: 7,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['규칙', '기초'],
    content: {
      stem: { text: '다음 규칙에 따라 빈칸을 채우세요: 1, 3, 5, 7, ?' },
      choices: [
        { key: '①', text: '8' },
        { key: '②', text: '9' },
        { key: '③', text: '10' },
        { key: '④', text: '11' }
      ]
    },
    imageUrl: '/images/problems/rule_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열다섯 번째 문제
  '64fa0p111111111111111116': {
    problemId: '64fa0p111111111111111116',
    unitId: 'unit_001',
    grade: 1,
    chapter: 8,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['문제해결', '기초'],
    content: {
      stem: { text: '사과 5개를 2명이 똑같이 나누면 몇 개씩 받나요?' },
      choices: [
        { key: '①', text: '2개' },
        { key: '②', text: '2.5개' },
        { key: '③', text: '3개' },
        { key: '④', text: '나눌 수 없다' }
      ]
    },
    imageUrl: '/images/problems/problemsolving_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열여섯 번째 문제
  '64fa0p111111111111111117': {
    problemId: '64fa0p111111111111111117',
    unitId: 'unit_001',
    grade: 1,
    chapter: 8,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['추론', '기초'],
    content: {
      stem: { text: '모든 새는 날 수 있다. 펭귄은 새이다. 따라서 펭귄은?' },
      choices: [
        { key: '①', text: '날 수 있다' },
        { key: '②', text: '날 수 없다' },
        { key: '③', text: '알 수 없다' },
        { key: '④', text: '가끔 날 수 있다' }
      ]
    },
    imageUrl: '/images/problems/reasoning_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열일곱 번째 문제
  '64fa0p111111111111111118': {
    problemId: '64fa0p111111111111111118',
    unitId: 'unit_001',
    grade: 1,
    chapter: 9,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['통계', '기초'],
    content: {
      stem: { text: '학급에서 가장 많이 좋아하는 과목을 알아보려면?' },
      choices: [
        { key: '①', text: '가장 어려운 과목' },
        { key: '②', text: '가장 쉬운 과목' },
        { key: '③', text: '가장 많은 학생이 선택한 과목' },
        { key: '④', text: '가장 적은 학생이 선택한 과목' }
      ]
    },
    imageUrl: '/images/problems/statistics_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열여덟 번째 문제
  '64fa0p111111111111111119': {
    problemId: '64fa0p111111111111111119',
    unitId: 'unit_001',
    grade: 1,
    chapter: 9,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['기하', '기초'],
    content: {
      stem: { text: '정사각형의 특징이 아닌 것은?' },
      choices: [
        { key: '①', text: '네 변의 길이가 같다' },
        { key: '②', text: '네 각이 모두 같다' },
        { key: '③', text: '대각선이 서로 수직이다' },
        { key: '④', text: '세 각의 합이 180도이다' }
      ]
    },
    imageUrl: '/images/problems/geometry_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 열아홉 번째 문제
  '64fa0p111111111111111120': {
    problemId: '64fa0p111111111111111120',
    unitId: 'unit_001',
    grade: 1,
    chapter: 10,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['함수', '기초'],
    content: {
      stem: { text: '입력값이 2배가 되면 출력값도 2배가 되는 관계는?' },
      choices: [
        { key: '①', text: '덧셈' },
        { key: '②', text: '뺄셈' },
        { key: '③', text: '곱셈' },
        { key: '④', text: '나눗셈' }
      ]
    },
    imageUrl: '/images/problems/function_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },

  // 스무 번째 문제 (마지막)
  '64fa0p111111111111111121': {
    problemId: '64fa0p111111111111111121',
    unitId: 'unit_001',
    grade: 1,
    chapter: 10,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['종합', '기초'],
    content: {
      stem: { text: '1부터 20까지의 수 중에서 3의 배수는 몇 개인가요?' },
      choices: [
        { key: '①', text: '5개' },
        { key: '②', text: '6개' },
        { key: '③', text: '7개' },
        { key: '④', text: '8개' }
      ]
    },
    imageUrl: '/images/problems/comprehensive_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  }
};
