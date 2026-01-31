<script lang="ts">
  import { page } from '$app/state';
  import { sums } from '$lib/state/sums.svelte';
  import { onMount } from 'svelte';
  import { toasts } from '$lib/state/toasts.svelte';

  let answers = $state<string[]>([]);
  let inputs = $state<HTMLInputElement[]>([]);

  onMount(() => {
    sums.onLaunch = () => {
      answers = sums.items.map(() => '');
      setTimeout(() => inputs[0]?.focus(), 0);
    };
  });

  async function compute(index: number) {
    if (answers[index].toString().trim() !== '') {
      sums.items[index].answered =
        answers[index].toString() === sums.items[index].answer.toString();
      if (sums.items.every((sum) => sum.answered !== null)) {
        sums.onTimerStop?.();
        if (page.data.user) {
          const response = await fetch('/api/multiplication', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
              sequence: sums.sequence,
              questions: sums.items.length,
              correct: sums.items.filter((s) => s.answered === true).length,
              time: sums.elapsedTime
            })
          });
          const result = await response.json();
          toasts.show({ type: result.success ? 'success' : 'error', content: result.message });
        }
      }
    }
  }
</script>

{#if sums.items.length > 0 && page.data.user}
  <div class="m-10 grid grid-cols-5 gap-10">
    {#each sums.items as sum, i (i)}
      <div class="flex items-center justify-between gap-2">
        <span class="w-6 text-right text-sm opacity-60">{i + 1}.</span>
        <span>{sum.multiplicand} × {sum.multiplier} = </span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            class="input-bordered input w-20"
            disabled={sum.answered !== null}
            bind:value={answers[i]}
            bind:this={inputs[i]}
            onblur={() => compute(i)}
          />
          {#if sum.answered === true}
            <span class="icon-[mdi-light--check-circle] text-green-500 opacity-50"></span>
          {:else if sum.answered === false}
            <span class="icon-[mdi-light--alert-circle] text-red-500 opacity-50"></span>
          {:else}
            <span class="icon-[mdi-light--clock] text-blue-500 opacity-50"></span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}
