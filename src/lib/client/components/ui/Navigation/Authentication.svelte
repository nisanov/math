<script lang="ts">
  import { page } from '$app/state';
  import Logout from '$lib/client/components/ui/Navigation/Authentication/Logout.svelte';
  import Login from '$lib/client/components/ui/Navigation/Authentication/Login.svelte';
</script>

{#if page.data.user}
  <Logout />
{:else}
  <Login />
{/if}
