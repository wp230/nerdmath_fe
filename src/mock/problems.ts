import { Problem } from '@/types/diagnostics';

export const mockProblemsData: Record<string, Problem> = {
  // 1학년 문제들 (7개)
  '64fa0p111111111111111111': {
    problemId: '64fa0p111111111111111111',
    unitId: 'unit_000',
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
  
  '64fa0p222222222222222222': {
    problemId: '64fa0p222222222222222222',
    unitId: 'unit_000',
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
  
  '64fa0p333333333333333333': {
    problemId: '64fa0p333333333333333333',
    unitId: 'unit_000',
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
  
  '64fa0p444444444444444444': {
    problemId: '64fa0p444444444444444444',
    unitId: 'unit_000',
    grade: 1,
    chapter: 3,
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
  
  '64fa0p555555555555555555': {
    problemId: '64fa0p555555555555555555',
    unitId: 'unit_000',
    grade: 1,
    chapter: 4,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '응용',
    level: '중',
    type: '객관식',
    tags: ['측정', '기초'],
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
  
  '64fa0p666666666666666666': {
    problemId: '64fa0p666666666666666666',
    unitId: 'unit_000',
    grade: 1,
    chapter: 5,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['패턴', '기초'],
    content: {
      stem: { text: '다음 패턴에서 빈칸에 들어갈 수는?' },
      choices: [
        { key: '①', text: '12' },
        { key: '②', text: '14' },
        { key: '③', text: '16' },
        { key: '④', text: '18' }
      ]
    },
    imageUrl: '/images/problems/pattern_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0p777777777777777777': {
    problemId: '64fa0p777777777777777777',
    unitId: 'unit_000',
    grade: 1,
    chapter: 6,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['문제해결', '기초'],
    content: {
      stem: { text: '사과 3개와 귤 2개를 합하면 몇 개인가요?' },
      choices: [
        { key: '①', text: '4개' },
        { key: '②', text: '5개' },
        { key: '③', text: '6개' },
        { key: '④', text: '7개' }
      ]
    },
    imageUrl: '/images/problems/word_problem_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  // 2학년 문제들 (7개)
  '64fa0p888888888888888888': {
    problemId: '64fa0p888888888888888888',
    unitId: '64unit008888888888888888',
    grade: 2,
    chapter: 1,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '중',
    type: '객관식',
    tags: ['곱셈', '기초'],
    content: {
      stem: { text: '4 × 5 = ?' },
      choices: [
        { key: '①', text: '18' },
        { key: '②', text: '20' },
        { key: '③', text: '22' },
        { key: '④', text: '24' }
      ]
    },
    imageUrl: '/images/problems/multiplication_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0p999999999999999999': {
    problemId: '64fa0p999999999999999999',
    unitId: '64unit009999999999999999',
    grade: 2,
    chapter: 2,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '중',
    type: '객관식',
    tags: ['나눗셈', '기초'],
    content: {
      stem: { text: '15 ÷ 3 = ?' },
      choices: [
        { key: '①', text: '3' },
        { key: '②', text: '4' },
        { key: '③', text: '5' },
        { key: '④', text: '6' }
      ]
    },
    imageUrl: '/images/problems/division_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0paaaaaaaaaaaaaaaa': {
    problemId: '64fa0paaaaaaaaaaaaaaaa',
    unitId: '64unit00aaaaaaaaaaaaaaaa',
    grade: 2,
    chapter: 3,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['도형', '면적'],
    content: {
      stem: { text: '정사각형의 한 변의 길이가 6cm일 때, 넓이는?' },
      choices: [
        { key: '①', text: '24cm²' },
        { key: '②', text: '30cm²' },
        { key: '③', text: '36cm²' },
        { key: '④', text: '42cm²' }
      ]
    },
    imageUrl: '/images/problems/square_area_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pbbbbbbbbbbbbbbbb': {
    problemId: '64fa0pbbbbbbbbbbbbbbbb',
    unitId: '64unit00bbbbbbbbbbbbbbbb',
    grade: 2,
    chapter: 4,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['시간', '기초'],
    content: {
      stem: { text: '1시간 30분은 몇 분인가요?' },
      choices: [
        { key: '①', text: '60분' },
        { key: '②', text: '80분' },
        { key: '③', text: '90분' },
        { key: '④', text: '120분' }
      ]
    },
    imageUrl: '/images/problems/time_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pcccccccccccccccc': {
    problemId: '64fa0pcccccccccccccccc',
    unitId: '64unit00cccccccccccccccc',
    grade: 2,
    chapter: 5,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '응용',
    level: '중',
    type: '객관식',
    tags: ['문제해결', '곱셈'],
    content: {
      stem: { text: '한 상자에 8개의 공이 들어있다. 5상자에는 몇 개의 공이 들어있나요?' },
      choices: [
        { key: '①', text: '35개' },
        { key: '②', text: '38개' },
        { key: '③', text: '40개' },
        { key: '④', text: '45개' }
      ]
    },
    imageUrl: '/images/problems/word_problem_002.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pdddddddddddddddd': {
    problemId: '64fa0pdddddddddddddddd',
    unitId: '64unit00dddddddddddddddd',
    grade: 2,
    chapter: 6,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['수', '패턴'],
    content: {
      stem: { text: '2, 4, 6, 8, ? 다음에 올 수는?' },
      choices: [
        { key: '①', text: '9' },
        { key: '②', text: '10' },
        { key: '③', text: '11' },
        { key: '④', text: '12' }
      ]
    },
    imageUrl: '/images/problems/pattern_002.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0peeeeeeeeeeeeeeee': {
    problemId: '64fa0peeeeeeeeeeeeeeee',
    unitId: '64unit00eeeeeeeeeeeeeeee',
    grade: 2,
    chapter: 7,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['도형', '둘레'],
    content: {
      stem: { text: '가로 5cm, 세로 3cm인 직사각형의 둘레는?' },
      choices: [
        { key: '①', text: '12cm' },
        { key: '②', text: '14cm' },
        { key: '③', text: '16cm' },
        { key: '④', text: '18cm' }
      ]
    },
    imageUrl: '/images/problems/rectangle_perimeter_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  // 3학년 문제들 (6개)
  '64fa0pffffffffffffffff': {
    problemId: '64fa0pffffffffffffffff',
    unitId: '64unit00ffffffffffffffff',
    grade: 3,
    chapter: 1,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '중',
    type: '객관식',
    tags: ['분수', '기초'],
    content: {
      stem: { text: '1/2 + 1/4 = ?' },
      choices: [
        { key: '①', text: '1/6' },
        { key: '②', text: '2/6' },
        { key: '③', text: '3/4' },
        { key: '④', text: '2/4' }
      ]
    },
    imageUrl: '/images/problems/fraction_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pgggggggggggggggg': {
    problemId: '64fa0pgggggggggggggggg',
    unitId: '64unit00gggggggggggggggg',
    grade: 3,
    chapter: 2,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '중',
    type: '객관식',
    tags: ['소수', '기초'],
    content: {
      stem: { text: '0.5 + 0.3 = ?' },
      choices: [
        { key: '①', text: '0.6' },
        { key: '②', text: '0.7' },
        { key: '③', text: '0.8' },
        { key: '④', text: '0.9' }
      ]
    },
    imageUrl: '/images/problems/decimal_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0phhhhhhhhhhhhhhhh': {
    problemId: '64fa0phhhhhhhhhhhhhhhh',
    unitId: '64unit00hhhhhhhhhhhhhhhh',
    grade: 3,
    chapter: 3,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '응용',
    level: '상',
    type: '객관식',
    tags: ['도형', '부피'],
    content: {
      stem: { text: '가로 3cm, 세로 2cm, 높이 4cm인 직육면체의 부피는?' },
      choices: [
        { key: '①', text: '18cm³' },
        { key: '②', text: '20cm³' },
        { key: '③', text: '24cm³' },
        { key: '④', text: '28cm³' }
      ]
    },
    imageUrl: '/images/problems/volume_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0piiiiiiiiiiiiiiii': {
    problemId: '64fa0piiiiiiiiiiiiiiii',
    unitId: '64unit00iiiiiiiiiiiiiiii',
    grade: 3,
    chapter: 4,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '적용',
    level: '중',
    type: '객관식',
    tags: ['문제해결', '분수'],
    content: {
      stem: { text: '한 봉지에 1/3kg의 과자가 들어있다. 3봉지에는 몇 kg의 과자가 들어있나요?' },
      choices: [
        { key: '①', text: '1/9kg' },
        { key: '②', text: '1/3kg' },
        { key: '③', text: '2/3kg' },
        { key: '④', text: '1kg' }
      ]
    },
    imageUrl: '/images/problems/word_problem_003.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pjjjjjjjjjjjjjjjj': {
    problemId: '64fa0pjjjjjjjjjjjjjjjj',
    unitId: '64unit00jjjjjjjjjjjjjjjj',
    grade: 3,
    chapter: 5,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '이해',
    level: '하',
    type: '객관식',
    tags: ['수', '규칙'],
    content: {
      stem: { text: '3, 6, 9, 12, ? 다음에 올 수는?' },
      choices: [
        { key: '①', text: '14' },
        { key: '②', text: '15' },
        { key: '③', text: '16' },
        { key: '④', text: '18' }
      ]
    },
    imageUrl: '/images/problems/pattern_003.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  },
  
  '64fa0pkkkkkkkkkkkkkkkk': {
    problemId: '64fa0pkkkkkkkkkkkkkkkk',
    unitId: '64unit00kkkkkkkkkkkkkkkk',
    grade: 3,
    chapter: 6,
    context: { source: '교과서', for: ['diagnostic', 'practice'] },
    cognitiveType: '응용',
    level: '상',
    type: '객관식',
    tags: ['도형', '대칭'],
    content: {
      stem: { text: '다음 도형 중 대칭축이 가장 많은 것은?' },
      choices: [
        { key: '①', text: '정삼각형' },
        { key: '②', text: '정사각형' },
        { key: '③', text: '정오각형' },
        { key: '④', text: '정육각형' }
      ]
    },
    imageUrl: '/images/problems/symmetry_001.png',
    createdAt: '2025-07-14T10:25:00Z',
    updatedAt: '2025-07-14T10:25:00Z'
  }
};
