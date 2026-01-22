<script lang="ts">
  import { onMount } from 'svelte';
  import { superForm } from 'sveltekit-superforms';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  import { page } from '$app/state';
  import { toasts } from '$lib/client/state/toasts.svelte';
  import { LoginSchema } from '$lib/schemas';
  import { valibotClient } from 'sveltekit-superforms/adapters';
  import { invalidateAll } from '$app/navigation';

  const {
    form: loginForm,
    errors: loginErrors,
    enhance: loginEnhance
  } = superForm(page.data.form.login, {
    validators: valibotClient(LoginSchema),
    onUpdated: async ({ form }) => {
      toasts.form(form);
      await invalidateAll();
    }
  });

  const { enhance: logoutEnhance } = superForm(page.data.form.logout, {
    onUpdated: async ({ form }) => {
      toasts.form(form);
      await invalidateAll();
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

{#if page.data.user}
  <form method="POST" action="/auth?/logout" use:logoutEnhance>
    <div class="flex gap-x-5">
      <span class="prose prose-xl">
        {#if page.data.user.createdAt !== page.data.user.updatedAt}
          Welcome Back, {page.data.user.username}!
        {:else}
          Welcome, {page.data.user.username}!
        {/if}
      </span>
      <button class="btn btn-neutral" type="submit" title="Logout">
        <span class="icon-[carbon--logout]"></span>
      </button>
    </div>
  </form>
{:else}
  <form method="POST" action="/auth?/login" use:loginEnhance>
    <div class="join">
      <label class="validator input join-item">
        <span class="icon-[mdi-light--account]"></span>
        <input
          name="username"
          bind:this={username}
          bind:value={$loginForm['username']}
          aria-invalid={$loginErrors['username'] ? 'true' : undefined}
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
