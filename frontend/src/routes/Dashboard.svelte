<script lang="ts">
  import { AxiosError } from "axios";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Job from "../components/Job.svelte";
  import Menu from "../components/Menu.svelte";
  import { getMyJobs } from "../services/user.services";
  import { allJobs } from "../services/job.services";
  import { userStore } from "../stores/user.store";
  import type { IJob } from "../types/types";

  userStore.initialize();

  let search: string = "";
  let jobs: Partial<IJob>[] = [];
  let promote: Partial<IJob>;

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

  onMount(async () => {
    try {
      const response = await getMyJobs();
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
</script>

<div class="p-4 grid gap-4 mt-10">
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
          <p class="prompt-extralight text-xs">{$userStore.location}</p>
          <p class="prompt-extralight text-xs">{$userStore.rol}</p>
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
          <h2 class="prompt-extralight text-sm">No promoted jobs available</h2>
        </div>
      {/if}
    </div>
  </div>

  {#if $userStore && $userStore.rol === "Recruiter"}
    <div class="mb-14">
      <h2 class="prompt-semibold text-sm">Your published jobs</h2>
      <div class="grid gap-4">
        {#if visibleJobs.length > 0}
          {#each visibleJobs as job}
            <Link to={"/job/" + job._id}>
              <Job isNormalStyle={true} data={job} />
            </Link>
          {/each}
        {:else}
          <div>
            <h2 class="prompt-extralight text-md">
              You have not published any jobs yet
            </h2>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="mb-14">
      <h2 class="prompt-semibold text-sm">Your postulated jobs</h2>
      <div class="grid gap-4">
        {#if visibleJobs.length > 0}
          {#each visibleJobs as job}
            <Link to={"/job/" + job._id}>
              <Job isNormalStyle={true} data={job} />
            </Link>
          {/each}
        {:else}
          <div>
            <h2 class="prompt-extralight text-sm">
              You have not applied for any job yet.
            </h2>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<Menu hiddeHistory={true} />
