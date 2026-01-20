<script lang="ts">
  import { onMount } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  import { page } from '$app/state';
  import { toasts } from '$lib/client/state/toasts.svelte';
  import { AuthSchema } from '$lib/schemas';
  import { valibotClient } from 'sveltekit-superforms/adapters';

  const { form, errors, enhance } = superForm(page.data.form.authentication, {
    validators: valibotClient(AuthSchema),
    onUpdated({ form }) {
      toasts.form(form);
    }
  });

  let username: HTMLInputElement;

  onMount(() => {
    if (!page.data.token) {
      username.focus();
    }
  });

  function onShortcut(detail: ShortcutEventDetail) {
    const keyboardEvent = detail.originalEvent;
    keyboardEvent.preventDefault();
    if (page.data.token || keyboardEvent.target === username) {
      return;
    }
    username.focus();
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'l',
      modifier: ['ctrl', 'meta'],
      callback: onShortcut
    }
  }}
/>

{#if page.data.token}
  <form>
    <div class="flex gap-x-5">
      <button class="btn btn-neutral" type="submit" title="Logout">
        <span class="icon-[carbon--logout]"></span>
      </button>
      <span class="prose prose-xl">
        Welcome back, {page.data.user?.name}!
      </span>
    </div>
  </form>
{:else}
  <form method="POST" action="/token?/authenticate" use:enhance>
    <div class="join">
      <label class="validator input join-item">
        <span class="icon-[mdi-light--account]"></span>
        <input
          name="username"
          bind:this={username}
          bind:value={$form['username']}
          aria-invalid={$errors['username'] ? 'true' : undefined}
          autocomplete="off"
        />
        <kbd class="kbd kbd-sm">⌘</kbd><kbd class="kbd kbd-sm">L</kbd>
      </label>
      <button class="btn join-item btn-neutral" type="submit" title="Login">
        <span class="icon-[carbon--login]"></span>
      </button>
    </div>
  </form>
{/if}
