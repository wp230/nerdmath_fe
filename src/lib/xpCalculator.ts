// API 명세서의 XP 지급 규칙 기반 계산
export class XPCalculator {
  // XP 지급 규칙 (API_README.md 참조)
  private static readonly XP_RULES = {
    concept_completed: 20,
    problem_solved_correct: 15,
    problem_solved_incorrect: 10,
    vocab_solved_correct: 5,
    vocab_solved_incorrect: 3,
    unit_completed: 10,
    streak_bonus: 10,
  };

  // 레벨업 기준 계산 (API 명세서 공식)
  // 필요 XP = 50 + (레벨 - 1) × 25 + (레벨 - 1) × (레벨 - 2) × 25
  static calculateNextLevelXP(currentLevel: number): number {
    return (
      50 +
      (currentLevel - 1) * 25 +
      (currentLevel - 1) * (currentLevel - 2) * 25
    );
  }

  // 문제 풀이 XP 계산
  static calculateProblemXP(
    isCorrect: boolean,
    mode: 'vocab_test' | 'practice'
  ): number {
    if (mode === 'vocab_test') {
      return isCorrect
        ? this.XP_RULES.vocab_solved_correct
        : this.XP_RULES.vocab_solved_incorrect;
    } else {
      return isCorrect
        ? this.XP_RULES.problem_solved_correct
        : this.XP_RULES.problem_solved_incorrect;
    }
  }

  // 개념 학습 완료 XP
  static getConceptCompletionXP(): number {
    return this.XP_RULES.concept_completed;
  }

  // 단원 완료 보너스 XP
  static getUnitCompletionBonus(): number {
    return this.XP_RULES.unit_completed;
  }

  // 연속 정답 보너스 XP
  static getStreakBonus(): number {
    return this.XP_RULES.streak_bonus;
  }

  // 레벨업 체크 및 계산
  static checkLevelUp(
    currentXP: number,
    gainedXP: number,
    currentLevel: number
  ): {
    newLevel: number;
    leveledUp: boolean;
    remainingXP: number;
    totalXP: number;
  } {
    const totalXP = currentXP + gainedXP;
    let newLevel = currentLevel;
    let leveledUp = false;

    // 레벨업 가능한지 체크
    while (totalXP >= this.calculateNextLevelXP(newLevel)) {
      newLevel++;
      leveledUp = true;
    }

    // 현재 레벨에서 남은 XP 계산
    const remainingXP =
      totalXP - (newLevel > 1 ? this.calculateNextLevelXP(newLevel - 1) : 0);

    return {
      newLevel,
      leveledUp,
      remainingXP,
      totalXP,
    };
  }

  // 전체 XP 계산 (레벨 기준)
  static calculateTotalXP(level: number, currentLevelXP: number): number {
    if (level <= 1) return currentLevelXP;

    let totalXP = 0;
    for (let i = 1; i < level; i++) {
      totalXP += this.calculateNextLevelXP(i);
    }
    return totalXP + currentLevelXP;
  }

  // 레벨별 XP 요구량 테이블 생성 (디버깅용)
  static generateLevelXPTable(maxLevel: number = 10): Array<{
    level: number;
    requiredXP: number;
    cumulativeXP: number;
    increase: number;
  }> {
    const table = [];
    let cumulativeXP = 0;
    let previousRequired = 0;

    for (let level = 1; level <= maxLevel; level++) {
      const requiredXP = this.calculateNextLevelXP(level);
      const increase = level > 1 ? requiredXP - previousRequired : requiredXP;
      cumulativeXP += requiredXP;

      table.push({
        level,
        requiredXP,
        cumulativeXP,
        increase,
      });

      previousRequired = requiredXP;
    }

    return table;
  }
}
