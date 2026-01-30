export interface MultiplicationSum {
  multiplicand: number;
  multiplier: number;
  answer: number;
  answered: boolean | null;
}

export class MultiplicationGenerator {
  private readonly tables: number[] = [];
  private readonly questions: number;

  constructor(bitmask: number, questions: number) {
    this.tables = Array.from({ length: 12 }, (_, i) => i + 1).filter((_, i) => bitmask & (1 << i));
    this.questions = questions;
  }

  generate(): MultiplicationSum[] {
    if (this.tables.length === 0) {
      return [];
    }

    const sums: MultiplicationSum[] = [];

    for (let i = 0; i < this.questions; i++) {
      const multiplicand = this.tables[Math.floor(Math.random() * this.tables.length)];
      const multiplier = Math.floor(Math.random() * 12) + 1;

      sums.push({
        multiplicand,
        multiplier,
        answer: multiplicand * multiplier,
        answered: null
      });
    }

    return sums;
  }
}
