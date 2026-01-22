<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Toasts from '$lib/client/components/widgets/Toasts.svelte';
  import { page } from '$app/state';
  import type { LayoutProps } from './$types';
  import Navigation from '$lib/client/components/ui/Navigation.svelte';
  import { getFlash } from 'sveltekit-flash-message';
  import { toasts } from '$lib/client/state/toasts.svelte';

  let { children }: LayoutProps = $props();

  const flash = getFlash(page);

  $effect(() => {
    if (!$flash) return;

    toasts.show($flash);

    $flash = undefined;
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  {#if page.data.title}
    <title>{page.data.title}</title>
  {/if}
</svelte:head>

<Navigation />

{@render children()}

<Toasts />
