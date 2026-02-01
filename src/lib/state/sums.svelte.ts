import type { Multiplication } from '$lib/services/multiplication';

export const sums = $state<{
  items: Multiplication[];
  sequence: number;
  questions: number;
  elapsedTime: string;
  isActive: boolean;
  onLaunch: (() => void) | null;
  onTimerStart: (() => void) | null;
  onTimerStop: (() => void) | null;
  onReset: (() => void) | null;
}>({
  items: [],
  sequence: 0,
  questions: 10,
  elapsedTime: '00:00:00',
  isActive: false,
  onLaunch: null,
  onTimerStart: null,
  onTimerStop: null,
  onReset: null
});

export class Sums {
  public static completed(): boolean {
    return sums.items.every((sum: Multiplication): boolean => sum.answered !== null);
  }
  public static correct(): number {
    return sums.items.filter((sum: Multiplication): boolean => sum.answered === true).length;
  }
  public static percentage(): number {
    return Math.round((this.correct() / sums.questions) * 100);
  }
}

export function resetSums(): void {
  sums.items = [];
  sums.sequence = 0;
  sums.elapsedTime = '00:00:00';
  sums.isActive = false;
  sums.onReset?.();
}
