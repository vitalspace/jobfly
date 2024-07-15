<script lang="ts">
    import { Toast } from "flowbite-svelte";
    import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
    import { fade } from "svelte/transition";
  
    export let toastStatus = false;
    export let toastIcon: "success" | "error";
    export let message: string;
  </script>
  
  <div
    class="fixed left-0 top-6 right-0 flex items-start justify-center pointer-events-none"
  >
    <Toast dismissable={false} color="green" transition={fade} bind:toastStatus>
      <div
        class="bg-[#333333] mt-4 space-x-2 flex items-center justify-center rounded-md py-2 pointer-events-auto"
      >
        {#if toastIcon === "success"}
          <CheckCircleSolid slot="icon" class="w-5 h-5 text-green-500" />
        {:else}
          <CloseCircleSolid slot="icon" class="w-5 h-5 text-red-500" />
        {/if}
        <span class="text-white">{message}</span>
      </div>
    </Toast>
  </div>