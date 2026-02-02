<script lang="ts">
  import { page } from '$app/state';
  import { invalidateAll } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  import { MultiplicationService } from '$lib/services/multiplication';
  import { resetSums, sums } from '$lib/state/sums.svelte.js';

  let selected = $state<number[]>([]);
  let sequence = $state(page.data.sequence);
  let questions = $state(page.data.questions);
  let percentage = $derived(
    page.data.best ? Math.ceil((page.data.best.correct / page.data.best.questions) * 100) : 0
  );

  onMount(() => {
    if (sequence) {
      selected = Array.from({ length: 12 }, (_, i) => 1 << i).filter((val) => sequence & val);
    }
  });

  async function onQuestionsChanged() {
    if (isNaN(questions) || questions < 10) {
      questions = 10;
    } else if (questions > 20) {
      questions = 20;
    }

    await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions })
    });

    await invalidateAll();
  }

  async function onTimesTableChanged() {
    sequence = selected.reduce((acc, val) => acc | val, 0);

    await fetch('/api/sequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sequence })
    });

    await invalidateAll();
  }

  function onBtnLaunchClicked() {
    const generator = new MultiplicationService(sequence, questions);
    sums.items = generator.generate();
    sums.sequence = sequence;
    sums.questions = questions;
    sums.isActive = true;
    sums.onLaunch?.();
    sums.onTimerStart?.();
  }

  function cancel() {
    resetSums();
  }

  function onShortcut(detail: ShortcutEventDetail) {
    detail.originalEvent.preventDefault();
    if (page.data.user) {
      onBtnLaunchClicked();
    }
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: onShortcut
    }
  }}
/>

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
    <ul tabindex="-1" class="dropdown-content menu z-2 w-52 rounded-box bg-base-100 p-2 shadow-sm">
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
      min="10"
      max="20"
      title="Must be 10, 15 or 20 questions"
      bind:value={questions}
      onchange={onQuestionsChanged}
    />
    <button
      class="btn join-item btn-accent"
      title="launch ⌘K"
      disabled={selected.length === 0 || !page.data.user}
      onclick={onBtnLaunchClicked}
    >
      <span class="icon-[carbon--rocket]"></span>
    </button>
  </div>
  {#if page.data.best}
    <div transition:fade class="ml-2 badge badge-soft badge-xl badge-info">
      <span class="icon-[raphael--stopwatch]" style="width: 20px; height: 20px;"></span>
      {page.data.best.time.substring(3)}
    </div>
    <div transition:fade class="badge badge-soft badge-xl badge-info">{percentage}%</div>
  {/if}
</div>
