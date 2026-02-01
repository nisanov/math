export interface Multiplication {
  multiplicand: number;
  multiplier: number;
  answer: number;
  answered: boolean | null;
}

export class MultiplicationService {
  private readonly tables: number[] = [];
  private readonly questions: number;

  constructor(bitmask: number, questions: number) {
    this.tables = Array.from({ length: 12 }, (_, i) => i + 1).filter((_, i) => bitmask & (1 << i));
    this.questions = questions;
  }

  generate(): Multiplication[] {
    if (this.tables.length === 0) {
      return [];
    }

    const pool: Multiplication[] = [];
    for (const multiplicand of this.tables) {
      for (let multiplier = 1; multiplier <= 12; multiplier++) {
        pool.push({
          multiplicand,
          multiplier,
          answer: multiplicand * multiplier,
          answered: null
        });
      }
    }

    // Fisher–Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const sums: Multiplication[] = [];
    for (let i = 0; i < this.questions; i++) {
      const pick = pool[i % pool.length];
      sums.push({ ...pick });
    }

    return sums;
  }
}
