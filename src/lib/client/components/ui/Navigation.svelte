<script lang="ts">
  import Theme from '$lib/client/components/widgets/Theme.svelte';
  import Authentication from '$lib/client/components/ui/Navigation/Authentication.svelte';
  import Multiplication from '$lib/client/components/ui/Navigation/Multiplication.svelte';
  import Timer from '$lib/client/components/ui/Navigation/Timer.svelte';
</script>

<div class="navbar flex items-center justify-between gap-x-2 bg-base-100 shadow-sm">
  <div class="flex items-center gap-x-2">
    <Theme />
    <Multiplication />
  </div>
  <Timer />
  <Authentication />
</div>
