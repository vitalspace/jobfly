<script lang="ts">
  import { AxiosError } from "axios";
  import {
    BookmarkOutline,
    BookmarkSolid,
    EditOutline,
    UsersOutline,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import Menu from "../components/Menu.svelte";
  import Toast from "../components/Toast.svelte";
  import { getJob } from "../services/job.services";
  import { postulate, saveJob, unSavedJob } from "../services/user.services";
  import { userStore } from "../stores/user.store";
  import type { IJob } from "../types/types";

  import EditJob from "../components/EditJob.svelte";
  import Applicants from "../components/ApplicantsModal.svelte";

  const id = window.location.pathname.split("/").pop();
  let jobData: Partial<IJob> = {};
  let isSaved = false;

  let message = "";
  let toastStatus = false;
  const TOAST_DURATION = 3000;
  let toastIcon: "success" | "error" = "success";

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };

  $: if ($userStore) {
    //@ts-ignore
    isSaved = $userStore.savedJobs?.includes(id) || false;
  }

  let showModal = false;
  let showApplicantsModal = false;

  async function applicantsModal() {
    showApplicantsModal = !showApplicantsModal;
  }

  const handdleApplicantsMododal = () =>
    (showApplicantsModal = !showApplicantsModal);

  async function editModal() {
    showModal = !showModal;
  }

  // on:close={handleClose}
  const handleClose = () => (showModal = !showModal);
  const handleSuccess = () => (showModal = !showModal);

  async function toggleSave() {
    try {
      //@ts-ignore
      const { data } = await (isSaved ? unSavedJob : saveJob)({ id });
      isSaved = !isSaved;
      showToast("success", data.message);
      userStore.initialize();
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast("error", error.response?.data.message);
      }
    }
  }

  async function handleFormSubmission() {
    try {
      //@ts-ignore
      const { data } = await postulate({ id });
      showToast("success", data.message);
      userStore.initialize();
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast("error", error.response?.data.message);
      }
    }
  }

  onMount(async () => {
    try {
      //@ts-ignore
      const { data } = await getJob(id);
      jobData = data.job;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      }
    }
  });
</script>

<Menu hiddeHistory={false} />
<Toast {toastStatus} {toastIcon} {message} />

<EditJob
  {showModal}
  job={jobData}
  on:close={handleClose}
  on:success={handleSuccess}
  messageBtn={"Update Job"}
/>

<Applicants
  showModal={showApplicantsModal}
  job={jobData}
  on:close={handdleApplicantsMododal}
/>

{#if !showModal}
  <div class="grid gap-y-4 p-4 mt-10 mb-14">
    <div class="grid gap-y-4">
      <div class="flex place-items-center justify-between">
        <div class="rounded-lg bg-[#FFD0FC] p-2">
          <svg
            class="h-20 w-20 text-black"
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
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="1" />
            <path d="M7 12a5 5 0 0 1 5 -5" />
            <path d="M12 17a5 5 0 0 0 5 -5" />
          </svg>
        </div>

        {#if $userStore && $userStore.rol === "Recruiter" && jobData.recruiter === $userStore._id}
          <div class="flex space-x-4">
            <button title="List of applicants" on:click={applicantsModal}>
              <UsersOutline size="lg" color="#242426" />
            </button>
            <button title="Edit job" on:click={editModal}>
              <EditOutline size="lg" color="#242426" />
            </button>
          </div>
        {:else if $userStore && $userStore.rol === "Candidate"}
          <button on:click={toggleSave}>
            {#if isSaved}
              <BookmarkSolid size="lg" color="#F44474" />
            {:else}
              <BookmarkOutline size="lg" color="#242426" />
            {/if}
          </button>
        {/if}
      </div>

      <div>
        <h2 class="prompt-semibold text-xl">{jobData.title}</h2>
        <p class="prompt-extralight text-sm">{jobData.company}</p>
      </div>
    </div>

    <hr class="border-b-2 border-[#597ae8]" />

    <div class="grid gap-y-6">
      <div class="grid gap-y-2">
        <h2 class="prompt-semibold">Job overview</h2>
        <div class="flex space-x-4">
          {#each ["level", "employment", "salary", "location"] as field}
            <span
              class="prompt-extralight rounded-lg border px-3 py-1 text-xs shadow-md"
            >
              {field === "salary" ? `${jobData[field]}k/year` : jobData[field]}
            </span>
          {/each}
        </div>
      </div>

      {#each ["description", "inthisrole", "skills"] as section}
        <div>
          <h2 class="prompt-semibold text-sm">
            {section === "inthisrole"
              ? "In this role, you will"
              : section === "skills"
                ? "About you"
                : "Description"}
          </h2>
          <p class="prompt-extralight">{jobData[section]}</p>
        </div>
      {/each}
    </div>

    <div>
      {#if $userStore && $userStore.rol !== "Recruiter"}
        <button
          on:click={handleFormSubmission}
          class="prompt-semibold w-full rounded-lg bg-[#242426] py-3 text-white"
        >
          Apply now
        </button>
      {/if}
    </div>
  </div>
{/if}
