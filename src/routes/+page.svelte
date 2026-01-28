<script lang="ts">
  import { sums } from '$lib/client/state/sums.svelte';
  import { onMount } from 'svelte';

  let answers = $state<string[]>([]);
  let inputs = $state<HTMLInputElement[]>([]);

  onMount(() => {
    sums.onLaunch = () => {
      answers = sums.items.map(() => '');
      setTimeout(() => inputs[0]?.focus(), 0);
    };
  });

  function compute(index: number) {
    console.log(answers[index]);
  }
</script>

{#if sums.items.length > 0}
  <div class="m-10 grid grid-cols-5 gap-10">
    {#each sums.items as sum, i (i)}
      <div class="flex items-center justify-between gap-2">
        <span class="w-6 text-right text-sm opacity-60">{i + 1}.</span>
        <span>{sum.multiplicand} × {sum.multiplier} = </span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            class="input-bordered input w-20"
            bind:value={answers[i]}
            bind:this={inputs[i]}
            onblur={() => compute(i)}
          />
          <span class="icon-[mdi-light--clock] text-blue-500 opacity-50"></span>
          <!--          <span class="icon-[mdi-light&#45;&#45;check-circle] opacity-50 text-green-500"></span>-->
          <!--          <span class="icon-[mdi-light&#45;&#45;alert-circle] opacity-50 text-red-500"></span>-->
        </div>
      </div>
    {/each}
  </div>
{/if}
