<script lang="ts">
  import Theme from '$lib/components/ui/Navigation/Theme.svelte';
  import Authentication from '$lib/components/ui/Navigation/Authentication.svelte';
  import Multiplication from '$lib/components/ui/Navigation/Multiplication.svelte';
  import Timer from '$lib/components/ui/Navigation/Timer.svelte';
</script>

<div class="navbar flex items-center justify-between gap-x-2 bg-base-100 shadow-sm">
  <div class="flex items-center gap-x-5">
    <Theme />
    <Multiplication />
  </div>
  <Timer />
  <Authentication />
</div>
