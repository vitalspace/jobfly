<script lang="ts">
  import { AxiosError } from "axios";
  import { TabItem, Tabs } from "flowbite-svelte";
  import {
    BookmarkOutline,
    BookmarkSolid,
    BriefcaseOutline,
    BuildingSolid,
    DotsVerticalOutline,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Menu from "../components/Menu.svelte";
  import Modal from "../components/Modal.svelte";
  import PublishedJobsModal from "../components/PublishedJobsModal.svelte";
  import Toast from "../components/Toast.svelte";
  import { getJob } from "../services/job.services";
  import { getMyJobs, unSavedJob } from "../services/user.services";
  import { userStore } from "../stores/user.store";
  import type { IJob } from "../types/types";

  let listJobApplications: any[] = [];
  let listSavedJobs: any[] = [];
  let listpublishedJobs: Partial<IJob>[] = [];

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

  let modalId = "";

  const handleOpen = () => {
    console.log("Modal opened");
  };

  const handleClose = () => {
    console.log("Modal closed");
    modalId = "";
  };

  const showModal = (id: string) => {
    modalId = id;
    console.log(`Opening modal for ID: ${id}`);
  };

  const unSaved = async (id: string) => {
    try {
      const { data } = await unSavedJob({ id });
      showToast("success", data.message);
      console.log("Unsave successful");

      userStore.initialize();
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast("error", error.response?.data.message);
      }
    }
  };

  onMount(async () => {
    userStore.subscribe(async (v) => {
      if (v) {
        if (v.rol === "Candidate") {
          const resultsApplications = v.applications
            ? await Promise.all(
                v.applications.map(async (e) => {
                  const response = await getJob(e);
                  return response.data.job;
                })
              )
            : [];

          listJobApplications = resultsApplications;

          const resultsSaved = v.savedJobs
            ? await Promise.all(
                v.savedJobs.map(async (e) => {
                  const response = await getJob(e);
                  return response.data.job;
                })
              )
            : [];

          listSavedJobs = resultsSaved;
          return;
        }

        if (v.rol === "Recruiter") {
          try {
            const response = await getMyJobs();
            listpublishedJobs = response.data.jobs;
          } catch (error) {
            console.log(error);
          }
        }
        return;
      }
    });
    // const { data } = await getMyJobs();
    // console.log(data);
  });
</script>

<Menu hiddeHistory={false} />
<Toast {toastStatus} {toastIcon} {message} />

<div class="mt-10 p-4">
  {#if $userStore && $userStore.rol !== "Recruiter"}
    <Tabs tabStyle="underline">
      <TabItem open activeClasses="p-4 border-b-2 border-[#597ae8]">
        <div slot="title" class="flex items-center gap-2 prompt-semibold">
          <BookmarkOutline size="md" />
          Saved
        </div>
        <div class="flex flex-col gap-y-4">
          {#if listSavedJobs.length > 0}
            {#each listSavedJobs as savesJob}
              <div
                class="border rounded-md flex justify-between place-items-center"
              >
                <div class="flex place-items-center space-x-2">
                  <div>
                    <BuildingSolid color="#C5C7CC" size="lg" />
                  </div>
                  <div>
                    <Link
                      to={`/job/${savesJob._id}`}
                      class="prompt-semibold text-md">{savesJob.title}</Link
                    >
                    <p class="prompt-extralight text-xs">{savesJob.company}</p>
                    <p class="prompt-extralight text-xs">{savesJob.location}</p>
                  </div>
                </div>
                <div class="pr-2">
                  <button on:click={() => unSaved(savesJob._id)}>
                    <BookmarkSolid size="lg" color="#F44474" />
                  </button>
                </div>
              </div>
            {/each}
          {:else}
            <div>
              <h2 class="prompt-extralight">
                You have not saved any jobs yet.
              </h2>
            </div>
          {/if}
        </div>
      </TabItem>

      <TabItem activeClasses="p-4 border-b-2 border-[#597ae8]">
        <div slot="title" class="flex items-center gap-2 prompt-semibold">
          <BriefcaseOutline size="md" />
          Applications
        </div>
        <div class="flex flex-col gap-y-4">
          {#if listJobApplications.length > 0}
            {#each listJobApplications as jobResult}
              <div
                class="border rounded-md flex justify-between place-items-center"
              >
                <div class="flex place-items-center space-x-2">
                  <div>
                    <BuildingSolid color="#C5C7CC" size="lg" />
                  </div>
                  <div>
                    <a
                      href={`/job/${jobResult._id}`}
                      class="prompt-semibold text-md">{jobResult.title}</a
                    >
                    <p class="prompt-extralight text-xs">{jobResult.company}</p>
                    <p class="prompt-extralight text-xs">
                      {jobResult.location}
                    </p>
                  </div>
                </div>
                <div class="pr-2">
                  <button on:click={() => showModal(jobResult._id)}>
                    <DotsVerticalOutline />
                  </button>
                </div>
              </div>
              <Modal
                showModal={modalId === jobResult._id}
                id={jobResult._id}
                on:open={handleOpen}
                on:close={handleClose}
              />
            {/each}
          {:else}
            <div>
              <h2 class="prompt-extralight">
                You have not applied for any job yet.
              </h2>
            </div>
          {/if}
        </div>
      </TabItem>
    </Tabs>
  {:else}
    <Tabs tabStyle="underline">
      <TabItem open activeClasses="p-4 border-b-2 border-[#597ae8]">
        <div slot="title" class="flex items-center gap-2 prompt-semibold">
          <!-- <BookmarkOutline size="md" />
          Saved -->
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
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <line x1="12" y1="12" x2="12" y2="12.01" />
            <path d="M3 13a20 20 0 0 0 18 0" /></svg
          >
          Published jobs
        </div>

        <div class="flex flex-col gap-y-4">
          {#if listpublishedJobs.length > 0}
            {#each listpublishedJobs as jobResult}
              <div
                class="border rounded-md flex justify-between place-items-center"
              >
                <div class="flex place-items-center space-x-2">
                  <div>
                    <BuildingSolid color="#C5C7CC" size="lg" />
                  </div>
                  <div>
                    <a
                      href={`/job/${jobResult._id}`}
                      class="prompt-semibold text-md">{jobResult.title}</a
                    >
                    <p class="prompt-extralight text-xs">{jobResult.company}</p>
                    <p class="prompt-extralight text-xs">
                      {jobResult.location}
                    </p>
                  </div>
                </div>
                <div class="pr-2">
                  <button on:click={() => showModal(jobResult._id)}>
                    <DotsVerticalOutline />
                  </button>
                </div>
              </div>
              <PublishedJobsModal
                showModal={modalId === jobResult._id}
                id={jobResult._id}
                on:open={handleOpen}
                on:close={handleClose}
              />
            {/each}
          {:else}
            <div>
              <h2 class="prompt-extralight">
                You have not saved any jobs yet.
              </h2>
            </div>
          {/if}
        </div>
      </TabItem>
    </Tabs>
  {/if}
</div>
