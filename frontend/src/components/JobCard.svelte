<script lang="ts">
  import { BuildingSolid, BookmarkSolid, DotsVerticalOutline } from "flowbite-svelte-icons";
  import { Link } from "svelte-routing";

    // JobCard component
    export let job;
    export let onUnsave: () => void = () => {};
    export let onShowModal: () => void = () => {};
  </script>
  
  <div class="border flex justify-between place-items-center">
    <div class="flex place-items-center space-x-2">
      <div>
        <BuildingSolid color="#C5C7CC" size="lg" />
      </div>
      <div>
        <Link to={`/job/${job._id}`} class="prompt-semibold text-md">{job.title}</Link>
        <p class="prompt-extralight text-xs">{job.company}</p>
        <p class="prompt-extralight text-xs">{job.location}</p>
      </div>
    </div>
    <div class="pr-2">
      {#if onUnsave}
        <button on:click={onUnsave}>
          <BookmarkSolid size="lg" color="#F50049" />
        </button>
      {:else}
        <button on:click={onShowModal}>
          <DotsVerticalOutline />
        </button>
      {/if}
    </div>
  </div>