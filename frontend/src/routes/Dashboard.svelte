<script lang="ts">
  import Menu from "../components/Menu.svelte";
  import { userStore } from "../stores/user.store";

  userStore.initialize();
</script>

<div class="p-4 grid gap-4 mt-16">
  <div class="flex place-items-center justify-between">
    <div class="flex place-items-center gap-x-2">
      <div class="rounded-full border p-2">
        {#if $userStore && $userStore.avatar != ""}
        <h2 class="">mi</h2>
      {:else}
        <svg
          class="h-8 w-8 text-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      {/if}
      </div>
      <div>
        {#if $userStore && $userStore.fullname}
          <h2 class="prompt-semibold text-sm">{$userStore.fullname}</h2>
        {/if}

        <p class="prompt-extralight text-xs">Developer</p>
      </div>
    </div>

    <div>
      <svg
        class="h-6 w-6 text-black"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path
          d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
        />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
      </svg>
    </div>
  </div>

  <div>
    <h2 class="prompt-semibold">Find job</h2>
    <div class="flex place-items-center space-x-2 rounded-xl border px-2 py-2">
      <svg
        class="h-6 w-6 text-black"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
      <input
        class="prompt-extralight text-md w-full outline-none"
        type="text"
        placeholder="Enter a job title or keyword"
      />
    </div>
  </div>

  <div>
    <h2 class="prompt-semibold">Promote Jobs</h2>

    <div class="rounded-xl bg-[#597ae8] p-2 grid gap-4">
      <div class="flex place-items-center justify-between">
        <div class="flex place-items-center space-x-4">
          <div class="rounded-lg bg-[#fed0fd] p-2">
            <svg
              class="h-8 w-8 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <line x1="6" y1="8" x2="6" y2="16" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="18" x2="16" y2="18" />
              <line x1="18" y1="8" x2="18" y2="16" />
            </svg>
          </div>
          <div>
            <h2 class="prompt-semibold text-white">People partner</h2>
            <p class="prompt-extralight text-sm text-white">
              Happy Compant Co.
            </p>
          </div>
        </div>

        <div>
          <svg
            class="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg
          >
        </div>
      </div>

      <div class="grid gap-2">
        <h2 class="prompt-extralight text-white">Full-time / Remotely</h2>
        <div class="flex justify-between place-items-center">
          <h2
            class="prompt-semibold rounded-xl bg-[#4968d7] px-4 py-1 text-xs text-white"
          >
            Senion level
          </h2>
          <p class="prompt-extralight text-xs text-white">260k/year</p>
        </div>
      </div>
    </div>
  </div>
</div>

<Menu />
