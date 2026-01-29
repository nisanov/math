<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { MultiplicationGenerator } from '$lib/services/MultiplicationSumGenerator';
  import { resetSums, sums } from '$lib/client/state/sums.svelte';

  let selected = $state<number[]>([]);
  let bitmask = $state(0);

  onMount(() => {
    const stored = localStorage.getItem('multiplication');
    if (stored) {
      bitmask = parseInt(stored, 10);
      selected = Array.from({ length: 12 }, (_, i) => 1 << i).filter((val) => bitmask & val);
    }
  });

  function onTimesTableChanged() {
    bitmask = selected.reduce((acc, val) => acc | val, 0);
    localStorage.setItem('multiplication', String(bitmask));
  }

  function launch() {
    const generator = new MultiplicationGenerator(bitmask); // Tables 1 and 3
    sums.items = generator.generate();
    sums.bitmask = bitmask;
    sums.isActive = true;
    sums.onLaunch?.();
    sums.onTimerStart?.();
  }

  function cancel() {
    resetSums();
  }
</script>

<div class="ml-5">
  <button
    class="btn btn-soft btn-neutral"
    title="Erase"
    disabled={selected.length === 0 || !page.data.user || !sums.isActive}
    onclick={cancel}
  >
    <span class="icon-[oui--eraser]"></span>
  </button>
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn m-1 btn-primary">Multiplication</div>
    <ul tabindex="-1" class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
      {#each Array.from({ length: 12 }, (_, i) => i) as i (i)}
        <li>
          <label class="flex justify-between">
            <span>{i + 1} Times Table</span>
            <input
              type="checkbox"
              class="checkbox"
              value={1 << i}
              bind:group={selected}
              onchange={onTimesTableChanged}
            />
          </label>
        </li>
      {/each}
    </ul>
  </div>
  <button
    class="btn btn-accent"
    title="launch"
    disabled={selected.length === 0 || !page.data.user}
    onclick={launch}
  >
    <span class="icon-[carbon--rocket]"></span>
  </button>
</div>
