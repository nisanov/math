<script lang="ts">
  import { page } from '$app/state';
  import { superForm } from 'sveltekit-superforms';

  const { enhance: enhance } = superForm(page.data.form.logout);
</script>

<form method="POST" action="/auth?/logout" use:enhance>
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
