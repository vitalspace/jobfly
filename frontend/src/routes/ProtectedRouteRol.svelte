<script lang="ts">
  import { navigate } from "svelte-routing";
  import { auth } from "../stores/auth.store";
  import { onMount } from "svelte";
  import { userStore } from "../stores/user.store";

  export let component: any;
  let isAuthenticated: boolean = false;
  let isRecruiter: boolean = true;

  onMount(() => {
    const unsubscribe = auth.subscribe((value) => {
      isAuthenticated = value;
      if (!isAuthenticated) {
        navigate("/signin");
      } else {
        userStore.subscribe((v) => {
          if (v && v.rol !== "Recruiter") {
            isRecruiter = false;
            navigate("/dashboard");
          }
        });
      }
    });
    return unsubscribe;
  });
</script>

{#if isAuthenticated && isRecruiter}
  <svelte:component this={component} />
{/if}
