// 대단원(unit)별 기본 정보
export const UNIT_DATA = {
  unit_01: {
    unitId: 'unit_01',
    title: '수와 연산',
    description:
      '자연수부터 실수까지, 수의 체계와 연산을 체계적으로 학습합니다.',
    linkPath: '/math/unit_01',
    backgroundColor: 'rgb(0, 176, 255)',
  },
  unit_02: {
    unitId: 'unit_02',
    title: '문자와 식',
    description: '문자를 사용한 식과 방정식, 부등식을 체계적으로 학습합니다.',
    linkPath: '/math/unit_02',
    backgroundColor: 'rgb(147, 51, 234)',
  },
  unit_03: {
    unitId: 'unit_03',
    title: '함수',
    description:
      '함수의 개념과 그래프, 다양한 함수의 성질을 체계적으로 학습합니다.',
    linkPath: '/math/unit_03',
    backgroundColor: 'rgb(251, 191, 36)',
  },
  unit_04: {
    unitId: 'unit_04',
    title: '확률과 통계',
    description: '경우의 수, 확률, 통계적 분석을 체계적으로 학습합니다.',
    linkPath: '/math/unit_04',
    backgroundColor: 'rgb(59, 130, 246)',
  },
  unit_05: {
    unitId: 'unit_05',
    title: '기하',
    description: '평면도형과 입체도형의 성질과 관계를 체계적으로 학습합니다.',
    linkPath: '/math/unit_05',
    backgroundColor: 'rgb(34, 197, 94)',
  },
};

// 대단원(unit)별 소단원(chapter) 데이터
export const UNIT_CHAPTERS = {
  unit_01: [
    {
      chapter: 1,
      title: '소수와 합성수, 소인수분해',
      subtitle: '소수와 합성수',
      grade: 1,
      description:
        '소수와 합성수의 개념을 이해하고, 소인수분해를 통해 자연수를 소수의 곱으로 나타내는 방법을 학습합니다.',
    },
    {
      chapter: 2,
      title: '최대공약수와 최소공배수',
      subtitle: '최대공약수와 최소공배수',
      grade: 1,
      description:
        '최대공약수와 최소공배수의 개념을 이해하고, 유클리드 호제법을 활용하여 구하는 방법을 학습합니다.',
    },
    {
      chapter: 3,
      title: '정수와 유리수',
      subtitle: '정수와 유리수',
      grade: 1,
      description:
        '정수와 유리수의 개념을 이해하고, 수직선에서의 위치와 대소관계를 파악하는 방법을 학습합니다.',
    },
    {
      chapter: 4,
      title: '절댓값',
      subtitle: '절댓값',
      grade: 1,
      description:
        '절댓값의 개념과 성질을 이해하고, 절댓값이 포함된 식의 계산과 부등식을 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 5,
      title: '정수와 유리수의 덧셈, 뺄셈',
      subtitle: '덧셈과 뺄셈',
      grade: 1,
      description:
        '정수와 유리수의 덧셈과 뺄셈을 학습하고, 수직선을 활용하여 계산하는 방법을 익힙니다.',
    },
    {
      chapter: 6,
      title: '정수와 유리수의 곱셈, 나눗셈',
      subtitle: '곱셈과 나눗셈',
      grade: 1,
      description:
        '정수와 유리수의 곱셈과 나눗셈을 학습하고, 음수의 곱셈과 나눗셈의 부호 규칙을 이해합니다.',
    },
    {
      chapter: 7,
      title: '유리수와 유한소수',
      subtitle: '유한소수',
      grade: 2,
      description:
        '유리수를 소수로 나타내는 방법을 학습하고, 유한소수와 무한소수의 개념을 이해합니다.',
    },
    {
      chapter: 8,
      title: '순환소수',
      subtitle: '순환소수',
      grade: 2,
      description:
        '순환소수의 개념과 성질을 이해하고, 순환소수를 분수로 나타내는 방법을 학습합니다.',
    },
    {
      chapter: 9,
      title: '제곱근의 뜻과 성질',
      subtitle: '제곱근',
      grade: 3,
      description:
        '제곱근의 뜻과 성질을 이해하고, 제곱근의 기본적인 계산을 학습합니다.',
    },
    {
      chapter: 10,
      title: '무리수와 실수',
      subtitle: '무리수와 실수',
      grade: 3,
      description:
        '무리수의 개념을 이해하고, 실수 체계에서의 위치와 성질을 학습합니다.',
    },
    {
      chapter: 11,
      title: '실수의 대소 관계',
      subtitle: '실수의 대소관계',
      grade: 3,
      description:
        '실수의 대소관계를 이해하고, 수직선에서의 위치를 비교하는 방법을 학습합니다.',
    },
    {
      chapter: 12,
      title: '제곱근의 곱셈과 나눗셈, 분모의 유리화',
      subtitle: '제곱근의 곱셈과 나눗셈',
      grade: 3,
      description:
        '제곱근의 곱셈과 나눗셈을 학습하고, 분모의 유리화를 통해 분모를 유리수로 만드는 방법을 익힙니다.',
    },
    {
      chapter: 13,
      title: '제곱근의 덧셈과 뺄셈',
      subtitle: '제곱근의 덧셈과 뺄셈',
      grade: 3,
      description:
        '제곱근의 덧셈과 뺄셈을 학습하고, 동류항을 정리하여 계산하는 방법을 익힙니다.',
    },
  ],
  unit_02: [
    {
      chapter: 1,
      title: '문자와 식',
      subtitle: '문자와 식',
      grade: 1,
      description:
        '문자와 식의 기본 개념을 이해하고, 문자를 사용하여 수학적 관계를 표현하는 방법을 학습합니다.',
    },
    {
      chapter: 2,
      title: '일차식의 사칙 연산',
      subtitle: '일차식의 사칙연산',
      grade: 1,
      description:
        '일차식의 덧셈, 뺄셈, 곱셈, 나눗셈을 학습하고, 식을 정리하는 방법을 익힙니다.',
    },
    {
      chapter: 3,
      title: '항등식',
      subtitle: '항등식',
      grade: 1,
      description:
        '항등식의 개념을 이해하고, 주어진 식이 항등식인지 확인하는 방법을 학습합니다.',
    },
    {
      chapter: 4,
      title: '일차방정식의 풀이',
      subtitle: '일차방정식',
      grade: 1,
      description:
        '일차방정식을 풀이하는 방법을 학습하고, 다양한 문제에 적용하는 능력을 기릅니다.',
    },
    {
      chapter: 5,
      title: '소금물의 농도',
      subtitle: '소금물의 농도',
      grade: 1,
      description:
        '소금물의 농도 문제를 방정식을 사용하여 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 6,
      title: '속력과 증가, 감소',
      subtitle: '속력과 변화',
      grade: 1,
      description:
        '속력과 관련된 문제와 증가, 감소 문제를 방정식으로 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 7,
      title: '지수 법칙',
      subtitle: '지수 법칙',
      grade: 2,
      description:
        '지수의 기본 법칙을 이해하고, 지수가 포함된 식을 계산하는 방법을 학습합니다.',
    },
    {
      chapter: 8,
      title: '단항식의 곱셈과 나눗셈',
      subtitle: '단항식',
      grade: 2,
      description:
        '단항식의 곱셈과 나눗셈을 학습하고, 지수 법칙을 활용하여 계산하는 방법을 익힙니다.',
    },
    {
      chapter: 9,
      title: '다항식의 사칙 연산',
      subtitle: '다항식',
      grade: 2,
      description:
        '다항식의 덧셈, 뺄셈, 곱셈, 나눗셈을 학습하고, 식을 정리하는 방법을 익힙니다.',
    },
    {
      chapter: 10,
      title: '일차부등식의 풀이',
      subtitle: '일차부등식',
      grade: 2,
      description:
        '일차부등식을 풀이하는 방법을 학습하고, 부등식의 해를 수직선에 나타내는 방법을 익힙니다.',
    },
    {
      chapter: 11,
      title: '일차부등식의 활용',
      subtitle: '부등식 활용',
      grade: 2,
      description:
        '일차부등식을 실생활 문제에 적용하여 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 12,
      title: '연립방정식의 풀이',
      subtitle: '연립방정식',
      grade: 2,
      description:
        '연립방정식을 풀이하는 방법을 학습하고, 대입법과 가감법을 활용합니다.',
    },
    {
      chapter: 13,
      title: '여러 가지 연립방정식',
      subtitle: '다양한 연립방정식',
      grade: 2,
      description:
        '분수계수가 있는 연립방정식과 괄호가 있는 연립방정식의 풀이 방법을 학습합니다.',
    },
    {
      chapter: 14,
      title: '연립방정식의 활용',
      subtitle: '연립방정식 활용',
      grade: 2,
      description:
        '연립방정식을 실생활 문제에 적용하여 해결하는 방법을 학습합니다.',
    },
  ],
  unit_03: [
    {
      chapter: 1,
      title: '순서쌍과 좌표',
      subtitle: '순서쌍과 좌표',
      grade: 1,
      description:
        '순서쌍과 좌표의 개념을 이해하고, 좌표평면에서의 위치를 파악하는 방법을 학습합니다.',
    },
    {
      chapter: 2,
      title: '함수 y=a/x의 그래프와 정비례',
      subtitle: '정비례',
      grade: 1,
      description:
        '정비례 관계를 이해하고, y=ax 형태의 함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 3,
      title: '함수 y=a/x의 그래프와 반비례',
      subtitle: '반비례',
      grade: 1,
      description:
        '반비례 관계를 이해하고, y=a/x 형태의 함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 4,
      title: '함수와 함숫값',
      subtitle: '함수와 함숫값',
      grade: 2,
      description: '함수의 기본 개념과 함숫값을 구하는 방법을 학습합니다.',
    },
    {
      chapter: 5,
      title: '일차함수의 뜻과 그래프',
      subtitle: '일차함수',
      grade: 2,
      description:
        '일차함수의 개념을 이해하고, y=ax+b 형태의 함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 6,
      title: '일차함수의 절편과 기울기',
      subtitle: '절편과 기울기',
      grade: 2,
      description:
        '일차함수의 x절편, y절편, 기울기의 개념과 구하는 방법을 학습합니다.',
    },
    {
      chapter: 7,
      title: '일차함수의 그래프의 성질',
      subtitle: '그래프 성질',
      grade: 2,
      description:
        '일차함수 그래프의 성질을 이해하고, 기울기와 y절편에 따른 그래프의 변화를 학습합니다.',
    },
    {
      chapter: 8,
      title: '일차함수와 일차방정식',
      subtitle: '함수와 방정식',
      grade: 2,
      description:
        '일차함수와 일차방정식의 관계를 이해하고, 그래프를 이용한 방정식의 해를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 9,
      title: '직선의 방정식 구하기',
      subtitle: '직선의 방정식',
      grade: 2,
      description:
        '주어진 조건을 만족하는 직선의 방정식을 구하는 방법을 학습합니다.',
    },
    {
      chapter: 10,
      title: '연립방정식의 해와 두 직선의 교점',
      subtitle: '교점',
      grade: 2,
      description:
        '연립방정식의 해와 두 직선의 교점의 관계를 이해하고, 그래프를 이용한 해를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 11,
      title: '이차함수의 뜻과 그래프',
      subtitle: '이차함수',
      grade: 3,
      description:
        '이차함수의 개념을 이해하고, 기본적인 이차함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 12,
      title: '이차함수의 그래프(기본형)',
      subtitle: '기본형',
      grade: 3,
      description:
        'y=ax² 형태의 기본형 이차함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 13,
      title: '이차함수의 그래프(표준형)',
      subtitle: '표준형',
      grade: 3,
      description:
        'y=a(x-p)²+q 형태의 표준형 이차함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 14,
      title: '이차함수의 그래프(일반형)',
      subtitle: '일반형',
      grade: 3,
      description:
        'y=ax²+bx+c 형태의 일반형 이차함수 그래프를 그리는 방법을 학습합니다.',
    },
    {
      chapter: 15,
      title: '이차함수의 계수와 부호와 식 구하기',
      subtitle: '계수와 부호',
      grade: 3,
      description:
        '이차함수의 계수와 부호를 이용하여 함수식을 구하는 방법을 학습합니다.',
    },
  ],
  unit_04: [
    {
      chapter: 1,
      title: '경우의 수',
      subtitle: '경우의 수',
      grade: 2,
      description:
        '경우의 수의 기본 개념을 이해하고, 체계적으로 세는 방법을 학습합니다.',
    },
    {
      chapter: 2,
      title: '여러 가지 경우의 수 - 한 줄로 세우기',
      subtitle: '순열',
      grade: 2,
      description:
        '순열의 개념을 이해하고, nPr을 이용하여 경우의 수를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 3,
      title: '여러 가지 경우의 수 - 대표 뽑기',
      subtitle: '조합',
      grade: 2,
      description:
        '조합의 개념을 이해하고, nCr을 이용하여 경우의 수를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 4,
      title: '확률의 뜻과 성질',
      subtitle: '확률의 뜻',
      grade: 2,
      description:
        '확률의 기본 개념과 성질을 이해하고, 확률을 구하는 방법을 학습합니다.',
    },
    {
      chapter: 5,
      title: '확률의 계산',
      subtitle: '확률 계산',
      grade: 2,
      description:
        '여러 사건의 확률을 계산하는 방법과 확률의 덧셈정리, 곱셈정리를 학습합니다.',
    },
    {
      chapter: 6,
      title: '도수분포표와 상대도수',
      subtitle: '도수분포',
      grade: 1,
      description:
        '도수분포표를 작성하고, 상대도수를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 7,
      title: '대푯값(평균, 중앙값, 최빈값)',
      subtitle: '대푯값',
      grade: 3,
      description:
        '평균, 중앙값, 최빈값의 개념을 이해하고, 구하는 방법을 학습합니다.',
    },
    {
      chapter: 8,
      title: '분산과 표준편차',
      subtitle: '분산과 표준편차',
      grade: 3,
      description:
        '분산과 표준편차의 개념을 이해하고, 구하는 방법을 학습합니다.',
    },
    {
      chapter: 9,
      title: '도수분포표에서의 분산과 표준편차',
      subtitle: '도수분포 통계',
      grade: 3,
      description:
        '도수분포표가 주어졌을 때 분산과 표준편차를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 10,
      title: '산정도와 상관관계',
      subtitle: '상관관계',
      grade: 3,
      description:
        '산점도를 그리고, 두 변수 간의 상관관계를 파악하는 방법을 학습합니다.',
    },
  ],
  unit_05: [
    {
      chapter: 1,
      title: '직선, 반직선, 선분, 두 점 사이의 거리',
      subtitle: '기본 도형',
      grade: 1,
      description:
        '직선, 반직선, 선분의 개념을 이해하고, 두 점 사이의 거리를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 2,
      title: '각, 수직과 수선',
      subtitle: '각과 수직',
      grade: 1,
      description:
        '각의 기본 개념과 수직, 수선의 관계를 이해하고, 각도를 측정하는 방법을 학습합니다.',
    },
    {
      chapter: 3,
      title: '점과 직선, 점과 평면, 두 직선의 위치 관계',
      subtitle: '위치 관계',
      grade: 1,
      description:
        '점과 직선, 점과 평면, 두 직선 사이의 위치 관계를 이해하고, 평행과 수직의 개념을 학습합니다.',
    },
    {
      chapter: 4,
      title: '공간에서 직선과 평면, 두 평면의 위치 관계',
      subtitle: '공간 관계',
      grade: 1,
      description:
        '공간에서의 직선과 평면, 두 평면 사이의 위치 관계를 이해하고, 공간 도형의 성질을 학습합니다.',
    },
    {
      chapter: 5,
      title: '동위각과 엇각, 평행선의 성질',
      subtitle: '평행선',
      grade: 1,
      description:
        '동위각과 엇각의 개념을 이해하고, 평행선의 성질을 학습합니다.',
    },
    {
      chapter: 6,
      title: '삼각형',
      subtitle: '삼각형',
      grade: 1,
      description:
        '삼각형의 기본 성질과 종류를 이해하고, 삼각형의 내각과 외각의 관계를 학습합니다.',
    },
    {
      chapter: 7,
      title: '삼각형의 합동',
      subtitle: '삼각형 합동',
      grade: 1,
      description:
        '삼각형의 합동 조건을 이해하고, 합동인 삼각형을 찾는 방법을 학습합니다.',
    },
    {
      chapter: 8,
      title: '다각형의 내각과 외각',
      subtitle: '다각형',
      grade: 1,
      description:
        '다각형의 내각과 외각의 관계를 이해하고, 내각의 합과 외각의 합을 구하는 방법을 학습합니다.',
    },
    {
      chapter: 9,
      title: '원과 부채꼴',
      subtitle: '원과 부채꼴',
      grade: 1,
      description: '원의 기본 성질과 부채꼴의 넓이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 10,
      title: '다면체',
      subtitle: '다면체',
      grade: 1,
      description:
        '다면체의 개념과 종류를 이해하고, 정다면체의 성질을 학습합니다.',
    },
    {
      chapter: 11,
      title: '회전체',
      subtitle: '회전체',
      grade: 1,
      description:
        '회전체의 개념과 종류를 이해하고, 회전체의 성질을 학습합니다.',
    },
    {
      chapter: 12,
      title: '기둥, 뿔, 구의 겉넓이와 부피',
      subtitle: '입체도형',
      grade: 1,
      description:
        '기둥, 뿔, 구의 겉넓이와 부피를 구하는 공식을 이해하고, 계산하는 방법을 학습합니다.',
    },
    {
      chapter: 13,
      title: '이등변삼각형',
      subtitle: '이등변삼각형',
      grade: 2,
      description:
        '이등변삼각형의 성질을 이해하고, 이등변삼각형임을 증명하는 방법을 학습합니다.',
    },
    {
      chapter: 14,
      title: '삼각형의 외심',
      subtitle: '외심',
      grade: 2,
      description:
        '삼각형의 외심의 개념과 성질을 이해하고, 외심을 찾는 방법을 학습합니다.',
    },
    {
      chapter: 15,
      title: '삼각형의 내심',
      subtitle: '내심',
      grade: 2,
      description:
        '삼각형의 내심의 개념과 성질을 이해하고, 내심을 찾는 방법을 학습합니다.',
    },
    {
      chapter: 16,
      title: '삼각형의 내접원의 활용',
      subtitle: '내접원',
      grade: 2,
      description:
        '삼각형의 내접원의 성질을 이해하고, 내접원을 활용하여 문제를 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 17,
      title: '평행사변형',
      subtitle: '평행사변형',
      grade: 2,
      description:
        '평행사변형의 성질을 이해하고, 평행사변형임을 증명하는 방법을 학습합니다.',
    },
    {
      chapter: 18,
      title: '여러 가지 사각형',
      subtitle: '사각형',
      grade: 2,
      description:
        '사각형의 종류와 각각의 성질을 이해하고, 사각형을 분류하는 방법을 학습합니다.',
    },
    {
      chapter: 19,
      title: '여러 가지 사각형 사이의 관계, 평행선의 넓이',
      subtitle: '사각형 관계',
      grade: 2,
      description:
        '여러 가지 사각형 사이의 관계를 이해하고, 평행선을 이용한 넓이 구하는 방법을 학습합니다.',
    },
    {
      chapter: 20,
      title: '닮은 도형',
      subtitle: '닮은 도형',
      grade: 2,
      description:
        '닮은 도형의 개념과 성질을 이해하고, 닮은 도형임을 증명하는 방법을 학습합니다.',
    },
    {
      chapter: 21,
      title: '닮음의 활용',
      subtitle: '닮음 활용',
      grade: 2,
      description:
        '닮은 도형의 성질을 활용하여 길이, 넓이, 부피를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 22,
      title: '각의 이등분선, 평행선과 선분',
      subtitle: '이등분선',
      grade: 2,
      description:
        '각의 이등분선의 성질과 평행선과 선분의 관계를 이해하고, 이를 활용하는 방법을 학습합니다.',
    },
    {
      chapter: 23,
      title: '삼각형의 두 변의 중점을 연결한 선분의 성질',
      subtitle: '중점 연결',
      grade: 2,
      description:
        '삼각형의 두 변의 중점을 연결한 선분의 성질을 이해하고, 이를 활용하는 방법을 학습합니다.',
    },
    {
      chapter: 24,
      title: '삼각형의 중선과 무게중심',
      subtitle: '중선과 무게중심',
      grade: 2,
      description:
        '삼각형의 중선과 무게중심의 개념과 성질을 이해하고, 무게중심을 찾는 방법을 학습합니다.',
    },
    {
      chapter: 25,
      title: '닮은 도형의 넓이와 부피',
      subtitle: '닮은 도형의 크기',
      grade: 2,
      description:
        '닮은 도형의 넓이 비와 부피 비의 관계를 이해하고, 이를 활용하여 넓이와 부피를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 26,
      title: '피타고라스의 정리',
      subtitle: '피타고라스 정리',
      grade: 3,
      description:
        '피타고라스의 정리를 이해하고, 직각삼각형에서 빗변의 길이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 27,
      title: '피타고라스의 정리의 설명',
      subtitle: '피타고스 정리 설명',
      grade: 3,
      description:
        '피타고라스의 정리가 성립하는 이유를 이해하고, 정리를 증명하는 방법을 학습합니다.',
    },
    {
      chapter: 28,
      title: '피타고라스의 정리(도형의 성질)',
      subtitle: '피타고라스 도형',
      grade: 3,
      description:
        '피타고라스의 정리를 이용하여 도형의 성질을 파악하고, 문제를 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 29,
      title: '피타고라스의 정리(평면 활용)',
      subtitle: '피타고라스 평면',
      grade: 3,
      description:
        '피타고라스의 정리를 평면 도형에 적용하여 문제를 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 30,
      title: '피타고라스의 정리(입체 활용)',
      subtitle: '피타고라스 입체',
      grade: 3,
      description:
        '피타고라스의 정리를 입체 도형에 적용하여 문제를 해결하는 방법을 학습합니다.',
    },
    {
      chapter: 31,
      title: '삼각비',
      subtitle: '삼각비',
      grade: 3,
      description:
        '삼각비의 개념을 이해하고, 사인, 코사인, 탄젠트의 값을 구하는 방법을 학습합니다.',
    },
    {
      chapter: 32,
      title: '삼각비의 활용(변의 길이)',
      subtitle: '삼각비 변의 길이',
      grade: 3,
      description:
        '삼각비를 이용하여 삼각형의 변의 길이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 33,
      title: '삼각비의 활용(도형의 넓이)',
      subtitle: '삼각비 도형의 넓이',
      grade: 3,
      description: '삼각비를 이용하여 도형의 넓이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 34,
      title: '원의 현',
      subtitle: '원의 현',
      grade: 3,
      description:
        '원의 현의 개념과 성질을 이해하고, 현의 길이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 35,
      title: '원의 접선',
      subtitle: '원의 접선',
      grade: 3,
      description:
        '원의 접선의 개념과 성질을 이해하고, 접선의 길이를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 36,
      title: '원주각',
      subtitle: '원주각',
      grade: 3,
      description:
        '원주각의 개념과 성질을 이해하고, 원주각의 크기를 구하는 방법을 학습합니다.',
    },
    {
      chapter: 37,
      title: '원주각의 활용',
      subtitle: '원주각 활용',
      grade: 3,
      description:
        '원주각의 성질을 활용하여 원과 관련된 문제를 해결하는 방법을 학습합니다.',
    },
  ],
};

// 대단원별 대표 단원명 모음
export const UNIT_GRADE_NAMES = {
  unit_01: {
    id: 1,
    title: '수와 연산',
    gradeNames: {
      1: {
        id: 1,
        name: '자연수와 정수, 유리수의 기초',
        range: '1.1~1.6',
      },
      2: {
        id: 2,
        name: '소수와 순환소수',
        range: '1.7~1.8',
      },
      3: {
        id: 3,
        name: '제곱근과 무리수, 실수',
        range: '1.9~1.13',
      },
    },
  },
  unit_02: {
    id: 2,
    title: '문자와 식',
    gradeNames: {
      1: {
        id: 1,
        name: '일차식과 일차방정식의 기초',
        range: '2.1~2.6',
      },
      2: {
        id: 2,
        name: '연립방정식과 부등식',
        range: '2.7~2.14',
      },
    },
  },
  unit_03: {
    id: 3,
    title: '함수',
    gradeNames: {
      1: {
        id: 1,
        name: '순서쌍과 좌표, 정비례, 반비례',
        range: '3.1~3.3',
      },
      2: {
        id: 2,
        name: '함수와 함숫값, 일차함수의 뜻과 그래프',
        range: '3.4~3.10',
      },
      3: {
        id: 3,
        name: '이차함수의 뜻과 그래프',
        range: '3.11~3.15',
      },
    },
  },
  unit_04: {
    id: 4,
    title: '확률과 통계',
    gradeNames: {
      1: {
        id: 1,
        name: '통계적 추정',
        range: '4.6',
      },
      2: {
        id: 2,
        name: '경우의 수와 확률의 기초',
        range: '4.1~4.5',
      },
      3: {
        id: 3,
        name: '통계적 분석과 검정',
        range: '4.7~4.10',
      },
    },
  },
  unit_05: {
    id: 5,
    title: '기하',
    gradeNames: {
      1: {
        id: 1,
        name: '도형의 기초와 평면도형',
        range: '5.1~5.12',
      },
      2: {
        id: 2,
        name: '삼각형과 사각형의 성질, 닮음',
        range: '5.13~5.25',
      },
      3: {
        id: 3,
        name: '피타고라스 정리와 삼각비, 원',
        range: '5.26~5.37',
      },
    },
  },
};
