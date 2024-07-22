<script lang="ts">
  import type { IJob } from "../types/types";
  export let data: Partial<IJob>;
  export let isNormalStyle: boolean;
</script>

<div
  class="rounded-xl p-2 grid gap-4 {isNormalStyle
    ? 'border-2 border-[#242426]'
    : 'border-none bg-[#597ae8]'} "
>
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
        <h2
          class="prompt-semibold {isNormalStyle
            ? 'text-[#242426] '
            : 'text-white'}"
        >
          {data.title}
        </h2>
        <p
          class="prompt-extralight text-sm {isNormalStyle
            ? 'text-[#242426] '
            : 'text-white'}"
        >
          {data.company}
        </p>
      </div>
    </div>

    <div>
      <!-- <svg
        class="h-6 w-6 {isNormalStyle ? 'text-[#242426] ' : 'text-white'}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg
      > -->
    </div>
  </div>

  <div class="grid gap-2">
    <h2
      class="prompt-extralight {isNormalStyle
        ? 'text-[#242426] '
        : 'text-white'}"
    >
      {data.employment} / {data.location}
    </h2>
    <div class="flex justify-between place-items-center">
      <h2
        class="prompt-semibold text-white rounded-xl px-4 py-1 text-xs {isNormalStyle
          ? 'bg-[#242426] '
          : 'bg-[#4968d7]'}"
      >
        {data.level} level
      </h2>
      <p
        class="prompt-extralight text-xs {isNormalStyle
          ? 'text-[#242426] '
          : 'text-white'}"
      >
        {data.salary}k/year
      </p>
    </div>
  </div>
</div>
