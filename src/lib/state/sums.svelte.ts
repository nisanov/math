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
  questions: 5,
  elapsedTime: '00:00:00',
  isActive: false,
  onLaunch: null,
  onTimerStart: null,
  onTimerStop: null,
  onReset: null
});

export function resetSums() {
  sums.items = [];
  sums.sequence = 0;
  sums.elapsedTime = '00:00:00';
  sums.isActive = false;
  sums.onReset?.();
}
