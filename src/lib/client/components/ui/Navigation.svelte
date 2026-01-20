<script lang="ts">
  import Theme from '$lib/client/components/widgets/Theme.svelte';
  import Authentication from '$lib/client/components/ui/Navigation/Authentication.svelte';
</script>

<div class="navbar flex justify-between gap-x-2 bg-base-100 shadow-sm">
  <Theme />
  <Authentication />
</div>
