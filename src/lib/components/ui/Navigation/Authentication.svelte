<script lang="ts">
  import { page } from '$app/state';
  import Logout from '$lib/components/ui/Navigation/Authentication/Logout.svelte';
  import Login from '$lib/components/ui/Navigation/Authentication/Login.svelte';
</script>

{#if page.data.user}
  <Logout />
{:else}
  <Login />
{/if}
