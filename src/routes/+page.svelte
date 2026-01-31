<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { invalidateAll } from '$app/navigation';
  import { sums } from '$lib/state/sums.svelte';
  import { toasts } from '$lib/state/toasts.svelte';
  import { TimeService } from '$lib/services/time';
  import JSConfetti from 'js-confetti';

  let confetti: JSConfetti;
  let answers = $state<string[]>([]);
  let inputs = $state<HTMLInputElement[]>([]);

  onMount(() => {
    confetti = new JSConfetti();

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
          const correct = sums.items.filter((s) => s.answered === true).length;
          const response = await fetch('/api/multiplication', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
              sequence: sums.sequence,
              questions: sums.items.length,
              correct: correct,
              time: sums.elapsedTime
            })
          });
          const result = await response.json();
          if (result.success) {
            let best: boolean = false;
            if (!page.data.best) {
              page.data.best = {
                time: sums.elapsedTime,
                correct: correct
              };
              best = true;
            } else {
              if (correct >= page.data.best.correct) {
                if (
                  TimeService.toSeconds(sums.elapsedTime) <
                  TimeService.toSeconds(page.data.best.time)
                ) {
                  page.data.best.time = sums.elapsedTime;
                  page.data.best.correct = correct;
                  best = true;
                }
              }
            }
            if (best) {
              toasts.show({
                type: 'success',
                content: `New Best Time! Well Done ${page.data.user.username}!`
              });
              await invalidateAll();
              await confetti.addConfetti();
            }
          } else {
            toasts.error(result.message);
          }
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
