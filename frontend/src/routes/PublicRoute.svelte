<script lang="ts">
  import { navigate } from "svelte-routing";
  import { auth } from "../stores/auth.store";
  import { onMount } from "svelte";

  export let component: any;

  let isAuthenticated = false;

  onMount(() => {
    const unsubscribe = auth.subscribe((value) => {
      isAuthenticated = value;
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    });

    return unsubscribe;
  });
</script>

{#if !isAuthenticated}
  <svelte:component this={component} />
{/if}
