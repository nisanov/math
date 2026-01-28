import type { MultiplicationSum } from '$lib/services/MultiplicationSumGenerator';

export const sums = $state<{
  items: MultiplicationSum[];
  onLaunch: (() => void) | null;
}>({
  items: [],
  onLaunch: null
});
