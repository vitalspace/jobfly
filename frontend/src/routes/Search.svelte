<script lang="ts">
  import { AxiosError } from "axios";
  import Menu from "../components/Menu.svelte";
  import { allJobs } from "../services/job.services";
  import type { IJob } from "../types/types.d";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Job from "../components/Job.svelte";

  let search: string = "";
  let jobs: Partial<IJob>[] = [];
  let promote: Partial<IJob>;

  onMount(async () => {
    try {
      const response = await allJobs();
      jobs = response.data.jobs;

      const resPromote = await allJobs();
      const randomIndex = Math.floor(
        Math.random() * resPromote.data.jobs.length
      );
      promote = resPromote.data.jobs[randomIndex];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  });

  $: visibleJobs = search
    ? jobs.filter((job) => {
        return (
          job.title?.toLowerCase().match(`${search.toLowerCase()}.*`) ||
          job.location?.toLowerCase().match(`${search.toLowerCase()}.*`) ||
          job.level?.toLowerCase().match(`${search.toLowerCase()}.*`) ||
          job.company?.toLowerCase().match(`${search.toLowerCase()}.*`) ||
          job.employment?.toLowerCase().match(`${search.toLowerCase()}.*`)
        );
      })
    : jobs;
</script>

<Menu hiddeHistory={false} />

<div class="p-4 mt-10">
  <div class="grid gap-y-4">
    <div>
      <h2 class="prompt-semibold">Find job</h2>
      <div
        class="flex place-items-center space-x-2 rounded-xl border px-2 py-2"
      >
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
          bind:value={search}
        />
      </div>
    </div>

    <div>
      <h2 class="prompt-semibold text-sm">Promote Job</h2>
      <div class="grid gap-4">
        {#if promote}
          <Link to={"/job/" + promote._id}>
            <Job isNormalStyle={false} data={promote} />
          </Link>
        {:else}
          <div>
            <h2 class="prompt-extralight text-sm">
              No promoted jobs available
            </h2>
          </div>
        {/if}
      </div>
    </div>

    <div class="mb-14">
      <h2 class="prompt-semibold text-sm">Recently Added</h2>
      <div class="grid gap-4">
        {#each visibleJobs as job}
          <Link to={"/job/" + job._id}>
            <Job isNormalStyle={true} data={job} />
          </Link>
        {/each}
      </div>
    </div>
  </div>
</div>
