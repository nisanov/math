<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { sums } from '$lib/client/state/sums.svelte';

  let minutes = $state(0);
  let seconds = $state(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (intervalId) clearInterval(intervalId);
    minutes = 0;
    seconds = 0;

    intervalId = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
    }, 1000);
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    sums.elapsedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function resetTimer() {
    stopTimer();
    minutes = 0;
    seconds = 0;
  }

  onMount(() => {
    sums.onTimerStart = startTimer;
    sums.onTimerStop = stopTimer;
    sums.onReset = resetTimer;
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

{#if sums.isActive}
  <div class="flex items-center gap-2">
    <span class="countdown font-sans text-5xl font-light text-orange-500">
      <span
        style="--value:{minutes}; --digits:2;"
        aria-live="polite"
        aria-label={String(minutes).padStart(2, '0')}
      >
        {minutes}
      </span>
      :
      <span
        style="--value:{seconds}; --digits:2;"
        aria-live="polite"
        aria-label={String(seconds).padStart(2, '0')}
      >
        {seconds}
      </span>
    </span>
  </div>
{/if}
