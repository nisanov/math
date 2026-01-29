import type { MultiplicationSum } from '$lib/services/MultiplicationSumGenerator';

export const sums = $state<{
  items: MultiplicationSum[];
  bitmask: number;
  elapsedTime: string;
  isActive: boolean;
  onLaunch: (() => void) | null;
  onTimerStart: (() => void) | null;
  onTimerStop: (() => void) | null;
  onReset: (() => void) | null;
}>({
  items: [],
  bitmask: 0,
  elapsedTime: '00:00',
  isActive: false,
  onLaunch: null,
  onTimerStart: null,
  onTimerStop: null,
  onReset: null
});

export function resetSums() {
  sums.items = [];
  sums.bitmask = 0;
  sums.elapsedTime = '00:00';
  sums.isActive = false;
  sums.onReset?.();
}
