<script lang="ts">
  import { onMount } from 'svelte';

  let selected = $state<number[]>([]);

  onMount(() => {
    const stored = localStorage.getItem('multiplication');
    if (stored) {
      const bitmask = parseInt(stored, 10);
      selected = Array.from({ length: 12 }, (_, i) => 1 << i).filter((val) => bitmask & val);
    }
  });

  function onTimesTableChanged() {
    const bitmask = selected.reduce((acc, val) => acc | val, 0);
    localStorage.setItem('multiplication', String(bitmask));
  }
</script>

<div class="flex grow justify-start px-2">
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
  <button class="btn m-1 btn-accent" title="launch">
    <span class="icon-[carbon--rocket]"></span>
  </button>
</div>
