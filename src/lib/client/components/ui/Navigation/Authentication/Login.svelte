<script lang="ts">
  import { onMount } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  import { page } from '$app/state';
  import { LoginSchema } from '$lib/schemas';
  import { valibotClient } from 'sveltekit-superforms/adapters';
  import { toasts } from '$lib/client/state/toasts.svelte';

  const { form, errors, enhance } = superForm(page.data.form.login, {
    validators: valibotClient(LoginSchema),
    onUpdated: ({ form }) => {
      if (!form.valid) {
        toasts.form(form);
      }
    }
  });

  let username: HTMLInputElement;

  onMount(() => {
    if (!page.data.user) {
      username.focus();
    }
  });

  function onShortcut(detail: ShortcutEventDetail) {
    const keyboardEvent = detail.originalEvent;
    keyboardEvent.preventDefault();
    if (page.data.user || keyboardEvent.target === username) {
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

<form method="POST" action="/auth?/login" use:enhance>
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
