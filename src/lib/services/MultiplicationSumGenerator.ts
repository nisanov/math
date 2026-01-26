export interface MultiplicationSum {
  multiplicand: number;
  multiplier: number;
  answer: number;
}

export class MultiplicationGenerator {
  static readonly SUM_COUNT = 12;

  private readonly tables: number[] = [];

  constructor(bitmask: number) {
    // Extract selected tables from bitmask (1-12)
    this.tables = Array.from({ length: 12 }, (_, i) => i + 1).filter(
      (_, i) => bitmask & (1 << i)
    );
  }

  generate(): MultiplicationSum[] {
    if (this.tables.length === 0) {
      return [];
    }

    const sums: MultiplicationSum[] = [];

    for (let i = 0; i < MultiplicationGenerator.SUM_COUNT; i++) {
      const multiplicand = this.tables[Math.floor(Math.random() * this.tables.length)];
      const multiplier = Math.floor(Math.random() * 12) + 1;

      sums.push({
        multiplicand,
        multiplier,
        answer: multiplicand * multiplier
      });
    }

    return sums;
  }
}
