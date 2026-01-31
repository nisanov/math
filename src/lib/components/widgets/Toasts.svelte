<script>
  import { fade } from 'svelte/transition';
  import { toasts } from '$lib/state/toasts.svelte.ts';
</script>

<div class="toast toast-center toast-bottom w-80">
  {#each toasts.values as toast (toast.id)}
    <div class="alert alert-{toast.message.type} flex justify-between" role="alert" out:fade>
      <span>{toast.message.content}</span>
      <button
        title="Close"
        class="btn btn-active btn-square btn-sm btn-{toast.message.type}"
        on:click={() => toasts.remove(toast.id)}
      >
        <span class="icon-[mdi--close-box-outline]"></span>
      </button>
    </div>
  {/each}
</div>
