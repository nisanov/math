<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { MultiplicationGenerator } from '$lib/services/MultiplicationSumGenerator';
  import { resetSums, sums } from '$lib/client/state/sums.svelte';

  let selected = $state<number[]>([]);
  let bitmask = $state(0);
  let questions = $state(5);

  onMount(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      questions = parseInt(storedQuestions, 10);
    }
    const storedMultiplication = localStorage.getItem('multiplication');
    if (storedMultiplication) {
      bitmask = parseInt(storedMultiplication, 10);
      selected = Array.from({ length: 12 }, (_, i) => 1 << i).filter((val) => bitmask & val);
    }
  });

  function validateQuestions() {
    if (isNaN(questions) || questions < 5) {
      questions = 5;
    } else if (questions > 20) {
      questions = 20;
    } else {
      questions = Math.round(questions / 5) * 5;
    }
    localStorage.setItem('questions', String(questions));
  }

  function onTimesTableChanged() {
    bitmask = selected.reduce((acc, val) => acc | val, 0);
    localStorage.setItem('multiplication', String(bitmask));
  }

  function launch() {
    const generator = new MultiplicationGenerator(bitmask, questions); // Tables 1 and 3
    sums.items = generator.generate();
    sums.bitmask = bitmask;
    sums.questions = questions;
    sums.isActive = true;
    sums.onLaunch?.();
    sums.onTimerStart?.();
  }

  function cancel() {
    resetSums();
  }
</script>

<div class="flex items-center gap-1">
  <button
    class="btn btn-soft btn-error"
    title="Erase"
    disabled={selected.length === 0 || !page.data.user || !sums.isActive}
    onclick={cancel}
  >
    <span class="icon-[proicons--eraser-sparkle]"></span>
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
  <div class="join">
    <input
      type="number"
      class="validator input join-item"
      required
      step="5"
      min="5"
      max="20"
      title="Must be between be 5 to 20"
      bind:value={questions}
      onblur={validateQuestions}
      onchange={() => localStorage.setItem('questions', String(questions))}
    />
    <button
      class="btn join-item btn-accent"
      title="launch"
      disabled={selected.length === 0 || !page.data.user}
      onclick={launch}
    >
      <span class="icon-[carbon--rocket]"></span>
    </button>
  </div>
</div>
