<script lang="ts">
  import { Link } from "svelte-routing";
</script>

<div class="absolute left-0 top-0 right-0 px-4 py-4">
  <div class="flex justify-between place-items-center">
    <!-- <h1 class="prompt-semibold text-[#4a485d] text-lg">JOBFLY</h1> -->
    <div class="bg-[#F3F866] rounded-md shadow-md">
      <svg
        class="h-6 w-6 text-[#252526]"
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
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="9" y2="16" />
        <line x1="5" y1="12" x2="9" y2="8" /></svg
      >
    </div>
    <h1 class="prompt-semibold text-[#252526] text-lg drop-shadow-md">JOBFLY</h1>
  </div>
</div>

<div class="fixed left-0 bottom-0 right-0">
  <div class="flex justify-around bg-black px-4 py-4">
    <Link to="/dashboard" class="cursor-pointer">
      <svg
        class="h-6 w-6 text-white"
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
        <polyline points="5 12 3 12 12 3 21 12 19 12" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    </Link>
    <Link to="/search" class="cursor-pointer">
      <svg
        class="h-6 w-6 text-white"
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
    </Link>

    <Link to="/profile" class="cursor-pointer">
      <svg
        class="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </Link>
  </div>
</div>
