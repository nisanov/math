<script lang="ts">
  import { sums } from '$lib/client/state/sums.svelte';

  let answers = $state<string[]>([]);

  $inspect(answers);
</script>

{#if sums.items.length > 0}
  <div class="grid grid-cols-5 gap-10 m-10">
    {#each sums.items as sum, i (i)}
      <div class="flex items-center justify-between gap-2">
        <span class="w-6 text-right text-sm opacity-60">{i + 1}.</span>
        <span>{sum.multiplicand} × {sum.multiplier} = </span>
        <div class="flex items-center gap-2">
          <input type="number" class="input input-bordered w-20" bind:value={answers[i]} />
          <span class="icon-[mdi-light--clock] opacity-50 text-blue-500"></span>
<!--          <span class="icon-[mdi-light&#45;&#45;check-circle] opacity-50 text-green-500"></span>-->
<!--          <span class="icon-[mdi-light&#45;&#45;alert-circle] opacity-50 text-red-500"></span>-->
        </div>
      </div>
    {/each}
  </div>
{/if}
