<script lang="ts">
  import { AxiosError } from "axios";
  import { CloseOutline, EnvelopeOutline, UserOutline } from "flowbite-svelte-icons";
  import { createEventDispatcher } from "svelte";
  import { getApplicants } from "../services/job.services";
  import type { IJob, IUser } from "../types/types";

  const dispatch = createEventDispatcher();

  export let showModal = false;
  export let job: IJob;
  let applicants: Partial<IUser>[] = [];

  function openModal() {
    handleFormSubmission();
    dispatch("open");
  }

  function closeModal() {
    dispatch("close");
  }

  $: if (showModal) {
    openModal();
  }

  async function handleFormSubmission() {
    try {
      //@ts-ignore
      const response = await getApplicants(job._id);
      applicants = response.data.applicants;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  }
</script>

<div
  class="fixed z-10 inset-0 grid place-items-center p-4"
  class:hidden={!showModal}
>
  <div class="absolute inset-0 bg-black opacity-80"></div>
  <div class="grid gap-y-4 w-full shadow-md bg-white rounded-lg p-2 z-20">
    <div class="flex justify-between">
      <div class="font-semibold">Applicants</div>
      <div class="">
        <button class="" on:click={closeModal}><CloseOutline /></button>
      </div>
    </div>

    {#if applicants.length > 0}
      {#each applicants as aplicant}
        <div class="grid grid-cols-2">
          <div class="flex place-items-center gap-2">
            <h3 class="prompt-extralight xs">
              <UserOutline size="md" />
            </h3>
            {aplicant.fullname}
          </div>
          <div class="flex place-items-center gap-2">
            <EnvelopeOutline size="md" />
            {aplicant.email}
          </div>
        </div>
      {/each}
    {:else}
      <div>
        <p class="prompt-extralight xs">
          There are no applicants for this job yet
        </p>
      </div>
    {/if}
  </div>
</div>
